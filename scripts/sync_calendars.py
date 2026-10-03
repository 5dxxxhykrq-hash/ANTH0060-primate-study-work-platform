#!/usr/bin/env python3
import os, json, urllib.request, re
from datetime import datetime, timezone

OUT="data/calendar.json"
FILTER="ANTH0060"

def fetch(url):
    req=urllib.request.Request(url,headers={"User-Agent":"ANTH0060-study-platform/1.0"})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.read().decode("utf-8","replace")

def unfold(text):
    lines=text.replace("\r\n","\n").replace("\r","\n").split("\n")
    out=[]
    for line in lines:
        if line.startswith((" ","\t")) and out:
            out[-1]+=line[1:]
        else:
            out.append(line)
    return out

def clean(v):
    return v.replace("\\n"," ").replace("\\, ",", ").replace("\\,",",").replace("\\;",";").replace("\\\\","\\")

def parse_dt(v):
    if not v: return ""
    raw=v.split(":")[-1] if ":" in v and "T" in v.split(":")[-1] else v
    raw=raw.strip()
    for fmt in ("%Y%m%dT%H%M%SZ","%Y%m%dT%H%M%S","%Y%m%dT%H%M","%Y%m%d"):
        try:
            dt=datetime.strptime(raw,fmt)
            if raw.endswith("Z"):
                dt=dt.replace(tzinfo=timezone.utc)
            return dt.isoformat()
        except ValueError:
            pass
    return raw

def parse_ics(text, source):
    events=[]
    current=None
    for line in unfold(text):
        if line=="BEGIN:VEVENT":
            current={}
        elif line=="END:VEVENT":
            if current is not None:
                blob=" ".join(str(v) for v in current.values()).upper()
                if FILTER in blob:
                    events.append({
                        "summary":clean(current.get("SUMMARY","ANTH0060")),
                        "start":parse_dt(current.get("DTSTART","")),
                        "end":parse_dt(current.get("DTEND","")),
                        "location":clean(current.get("LOCATION","")),
                        "description":clean(current.get("DESCRIPTION","")),
                        "url":clean(current.get("URL","")),
                        "source":source
                    })
            current=None
        elif current is not None and ":" in line:
            key,val=line.split(":",1)
            key=key.split(";",1)[0]
            if key in {"SUMMARY","DTSTART","DTEND","LOCATION","DESCRIPTION","URL"}:
                current[key]=val
    return events

def main():
    feeds=[
        ("UCL timetable", os.environ.get("UCL_TIMETABLE_ICS","")),
        ("Moodle calendar", os.environ.get("MOODLE_CALENDAR_ICS",""))
    ]
    all_events=[]
    for source,url in feeds:
        if not url:
            continue
        try:
            all_events.extend(parse_ics(fetch(url),source))
        except Exception as e:
            print(f"{source}: sync skipped ({type(e).__name__})")
    if not any(url for _,url in feeds):
        print("No calendar secrets configured; leaving existing calendar data unchanged.")
        return
    all_events.sort(key=lambda x:x.get("start",""))
    payload={"updated_at":datetime.now(timezone.utc).isoformat(),"events":all_events}
    os.makedirs(os.path.dirname(OUT),exist_ok=True)
    with open(OUT,"w",encoding="utf-8") as f:
        json.dump(payload,f,indent=2,ensure_ascii=False)
    print(f"Wrote {len(all_events)} ANTH0060 events.")

if __name__=="__main__":
    main()
