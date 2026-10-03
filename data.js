const COURSE = {
  meta: {
    code: "ANTH0060",
    title: "Primate Behaviour and Ecology",
    level: "PG",
    year: "2026/27",
    talis: "https://rl.talis.com/3/ucl/lists/14081b9e-e363-48fe-be72-368e2e3d1c8b.html?lang=en-GB",
    moduleHome: "",
    sourceOrder: [
      "2026/27 Moodle",
      "2026/27 ReadingLists@UCL / Talis",
      "Lecturer or module email",
      "UCL personal timetable",
      "Current official UCL pages",
      "Previous-year ANTH0060 materials",
      "External research literature"
    ]
  },

  weeks: [
    {
      week: 1,
      topic: "Introduction to module teaching",
      concept: "How the course works: scientific publishing, contract grading and the research-proposal portfolio.",
      status: "confirmed-email",
      sessions: [
        {type:"PG Seminar", time:"10:00", note:"Week 1 only: starts at 10:00 rather than the normal 09:00 start. Room: check UCL timetable on the day."},
        {type:"Lecture", time:"14:00–16:00", note:"Required for PG students. Assessment and contract-grading introduction."}
      ],
      tasks: [
        {title:"Read the Week 1 Moodle activity", type:"Pre-seminar", submit:false, source:"Moodle"},
        {title:"Read the contract-grading explainer", type:"Reading", submit:false, source:"Moodle"},
        {title:"Attend the PG seminar and receive a taxon assignment", type:"Seminar", submit:false, source:"Email"}
      ],
      readings: []
    },
    {
      week: 2,
      topic: "Who are the Primates?",
      concept: "Species concepts, taxonomy, biodiversity measurement and conservation consequences.",
      readings: [
        {
          id:"w2-groves2014",
          authors:"Groves, C. P.",
          year:2014,
          title:"Primate Taxonomy: Inflation or Real?",
          journal:"Annual Review of Anthropology 43: 27–36",
          doi:"10.1146/annurev-anthro-102313-030232",
          publisher:"https://doi.org/10.1146/annurev-anthro-102313-030232",
          oa:"",
          tags:["Taxonomy","Species concept","PSC","Foundational"],
          question:"What does a primate species represent, and is the modern increase in recognised primate species merely taxonomic inflation?",
          method:"Conceptual and historical review of primate taxonomy and species concepts.",
          finding:"Groves argues that treating species as diagnosable evolutionary lineages reveals biodiversity obscured by older polytypic/Biological Species Concept approaches.",
          use:"Foundational framing for species concepts, diagnosability, evolutionary lineages and the conservation consequences of taxonomy."
        },
        {
          id:"w2-meijaard2003",
          authors:"Meijaard, E. & Nijman, V.",
          year:2003,
          title:"Primate Hotspots on Borneo: Predictive Value for General Biodiversity and the Effects of Taxonomy",
          journal:"Conservation Biology 17(3): 725–732",
          doi:"10.1046/j.1523-1739.2003.01547.x",
          publisher:"https://doi.org/10.1046/j.1523-1739.2003.01547.x",
          oa:"https://conbio.onlinelibrary.wiley.com/doi/abs/10.1046/j.1523-1739.2003.01547.x",
          tags:["Conservation","Borneo","GIS","Biodiversity hotspots","Taxonomy"],
          question:"How much do biodiversity-hotspot maps depend on the species concept used, and do primate hotspots predict wider biodiversity?",
          method:"GIS mapping of 1,414 locality records for Bornean primates under alternative taxonomic schemes.",
          finding:"Species-richness hotspots were relatively stable, but endemic-species hotspots changed with taxonomy; primate hotspots were not reliable universal proxies for other taxa.",
          use:"Excellent example of an abstract taxonomic decision producing measurable conservation-planning consequences."
        },
        {
          id:"w2-rylands2014",
          authors:"Rylands, A. B. & Mittermeier, R. A.",
          year:2014,
          title:"Primate Taxonomy: Species and Conservation",
          journal:"Evolutionary Anthropology 23: 8–10",
          doi:"10.1002/evan.21387",
          publisher:"https://doi.org/10.1002/evan.21387",
          oa:"",
          tags:["Taxonomy","Conservation policy","Species concept","Critical debate"],
          question:"How should conservation respond when species lists and taxonomic hypotheses change?",
          method:"Conceptual discussion of primate taxonomy and conservation practice.",
          finding:"Species designations are hypotheses revised by morphology, genetics, physiology and behaviour; conservation systems that treat species as a basic currency are therefore sensitive to taxonomic change.",
          use:"Connects Week 2 directly to Week 8: taxonomy affects priorities, legislation, protected areas and captive management."
        }
      ]
    },
    {
      week: 3,
      topic: "Socio-ecology",
      concept: "How ecology, resource distribution and demography shape social organisation and relationships.",
      readings: [
        {
          id:"w3-kappeler2002",
          authors:"Kappeler, P. M. & van Schaik, C. P.",
          year:2002,
          title:"Evolution of Primate Social Systems",
          journal:"International Journal of Primatology 23(4): 707–740",
          doi:"10.1023/A:1015520830318",
          publisher:"https://doi.org/10.1023/A:1015520830318",
          oa:"",
          tags:["Socio-ecological model","Social organisation","Social structure","Mating system","Theory"],
          question:"How should primate social systems be decomposed, and what evolutionary forces generate their diversity?",
          method:"Synthetic review.",
          finding:"Social organisation, social structure and mating system are distinct components. Ecology and reproductive constraints interact, but simple explanations for solitary life and pair-living remain incomplete.",
          use:"The theoretical backbone for Week 3 and a vocabulary anchor for the whole course."
        },
        {
          id:"w3-lehmann2004",
          authors:"Lehmann, J. & Boesch, C.",
          year:2004,
          title:"To fission or to fusion: effects of community size on wild chimpanzee social organisation",
          journal:"Behavioral Ecology and Sociobiology 56: 207–216",
          doi:"10.1007/s00265-004-0781-x",
          publisher:"https://doi.org/10.1007/s00265-004-0781-x",
          oa:"",
          tags:["Chimpanzee","Fission–fusion","Group size","Longitudinal data","GIS"],
          question:"Does community size alter chimpanzee fission–fusion dynamics?",
          method:"Ten-year longitudinal field dataset combining focal observation, party composition, ranging/GIS and ecological controls.",
          finding:"As the community became smaller, parties became larger and more stable and male–female association increased, suggesting reduced fission–fusion flexibility in small communities.",
          use:"A strong model for linking demography to measurable social-organisation outcomes."
        },
        {
          id:"w3-dammhahn2009",
          authors:"Dammhahn, M. & Kappeler, P. M.",
          year:2009,
          title:"Females go where the food is: does the socio-ecological model explain variation in social organisation of solitary foragers?",
          journal:"Behavioral Ecology and Sociobiology 63: 939–952",
          doi:"10.1007/s00265-009-0737-2",
          publisher:"https://doi.org/10.1007/s00265-009-0737-2",
          oa:"https://link.springer.com/article/10.1007/s00265-009-0737-2",
          tags:["Mouse lemurs","Solitary foragers","Food distribution","Competition","Field experiment"],
          question:"Can the socio-ecological model explain social organisation even among solitary foragers?",
          method:"Comparative field study of two sympatric mouse lemurs plus experimental manipulation of resource distribution.",
          finding:"Female spatial organisation tracked resource distribution and competition regimes, supporting an ecology → competition → social-organisation link.",
          use:"Key paper for scramble vs contest competition and for turning ecological theory into an experimental design."
        }
      ]
    },
    {
      week: 4,
      topic: "Constraints on males & females",
      concept: "Sex-specific reproductive constraints, sexual conflict, mate choice, competition and investment.",
      readings: [
        {
          id:"w4-baniel2018",
          authors:"Baniel, A., Cowlishaw, G. & Huchard, E.",
          year:2018,
          title:"Jealous females? Female competition and reproductive suppression in a wild promiscuous primate",
          journal:"Proceedings of the Royal Society B 285: 20181332",
          doi:"10.1098/rspb.2018.1332",
          publisher:"https://doi.org/10.1098/rspb.2018.1332",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC6158522/",
          tags:["Baboons","Female competition","Paternal care","Reproductive suppression","GLMM"],
          question:"Do females compete over male paternal investment in a promiscuous primate?",
          method:"Focal behavioural observations, reproductive-state monitoring, mate-guarding, aggression, grooming/proximity and GLMMs.",
          finding:"Pregnant/lactating females targeted oestrous females especially when rivals interacted sexually with their male friends; harassment was associated with lower conception probability.",
          use:"Shows female–female competition over a subtle resource: paternal care."
        },
        {
          id:"w4-huchard2012",
          authors:"Huchard, E. et al.",
          year:2012,
          title:"Convenience polyandry or convenience polygyny? Costly sex under female control in a promiscuous primate",
          journal:"Proceedings of the Royal Society B 279: 1371–1379",
          doi:"10.1098/rspb.2011.1326",
          publisher:"https://doi.org/10.1098/rspb.2011.1326",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC3282357/",
          tags:["Mouse lemur","Polyandry","Sexual conflict","Female choice","Experiment"],
          question:"Is female multiple mating mainly a low-cost response to male harassment, or an adaptive strategy under female control?",
          method:"Experimental manipulation of female body condition followed by controlled mating trials.",
          finding:"Better-condition females were more polyandrous and multiple mating was energetically costly, supporting adaptive rather than convenience polyandry.",
          use:"A clean example of competing hypotheses generating opposite predictions."
        }
      ]
    },
    {
      week: 5,
      topic: "Aggression",
      concept: "Aggression as a reproductive strategy, sexual coercion, infanticide and counter-strategies.",
      readings: [
        {
          id:"w5-baniel2017",
          authors:"Baniel, A., Cowlishaw, G. & Huchard, E.",
          year:2017,
          title:"Male Violence and Sexual Intimidation in a Wild Primate Society",
          journal:"Current Biology 27: 2163–2168.e3",
          doi:"10.1016/j.cub.2017.06.013",
          publisher:"https://doi.org/10.1016/j.cub.2017.06.013",
          oa:"https://discovery.ucl.ac.uk/id/eprint/1567826/",
          tags:["Baboons","Aggression","Sexual coercion","Intimidation","Mate guarding"],
          question:"Does repeated male aggression toward females function as sexual coercion with delayed mating benefits?",
          method:"Long-term behavioural data combining aggression, injuries, fertility state, mate-guarding and temporal tests of alternative coercion mechanisms.",
          finding:"Male aggression disproportionately targeted fertile females, imposed injury costs, and predicted later—not immediate—mating success, consistent with sexual intimidation.",
          use:"Demonstrates why temporal sequence can distinguish harassment, punishment and intimidation."
        },
        {
          id:"w5-roberts2012",
          authors:"Roberts, E. K., Lu, A., Bergman, T. J. & Beehner, J. C.",
          year:2012,
          title:"A Bruce Effect in Wild Geladas",
          journal:"Science 335: 1222–1225",
          doi:"10.1126/science.1213600",
          publisher:"https://doi.org/10.1126/science.1213600",
          oa:"",
          tags:["Geladas","Infanticide","Bruce effect","Pregnancy termination","Hormones"],
          question:"Do wild females terminate pregnancies after male takeover when future infanticide makes current investment risky?",
          method:"Five-year demographic data, male-replacement events and faecal oestrogen monitoring.",
          finding:"Most ongoing pregnancies observed around male replacement failed soon after takeover, supporting a wild Bruce effect and an adaptive reproductive counter-strategy interpretation.",
          use:"Shows how physiology can identify a mechanism that behavioural observations alone cannot resolve."
        }
      ]
    },
    {
      week: 6,
      topic: "Reading Week",
      concept: "No taxon handout. Consolidate literature and begin the project proposal in earnest.",
      readings: []
    },
    {
      week: 7,
      topic: "Life History",
      concept: "How energy and time are allocated across growth, maternal investment, weaning, maturation, dispersal and reproduction.",
      readings: [
        {
          id:"w7-hinde2011",
          authors:"Hinde, K. & Milligan, L. A.",
          year:2011,
          title:"Primate Milk: Proximate Mechanisms and Ultimate Perspectives",
          journal:"Evolutionary Anthropology 20: 9–23",
          doi:"10.1002/evan.20289",
          publisher:"https://doi.org/10.1002/evan.20289",
          oa:"",
          tags:["Lactation","Maternal investment","Energetics","Life history"],
          question:"How do proximate milk-production mechanisms relate to evolved primate lactation strategies?",
          method:"Integrative review.",
          finding:"Primate lactation strategies involve linked trade-offs among nursing pattern, lactation length, offspring number/sex, milk composition and milk yield.",
          use:"A foundation for maternal investment, quality–quantity trade-offs and energetic life-history reasoning."
        },
        {
          id:"w7-mandalaywala2014",
          authors:"Mandalaywala, T. M. et al.",
          year:2014,
          title:"Physiological and behavioural responses to weaning conflict in free-ranging primate infants",
          journal:"Animal Behaviour 97: 241–247",
          doi:"10.1016/j.anbehav.2014.09.016",
          publisher:"https://doi.org/10.1016/j.anbehav.2014.09.016",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC4242433/",
          tags:["Rhesus macaques","Weaning","Parent–offspring conflict","Glucocorticoids"],
          question:"Does maternal rejection during weaning produce measurable physiological as well as behavioural stress in infants?",
          method:"Free-ranging infant focal observations plus faecal glucocorticoid metabolite measures.",
          finding:"Maternal rejection predicted higher fGCM; higher fGCM predicted more mother-following, which was associated with greater nipple access.",
          use:"Strong mixed behaviour + non-invasive physiology design."
        },
        {
          id:"w7-onyango2013",
          authors:"Onyango, P. O., Gesquiere, L. R., Altmann, J. & Alberts, S. C.",
          year:2013,
          title:"Puberty and dispersal in a wild primate population",
          journal:"Hormones and Behavior 64: 240–249",
          doi:"10.1016/j.yhbeh.2013.02.014",
          publisher:"https://doi.org/10.1016/j.yhbeh.2013.02.014",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC3764504/",
          tags:["Baboons","Puberty","Dispersal","Maturation","Longitudinal"],
          question:"What ecological, social and biological factors explain variation in maturation and dispersal timing?",
          method:"Synthesis of long-term Amboseli baboon growth, maturation, ecological and social data.",
          finding:"Maturation timing is plastic: nutrition, sex, maternal rank and other factors shift developmental pace; dispersal is a cost–benefit life-history transition rather than a fixed age event.",
          use:"Anchor for longitudinal life-history methods and age-at-event questions."
        }
      ]
    },
    {
      week: 8,
      topic: "Conservation",
      concept: "Threats, extinction risk, intervention, human systems and new monitoring tools.",
      readings: [
        {
          id:"w8-wich2016",
          authors:"Wich, S. A. & Marshall, A. J. (eds.)",
          year:2016,
          title:"An Introduction to Primate Conservation",
          journal:"Oxford University Press, Chapter 1",
          doi:"10.1093/acprof:oso/9780198703389.003.0001",
          publisher:"https://doi.org/10.1093/acprof:oso/9780198703389.003.0001",
          oa:"",
          tags:["Conservation","Threats","Habitat loss","IUCN","Foundational"],
          question:"What are the major threats to primates and the main evidence-based approaches to their long-term preservation?",
          method:"Introductory synthesis.",
          finding:"Primate conservation integrates ecology, behaviour, distribution, threats, law, management and human land-use systems rather than simply protecting individual animals.",
          use:"Foundational framework; also links Week 7 slow life histories to recovery constraints."
        },
        {
          id:"w8-estrada2017",
          authors:"Estrada, A. et al.",
          year:2017,
          title:"Impending extinction crisis of the world's primates: Why primates matter",
          journal:"Science Advances 3: e1600946",
          doi:"10.1126/sciadv.1600946",
          publisher:"https://doi.org/10.1126/sciadv.1600946",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC5242557/",
          tags:["Extinction risk","Habitat loss","Hunting","Human–primate interface","Global synthesis"],
          question:"How severe is the global primate conservation crisis, what drives it, and why does primate loss matter?",
          method:"Global synthesis using Red List, literature, forest-loss and socio-economic datasets.",
          finding:"The paper documents widespread population decline driven by interacting habitat, exploitation, infrastructure, climate and disease pressures and argues conservation must be integrated with local livelihoods and governance.",
          use:"Macro-scale threat framing and a bridge between behavioural ecology, conservation and anthropology."
        },
        {
          id:"w8-stumpf2016",
          authors:"Stumpf, R. M. et al.",
          year:2016,
          title:"Microbiomes, metagenomics, and primate conservation: New strategies, tools, and applications",
          journal:"Biological Conservation 199: 56–66",
          doi:"10.1016/j.biocon.2016.03.035",
          publisher:"https://doi.org/10.1016/j.biocon.2016.03.035",
          oa:"",
          tags:["Microbiome","Metagenomics","Conservation tools","Disease","Reintroduction"],
          question:"Can host-associated microbiomes become useful indicators and tools in primate conservation?",
          method:"Review and methods perspective.",
          finding:"Microbiome data may inform habitat quality, nutrition, disease transmission, population health and reintroduction, but the approach remains emerging rather than a mature policy standard.",
          use:"Frontier methods example and a caution about distinguishing promising tools from established conservation practice."
        }
      ]
    },
    {
      week: 9,
      topic: "Cognition",
      concept: "How observable behaviour can—and cannot—support inferences about hidden cognitive capacities.",
      readings: [
        {
          id:"w9-chang2017",
          authors:"Chang, L., Zhang, S., Poo, M.-M. & Gong, N.",
          year:2017,
          title:"Spontaneous expression of mirror self-recognition in monkeys after learning precise visual-proprioceptive association for mirror images",
          journal:"PNAS 114: 3258–3263",
          doi:"10.1073/pnas.1620764114",
          publisher:"https://doi.org/10.1073/pnas.1620764114",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC5373394/",
          tags:["Rhesus macaques","Mirror self-recognition","Self-awareness","Experimental cognition"],
          question:"Does macaque failure on standard mirror tests reflect absence of self-recognition or a missing visual–proprioceptive mapping skill?",
          method:"Training study with precise mirror-guided visual–proprioceptive association, mark tests, controls and transfer to spontaneous home-cage behaviour.",
          finding:"After precise mapping training, monkeys passed mark tests and displayed spontaneous mirror-guided self-directed behaviours; the authors interpret this cautiously as evidence relevant to bodily self-consciousness, not proof of full human-like self-awareness.",
          use:"Core lesson: task failure is not identical to capacity absence; cognition requires careful operationalisation and controls."
        },
        {
          id:"w9-lonsdorf2020",
          authors:"Lonsdorf, E. V. et al.",
          year:2020,
          title:"Why chimpanzees carry dead infants: an empirical assessment of existing hypotheses",
          journal:"Royal Society Open Science 7: 200931",
          doi:"10.1098/rsos.200931",
          publisher:"https://doi.org/10.1098/rsos.200931",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC7428235/",
          tags:["Chimpanzees","Thanatology","Death concept","Competing hypotheses","Long-term data"],
          question:"Which existing hypotheses explain variation in chimpanzee infant-corpse carrying?",
          method:"Long-term Gombe field archive; 33 carrying cases; information-theoretic comparison of competing models.",
          finding:"None of the leading predictors clearly outperformed the null model. Behaviour suggested mothers rapidly recognised a changed state, but recognising a dead individual is not equivalent to possessing a human-like abstract concept of death.",
          use:"Exemplary competing-hypothesis design and a reminder that null results can be theoretically informative."
        }
      ]
    },
    {
      week: 10,
      topic: "Culture",
      concept: "How innovations arise, persist, spread socially and become population-level traditions under ecological selection.",
      readings: [
        {
          id:"w10-perry2017",
          authors:"Perry, S. E., Barrett, B. J. & Godoy, I.",
          year:2017,
          title:"Older, sociable capuchins (Cebus capucinus) invent more social behaviors, but younger monkeys innovate more in other contexts",
          journal:"PNAS 114: 7806–7813",
          doi:"10.1073/pnas.1620739114",
          publisher:"https://doi.org/10.1073/pnas.1620739114",
          oa:"https://pmc.ncbi.nlm.nih.gov/articles/PMC5544268/",
          tags:["Capuchins","Innovation","Social learning","Cultural evolution","Longitudinal"],
          question:"Who innovates in wild capuchins, in which behavioural domains, and which innovations persist or spread?",
          method:"Ten-year systematic longitudinal study across 10 groups and 234 individuals, using a five-year baseline to identify later novel behaviours.",
          finding:"Innovation was domain-specific: younger monkeys produced more foraging/investigative/self-directed innovations, whereas older and more social monkeys produced more social innovations. Most innovations disappeared; only a minority spread to groupmates.",
          use:"Separates innovation, retention, transmission and tradition—the basic pipeline of cultural evolution."
        },
        {
          id:"w10-kalan2020",
          authors:"Kalan, A. K. et al.",
          year:2020,
          title:"Environmental variability supports chimpanzee behavioural diversity",
          journal:"Nature Communications 11: 4451",
          doi:"10.1038/s41467-020-18176-3",
          publisher:"https://doi.org/10.1038/s41467-020-18176-3",
          oa:"https://www.nature.com/articles/s41467-020-18176-3",
          tags:["Chimpanzees","Behavioural diversity","Environmental variability","Culture","Bayesian models"],
          question:"Does environmental variability across recent and historical timescales predict within-species chimpanzee behavioural diversity?",
          method:"Comparative analysis of 144 chimpanzee communities and 31 behaviours using Bayesian regression, climate/habitat metrics and distance to Pleistocene forest refugia.",
          finding:"Behavioural diversity was greater in more variable settings, especially further from historically stable forest refugia. The result supports—but does not by itself prove—an ecology → innovation/retention → cultural diversification pathway.",
          use:"Population-scale bridge between ecology, behavioural flexibility, culture and conservation."
        }
      ]
    }
  ],

  assessment: {
    summary:"One assessment worth 100%: a Reflect portfolio built around designing and writing parts of a primatology research-grant-style project proposal.",
    portfolioPages:[
      {name:"Annotated bibliography", detail:"Important papers read while designing the project; organise notes by the suggested topic structure."},
      {name:"Journal on feedback", detail:"Reflections on feedback received and given, with headings that make the revision trail easy to follow."},
      {name:"Project methodology", detail:"No more than 750 words. Must reach a satisfactory level."},
      {name:"Project budget", detail:"Itemised budget plus justification. Current 26/27 budget ceiling must be verified from Moodle before being hard-coded."}
    ],
    first:[
      "Complete annotated-bibliography weekly topics with a minimum of 5 articles for each topic week (5 weeks; minimum total 25).",
      "Complete the title and research-question activity for feedback by the scheduled date.",
      "Complete the journal feedback activities.",
      "Discuss the project with a module leader in person to get feedback.",
      "Complete the peer-review activity.",
      "Be involved in peer-to-peer feedback.",
      "Complete the methodology worksheet to a satisfactory level, incorporating feedback if necessary.",
      "Complete the budget thoughtfully and thoroughly.",
      "Attend all lectures and tutorials/seminars unless there is an extenuating circumstance."
    ],
    twoOne:[
      "Minimum 3 annotated-bibliography articles per topic week.",
      "Complete title and research-question activity by the scheduled date.",
      "Discuss project with a module leader in person.",
      "Complete some journal feedback activities.",
      "Complete peer review.",
      "Methodology satisfactory, with feedback incorporated if needed.",
      "Complete budget.",
      "Attend most (>85%) lectures and tutorials."
    ],
    rules:[
      "Contract may be reviewed up to Week 7. After Week 7 the contracted band is locked.",
      "Failure to complete the contracted tasks results in 45.",
      "A First contract anchors at 75; exceptional quality may be modified upward at the marker's discretion, up to 85.",
      "A 2.i contract anchors at 65 and may be modified up to 69; a 2.ii contract anchors at 55 and may be modified up to 59.",
      "There are two rounds of methodology feedback. A poorly thought-through submission returned as 'needs improvement' still uses one feedback round."
    ],
    criteria:[
      {group:"Style", name:"Clear explanations, no jargon, terms defined", max:2},
      {group:"Style", name:"Cohesive and easy to follow, appropriate flagging", max:3},
      {group:"Style", name:"Grammar, spelling and proofreading", max:3},
      {group:"Style", name:"Correct acknowledgement of sources in text", max:3},
      {group:"Style", name:"Bibliography: depth of selection and consistent presentation", max:2},
      {group:"Style", name:"Overall presentation and layout", max:2},
      {group:"Content", name:"Introduction reflects current understanding; literature reviewed and synthesised", max:5},
      {group:"Content", name:"Identify a gap in the literature", max:10},
      {group:"Content", name:"Identify research question and project aims", max:10},
      {group:"Content", name:"Methodology addresses research question", max:10},
      {group:"Content", name:"Methodology attainable", max:5},
      {group:"Content", name:"Budget reasonable", max:5},
      {group:"Content", name:"Budget justification sufficient", max:5},
      {group:"Feedback", name:"Engaged with and incorporated relevant feedback received", max:10},
      {group:"Feedback", name:"Provided constructive feedback on peers' submitted content", max:10}
    ]
  },

  taxa: [
    {week:2, name:"Lemurs", hooks:"Adaptive radiation, seasonality, female dominance, torpor/hibernation, conservation."},
    {week:3, name:"Lorises, galagos, tarsiers", hooks:"Nocturnality, sensory ecology, locomotion; slow-loris venom as an evolutionary puzzle."},
    {week:3, name:"Howlers & spider monkeys", hooks:"Diet and energetics; fission–fusion, social networks and parasite transmission."},
    {week:4, name:"Capuchins", hooks:"Innovation, extractive foraging, social conventions, culture and cognition."},
    {week:4, name:"Callitrichids", hooks:"Cooperative breeding, infant care, vocal turn-taking and communication."},
    {week:5, name:"Colobines", hooks:"Folivory, digestive adaptation, ranging and social organisation."},
    {week:5, name:"Macaques", hooks:"Dominance, grooming, human–primate interfaces, social learning and disease ecology."},
    {week:7, name:"Baboons", hooks:"Dominance, kinship, social relationships, stress, life history and reproductive conflict."},
    {week:7, name:"Guenons", hooks:"African forest ecology, mixed-species associations and communication."},
    {week:8, name:"Mangabeys, drills, mandrills", hooks:"Old World monkey socioecology, sexual selection and conservation."},
    {week:8, name:"Gibbons", hooks:"Pair living, territoriality, vocal communication and brachiation."},
    {week:9, name:"Orangutans", hooks:"Semi-solitary social systems, culture, development and tool use."},
    {week:9, name:"Gorillas", hooks:"Social organisation, life history, feeding ecology and conservation."}
  ],

  researchAtlas: [
    {
      name:"Socioecology & Social Networks",
      question:"How do resources, risk and demography shape association, dominance and social-network structure?",
      frontier:"Connect classical socioecology to network analysis, disease transmission, disturbance and fitness.",
      seeds:[
        {label:"Course anchor: Evolution of Primate Social Systems", url:"https://doi.org/10.1023/A:1015520830318"},
        {label:"Course anchor: chimpanzee fission–fusion", url:"https://doi.org/10.1007/s00265-004-0781-x"}
      ]
    },
    {
      name:"Communication & Language Evolution",
      question:"How flexible are primate signals, and when does signalling become partner-sensitive, sequential or learned?",
      frontier:"Vocal turn-taking, social complexity, anthropogenic noise and multimodal communication.",
      seeds:[
        {label:"Search current marmoset turn-taking literature", url:"https://pubmed.ncbi.nlm.nih.gov/?term=marmoset+vocal+turn-taking"}
      ]
    },
    {
      name:"Cognition",
      question:"What experimental evidence distinguishes a cognitive capacity from task-specific learning or motivation?",
      frontier:"Metacognition, self-recognition, causal inference, field cognition and ecologically valid task design.",
      seeds:[
        {label:"Course anchor: mirror self-recognition", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC5373394/"},
        {label:"Course anchor: chimpanzee thanatology", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC7428235/"}
      ]
    },
    {
      name:"Culture & Social Learning",
      question:"How do innovations arise, diffuse through networks and become stable traditions?",
      frontier:"Network-based diffusion, cultural conservation, cumulative culture and cultural niche construction.",
      seeds:[
        {label:"Course anchor: capuchin innovation", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC5544268/"},
        {label:"Course anchor: chimpanzee behavioural diversity", url:"https://www.nature.com/articles/s41467-020-18176-3"}
      ]
    },
    {
      name:"Life History & Energetics",
      question:"How is limited energy allocated across growth, reproduction, offspring investment and survival?",
      frontier:"Social ageing, longitudinal physiology, maternal effects, developmental plasticity and energetic constraints.",
      seeds:[
        {label:"Course anchor: primate milk", url:"https://doi.org/10.1002/evan.20289"},
        {label:"Course anchor: puberty and dispersal", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC3764504/"}
      ]
    },
    {
      name:"Conservation & Anthropocene",
      question:"How do habitat change, exploitation, climate and human systems alter primate behaviour and viability?",
      frontier:"Behavioural flexibility, human–primate interfaces, One Health, cultural conservation and restoration ecology.",
      seeds:[
        {label:"Global extinction crisis", url:"https://doi.org/10.1126/sciadv.1600946"},
        {label:"Microbiomes & conservation", url:"https://doi.org/10.1016/j.biocon.2016.03.035"}
      ]
    },
    {
      name:"Disease Ecology & Microbiomes",
      question:"How do social networks, habitat and microbial communities shape exposure, health and resilience?",
      frontier:"Non-invasive metagenomics, network epidemiology and cross-species transmission.",
      seeds:[
        {label:"Course anchor: microbiomes", url:"https://doi.org/10.1016/j.biocon.2016.03.035"}
      ]
    },
    {
      name:"Sexual Selection & Reproductive Conflict",
      question:"How do sex-specific constraints generate mate choice, coercion, competition and counter-strategies?",
      frontier:"Female–female competition, reproductive suppression, paternal investment and condition-dependent mating.",
      seeds:[
        {label:"Female competition over paternal care", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC6158522/"},
        {label:"Sexual intimidation", url:"https://discovery.ucl.ac.uk/id/eprint/1567826/"}
      ]
    }
  ],

  methods: {
    external:[
      {name:"BORIS", description:"Open-source behavioural observation and event coding.", url:"https://www.boris.unito.it/"},
      {name:"VOSviewer", description:"Bibliometric mapping: co-citation, bibliographic coupling, keyword networks.", url:"https://www.vosviewer.com/"},
      {name:"ResearchRabbit", description:"Explore citation networks and expand from seed papers.", url:"https://www.researchrabbit.ai/"},
      {name:"Connected Papers", description:"Visualise conceptual neighbours using co-citation and bibliographic coupling.", url:"https://www.connectedpapers.com/"}
    ],
    sampling:[
      {name:"Focal animal sampling", best:"Individual activity budgets, dyadic interactions, state durations.", caution:"Balance individuals and time of day; account for lost follows and visibility."},
      {name:"Scan sampling", best:"Group-level state, spacing and activity at repeated time points.", caution:"Interval choice affects independence and rare-event detection."},
      {name:"All-occurrence sampling", best:"Rare, discrete events such as aggression, copulation or vocal signals.", caution:"Observation effort and detectability must be explicit."},
      {name:"Ad libitum sampling", best:"Discovery, unusual events and pilot ethograms.", caution:"Not reliable for unbiased rate comparisons."},
      {name:"Passive acoustic monitoring", best:"Vocal activity, temporal patterns and communication in hard-to-observe settings.", caution:"Detection distance, call classification and background noise require calibration."},
      {name:"Non-invasive hormones", best:"Stress, reproductive physiology and energetic state.", caution:"Validate time lags, collection conditions and assay interpretation."}
    ]
  }
};