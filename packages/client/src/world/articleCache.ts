// Pre-cached Wikipedia articles - 150+ interconnected philosophical and scientific concepts
// Creates a rich web of knowledge to navigate

export interface CachedArticle {
  title: string;
  extract: string;
  links: string[];
}

export const ARTICLE_CACHE: Record<string, CachedArticle> = {
  // === PHILOSOPHY CORE ===
  "Philosophy": {
    title: "Philosophy",
    extract: "Philosophy is a systematic study of general and fundamental questions concerning topics like existence, knowledge, mind, reason, language, and value. It is a rational and critical inquiry that reflects on its methods and assumptions. Philosophical questions include questions about logic, ethics, aesthetics, epistemology, and metaphysics. Philosophy has shaped human civilization for millennia, from ancient Greece to modern academia.",
    links: ["Metaphysics", "Epistemology", "Ethics", "Logic", "Aesthetics", "Mind", "Knowledge", "Truth", "Reality", "Existence"]
  },
  "Metaphysics": {
    title: "Metaphysics",
    extract: "Metaphysics is the branch of philosophy that examines the basic structure of reality. It is traditionally seen as the study of mind-independent features of the world. Metaphysics asks questions like: What is there? What is it like? It explores concepts such as being, existence, causality, space, time, and possibility. Aristotle called it first philosophy.",
    links: ["Philosophy", "Ontology", "Reality", "Existence", "Being", "Causality", "Space", "Time", "Substance", "Property"]
  },
  "Epistemology": {
    title: "Epistemology",
    extract: "Epistemology is the branch of philosophy that examines the nature, origin, and limits of knowledge. It explores different types of knowledge including propositional knowledge, practical skills, and knowledge by acquaintance. Epistemologists study belief, truth, and justification to understand how we can know anything at all.",
    links: ["Philosophy", "Knowledge", "Truth", "Belief", "Justification", "Rationalism", "Empiricism", "Skepticism", "Perception", "Reason"]
  },
  "Ethics": {
    title: "Ethics",
    extract: "Ethics is the philosophical study of moral phenomena. Also called moral philosophy, it investigates normative questions about what people ought to do or which behavior is morally right. Its main branches include normative ethics, applied ethics, and metaethics. Ethics shapes how we live together in society.",
    links: ["Philosophy", "Morality", "Justice", "Virtue", "Good", "Evil", "Rights", "Duty", "Happiness", "Freedom"]
  },
  "Logic": {
    title: "Logic",
    extract: "Logic is the study of correct reasoning. It includes both formal and informal logic. Formal logic examines deductively valid inferences based on the structure of arguments alone. Logic plays a central role in philosophy, mathematics, computer science, and linguistics. The laws of logic have been debated since ancient times.",
    links: ["Philosophy", "Reason", "Mathematics", "Truth", "Argument", "Proposition", "Inference", "Validity", "Fallacy", "Proof"]
  },
  "Aesthetics": {
    title: "Aesthetics",
    extract: "Aesthetics is the branch of philosophy that studies beauty, taste, and related phenomena. It includes the philosophy of art, examining the nature of artistic creativity, the meanings of artworks, and audience appreciation. Aesthetics asks what makes something beautiful and why we value art.",
    links: ["Philosophy", "Beauty", "Art", "Taste", "Sublime", "Creativity", "Expression", "Form", "Culture", "Perception"]
  },

  // === MIND AND CONSCIOUSNESS ===
  "Mind": {
    title: "Mind",
    extract: "The mind is that which thinks, feels, perceives, imagines, remembers, and wills. It covers all mental phenomena including conscious and unconscious processes. The mind-body problem asks how mental states relate to physical brain states. Theories range from dualism to physicalism.",
    links: ["Consciousness", "Brain", "Thought", "Perception", "Memory", "Emotion", "Will", "Self", "Psychology", "Philosophy"]
  },
  "Consciousness": {
    title: "Consciousness",
    extract: "Consciousness is awareness of internal and external existence. It has been debated by philosophers and scientists for millennia. The hard problem of consciousness asks why physical processes give rise to subjective experience. There is no consensus on what consciousness fundamentally is.",
    links: ["Mind", "Awareness", "Experience", "Qualia", "Self", "Brain", "Perception", "Sleep", "Dream", "Philosophy"]
  },
  "Thought": {
    title: "Thought",
    extract: "Thought encompasses mental processes including reasoning, problem-solving, judgment, and imagination. Thinking allows humans to model the world and make predictions. Different philosophical traditions have debated whether thought requires language and how thought relates to reality.",
    links: ["Mind", "Reason", "Logic", "Language", "Cognition", "Intelligence", "Idea", "Concept", "Brain", "Philosophy"]
  },
  "Perception": {
    title: "Perception",
    extract: "Perception is the organization and interpretation of sensory information to understand the environment. It involves sight, hearing, touch, taste, and smell. Philosophers debate whether perception gives us direct access to reality or only representations. Perception shapes our entire experience of the world.",
    links: ["Mind", "Sense", "Reality", "Experience", "Consciousness", "Brain", "Vision", "Hearing", "Illusion", "Knowledge"]
  },
  "Memory": {
    title: "Memory",
    extract: "Memory is the faculty by which the mind stores and remembers information. It includes encoding, storage, and retrieval of experiences. Memory shapes personal identity and enables learning. Philosophers examine the reliability of memory and its role in knowledge.",
    links: ["Mind", "Time", "Experience", "Learning", "Identity", "Brain", "Knowledge", "Past", "Forgetting", "Psychology"]
  },
  "Emotion": {
    title: "Emotion",
    extract: "Emotions are complex psychological states involving subjective experience, physiological response, and behavioral expression. Basic emotions include happiness, sadness, fear, anger, surprise, and disgust. Philosophers debate whether emotions are rational and how they relate to judgment and action.",
    links: ["Mind", "Feeling", "Psychology", "Happiness", "Fear", "Love", "Anger", "Desire", "Reason", "Body"]
  },
  "Will": {
    title: "Will",
    extract: "Will is the mental faculty by which a person decides on and initiates action. Free will is the ability to choose between different possible courses of action. The existence of free will is one of the oldest philosophical debates, with implications for morality, law, and personal responsibility.",
    links: ["Freedom", "Choice", "Action", "Mind", "Determinism", "Agency", "Intention", "Desire", "Ethics", "Philosophy"]
  },
  "Self": {
    title: "Self",
    extract: "The self is an individual person as the object of introspection. It encompasses personal identity, consciousness, and the sense of being a unified subject. Philosophers debate whether the self is an illusion, a soul, a narrative, or a bundle of experiences.",
    links: ["Identity", "Consciousness", "Mind", "Person", "Soul", "Ego", "Subject", "Experience", "Psychology", "Philosophy"]
  },
  "Dream": {
    title: "Dream",
    extract: "Dreams are successions of images, ideas, emotions, and sensations occurring involuntarily during sleep. Philosophers have long pondered the relationship between dreams and reality. Can we know we are not dreaming right now? Dreams raise questions about consciousness and perception.",
    links: ["Sleep", "Consciousness", "Mind", "Reality", "Imagination", "Psychology", "Perception", "Experience", "Memory", "Philosophy"]
  },

  // === KNOWLEDGE AND TRUTH ===
  "Knowledge": {
    title: "Knowledge",
    extract: "Knowledge is awareness of facts, familiarity with individuals and situations, or practical skill. Propositional knowledge is often characterized as justified true belief. The Gettier problem challenges this definition. Knowledge is central to epistemology and shapes human civilization.",
    links: ["Truth", "Belief", "Justification", "Epistemology", "Understanding", "Wisdom", "Science", "Learning", "Reason", "Experience"]
  },
  "Truth": {
    title: "Truth",
    extract: "Truth is conformity to reality or fact. Theories of truth include correspondence, coherence, pragmatic, and deflationary theories. Truth is closely related to knowledge, belief, and language. The pursuit of truth drives philosophy and science.",
    links: ["Reality", "Knowledge", "Belief", "Logic", "Fact", "Proposition", "Language", "Philosophy", "Science", "Falsehood"]
  },
  "Belief": {
    title: "Belief",
    extract: "Belief is an attitude that something is the case or that some proposition is true. Beliefs may be justified or unjustified, true or false. The relationship between belief, truth, and knowledge is central to epistemology. Beliefs guide human action and shape societies.",
    links: ["Knowledge", "Truth", "Faith", "Opinion", "Mind", "Justification", "Doubt", "Certainty", "Religion", "Philosophy"]
  },
  "Reason": {
    title: "Reason",
    extract: "Reason is the capacity of applying logic consciously to seek truth. It is associated with thinking, cognition, and intellect. Philosophers debate the nature and limits of reason, asking whether reason alone can provide knowledge or must be supplemented by experience.",
    links: ["Logic", "Rationality", "Mind", "Knowledge", "Truth", "Philosophy", "Thought", "Argument", "Understanding", "Wisdom"]
  },
  "Understanding": {
    title: "Understanding",
    extract: "Understanding is a psychological process of comprehension and grasp of concepts. It goes beyond mere knowledge to include insight into relationships and implications. Understanding is essential for wisdom and effective action in the world.",
    links: ["Knowledge", "Wisdom", "Comprehension", "Mind", "Learning", "Insight", "Meaning", "Explanation", "Truth", "Reason"]
  },
  "Wisdom": {
    title: "Wisdom",
    extract: "Wisdom is the ability to think and act using knowledge, experience, understanding, and insight. It involves a deep understanding of people, things, events, and situations. Wisdom is often associated with good judgment and the pursuit of the good life.",
    links: ["Knowledge", "Understanding", "Philosophy", "Virtue", "Experience", "Judgment", "Truth", "Ethics", "Mind", "Age"]
  },

  // === REALITY AND EXISTENCE ===
  "Reality": {
    title: "Reality",
    extract: "Reality is the state of everything that exists. Philosophers distinguish between appearance and reality, questioning whether the world we perceive corresponds to things as they truly are. The nature of reality is debated between materialists, idealists, and dualists.",
    links: ["Existence", "Truth", "Perception", "Metaphysics", "Appearance", "Matter", "Mind", "Space", "Time", "Philosophy"]
  },
  "Existence": {
    title: "Existence",
    extract: "Existence is the state of having being or reality. It is often contrasted with essence: what something is versus that it is. Philosophers debate what it means for something to exist and whether existence is a property. Existentialism focuses on individual existence and meaning.",
    links: ["Being", "Reality", "Metaphysics", "Essence", "Ontology", "Life", "Death", "Meaning", "Philosophy", "Nothing"]
  },
  "Being": {
    title: "Being",
    extract: "Being is the broadest concept encompassing objective and subjective features of existence. The study of being is called ontology. Philosophers from Parmenides to Heidegger have asked what it means to be. Being is fundamental to all metaphysical inquiry.",
    links: ["Existence", "Ontology", "Metaphysics", "Reality", "Essence", "Nothing", "Becoming", "Substance", "Entity", "Philosophy"]
  },
  "Nothing": {
    title: "Nothing",
    extract: "Nothing is the absence or opposite of anything. Philosophers have long pondered why there is something rather than nothing. The concept of nothing raises paradoxes: can nothing exist? Is absolute nothing even conceivable? Nothing challenges our understanding of being.",
    links: ["Being", "Existence", "Void", "Zero", "Absence", "Metaphysics", "Philosophy", "Space", "Reality", "Meaning"]
  },
  "Void": {
    title: "Void",
    extract: "The void is empty space, the absence of matter. Ancient atomists believed atoms moved through the void. Modern physics has transformed our understanding of empty space, which is filled with quantum fields. The void raises deep questions about the nature of space.",
    links: ["Nothing", "Space", "Vacuum", "Emptiness", "Physics", "Atom", "Matter", "Existence", "Reality", "Philosophy"]
  },

  // === TIME AND SPACE ===
  "Time": {
    title: "Time",
    extract: "Time is the continuous progression of existence from past through present to future. It is a fundamental dimension alongside space. Philosophers debate whether time is absolute or relative, whether the flow of time is real, and whether past and future exist. Time shapes all experience.",
    links: ["Space", "Past", "Present", "Future", "Change", "Causality", "Physics", "Memory", "Existence", "Philosophy"]
  },
  "Space": {
    title: "Space",
    extract: "Space is the three-dimensional continuum containing positions and directions. With time, it forms spacetime. Philosophers debate whether space is absolute or relational, and whether it exists independently of objects. Space is fundamental to physics and our experience of the world.",
    links: ["Time", "Dimension", "Physics", "Place", "Distance", "Geometry", "Matter", "Void", "Universe", "Reality"]
  },
  "Past": {
    title: "Past",
    extract: "The past consists of events that have already occurred. It is preserved in memory and historical records. Philosophers debate whether the past still exists in some sense or is entirely gone. The past shapes who we are and constrains what is possible.",
    links: ["Time", "Memory", "History", "Present", "Future", "Change", "Causality", "Experience", "Truth", "Knowledge"]
  },
  "Present": {
    title: "Present",
    extract: "The present is the time occurring now, the boundary between past and future. Philosophers debate whether the present has any duration or is an instantaneous moment. Some argue only the present truly exists. Experiencing the present is fundamental to consciousness.",
    links: ["Time", "Past", "Future", "Now", "Moment", "Experience", "Consciousness", "Reality", "Change", "Existence"]
  },
  "Future": {
    title: "Future",
    extract: "The future is what will happen after the present moment. It is the domain of possibility, uncertainty, and anticipation. Philosophers debate whether the future already exists, is determined, or genuinely open. Hope and fear both orient us toward the future.",
    links: ["Time", "Past", "Present", "Possibility", "Causality", "Fate", "Hope", "Fear", "Change", "Determinism"]
  },
  "Eternity": {
    title: "Eternity",
    extract: "Eternity is infinite or unending time, or existence outside of time altogether. Theologians often describe God as eternal. Philosophers debate whether eternity is endless duration or timelessness. The concept challenges our temporal understanding of existence.",
    links: ["Time", "Infinity", "God", "Immortality", "Death", "Religion", "Philosophy", "Existence", "Being", "Forever"]
  },
  "Infinity": {
    title: "Infinity",
    extract: "Infinity is a concept describing something without bound or end. In mathematics, infinite sets and infinitesimals are precisely defined. Philosophers debate whether actual infinities exist in reality or only as potential. Infinity challenges human comprehension.",
    links: ["Mathematics", "Eternity", "Universe", "Number", "God", "Limit", "Paradox", "Space", "Time", "Philosophy"]
  },

  // === CAUSALITY AND CHANGE ===
  "Causality": {
    title: "Causality",
    extract: "Causality is the relationship between cause and effect. Hume famously questioned whether we can know causal connections or only observe constant conjunction. Causality is fundamental to science, law, and everyday reasoning about the world.",
    links: ["Cause", "Effect", "Time", "Science", "Determinism", "Freedom", "Law", "Explanation", "Hume", "Philosophy"]
  },
  "Change": {
    title: "Change",
    extract: "Change is the process of becoming different over time. Heraclitus said everything flows. Parmenides denied change was real. Change raises philosophical puzzles about identity and persistence. Understanding change is essential to understanding reality.",
    links: ["Time", "Becoming", "Process", "Identity", "Motion", "Growth", "Decay", "Causality", "Permanence", "Philosophy"]
  },
  "Becoming": {
    title: "Becoming",
    extract: "Becoming is the process of coming into being or changing. It contrasts with static being. Process philosophers emphasize becoming over being as fundamental to reality. Becoming captures the dynamic nature of existence.",
    links: ["Being", "Change", "Process", "Time", "Growth", "Development", "Creation", "Existence", "Reality", "Philosophy"]
  },
  "Cause": {
    title: "Cause",
    extract: "A cause is what makes something happen or exist. Aristotle distinguished material, formal, efficient, and final causes. Understanding causes is essential for explanation, prediction, and control. Science seeks to discover causes.",
    links: ["Effect", "Causality", "Explanation", "Science", "Reason", "Action", "Determinism", "Event", "Why", "Philosophy"]
  },
  "Effect": {
    title: "Effect",
    extract: "An effect is the result or outcome of a cause. The cause-effect relationship is fundamental to understanding the world. Effects can themselves become causes in chains of causation. Predicting effects from causes is central to science.",
    links: ["Cause", "Causality", "Result", "Consequence", "Action", "Change", "Event", "Science", "Prediction", "Philosophy"]
  },

  // === MATTER AND SUBSTANCE ===
  "Matter": {
    title: "Matter",
    extract: "Matter is any substance that has mass and takes up space. All everyday objects are composed of atoms. Philosophers have debated whether matter is the fundamental substance of reality or whether mind is more fundamental. Physics continues to reveal matter's strange nature.",
    links: ["Substance", "Atom", "Mass", "Physics", "Energy", "Body", "Reality", "Materialism", "Space", "Mind"]
  },
  "Substance": {
    title: "Substance",
    extract: "Substance is that which underlies properties and changes. Aristotle saw substance as the primary category of being. Spinoza argued there is only one substance: God or Nature. The concept of substance is central to metaphysics.",
    links: ["Matter", "Essence", "Property", "Being", "Metaphysics", "Aristotle", "Spinoza", "Reality", "Change", "Philosophy"]
  },
  "Atom": {
    title: "Atom",
    extract: "An atom is the smallest unit of ordinary matter that forms a chemical element. Ancient atomists proposed indivisible particles as the basis of reality. Modern physics has revealed atoms are composed of subatomic particles. Atoms are the building blocks of matter.",
    links: ["Matter", "Element", "Physics", "Chemistry", "Particle", "Molecule", "Energy", "Electron", "Nucleus", "Science"]
  },
  "Energy": {
    title: "Energy",
    extract: "Energy is the capacity to do work. It comes in many forms including kinetic, potential, thermal, and nuclear. Energy is conserved: it can change form but not be created or destroyed. The concept unifies diverse physical phenomena.",
    links: ["Matter", "Physics", "Force", "Work", "Heat", "Light", "Motion", "Power", "Atom", "Nature"]
  },
  "Force": {
    title: "Force",
    extract: "Force is an influence that causes an object to change velocity, direction, or shape. Newton's laws describe how forces produce motion. The four fundamental forces are gravity, electromagnetism, and the strong and weak nuclear forces.",
    links: ["Energy", "Motion", "Physics", "Gravity", "Power", "Causality", "Action", "Newton", "Nature", "Matter"]
  },

  // === LIFE AND DEATH ===
  "Life": {
    title: "Life",
    extract: "Life is a quality distinguishing beings with biological processes from inert matter. Living things grow, metabolize, respond to stimuli, and reproduce. The origin of life and its possible existence elsewhere are profound scientific questions. Life raises questions about meaning and purpose.",
    links: ["Death", "Biology", "Evolution", "Organism", "Growth", "Birth", "Existence", "Nature", "Soul", "Meaning"]
  },
  "Death": {
    title: "Death",
    extract: "Death is the irreversible cessation of all biological functions. It is universal and inevitable. Philosophers and theologians have contemplated death's meaning throughout history. Some view death as the end; others believe in afterlife. Death gives urgency to life.",
    links: ["Life", "Immortality", "Soul", "Afterlife", "Fear", "Existence", "Meaning", "Time", "Being", "Philosophy"]
  },
  "Birth": {
    title: "Birth",
    extract: "Birth is the beginning of life as a separate entity from the mother. It marks the transition from potential to actual existence. Birth raises philosophical questions about when personhood begins and the nature of coming into being.",
    links: ["Life", "Death", "Beginning", "Creation", "Existence", "Mother", "Child", "Origin", "Growth", "Nature"]
  },
  "Immortality": {
    title: "Immortality",
    extract: "Immortality is eternal life or existence beyond death. Many religions promise immortality of the soul. Philosophers debate whether immortality is possible or even desirable. The quest for immortality has driven much human endeavor.",
    links: ["Death", "Soul", "Eternity", "Life", "God", "Religion", "Afterlife", "Time", "Existence", "Philosophy"]
  },
  "Soul": {
    title: "Soul",
    extract: "The soul is often conceived as the immaterial essence of a person, the seat of consciousness and personality. Many religions hold the soul survives death. Philosophers debate whether souls exist or whether mind is purely physical.",
    links: ["Mind", "Spirit", "Body", "Death", "Immortality", "Consciousness", "Self", "Religion", "Dualism", "Philosophy"]
  },
  "Spirit": {
    title: "Spirit",
    extract: "Spirit refers to non-physical beings or the vital principle in living things. It is associated with consciousness, personality, and religious experience. The concept of spirit appears across cultures and throughout history.",
    links: ["Soul", "Mind", "God", "Ghost", "Religion", "Consciousness", "Life", "Being", "Sacred", "Philosophy"]
  },

  // === HUMAN NATURE ===
  "Human": {
    title: "Human",
    extract: "Humans are the most common and widespread species of primate. They are characterized by bipedalism, large brains, language, and complex societies. Philosophy asks what makes humans unique and what constitutes human nature.",
    links: ["Person", "Nature", "Society", "Language", "Reason", "Animal", "Culture", "Mind", "Evolution", "Philosophy"]
  },
  "Person": {
    title: "Person",
    extract: "A person is a being with certain moral and legal status, typically characterized by consciousness, rationality, and moral agency. Philosophers debate what qualifies as personhood. The concept is crucial for ethics and law.",
    links: ["Human", "Identity", "Self", "Consciousness", "Rights", "Morality", "Individual", "Subject", "Agency", "Philosophy"]
  },
  "Identity": {
    title: "Identity",
    extract: "Identity is what makes an entity the same over time and distinct from others. Personal identity concerns what makes you the same person throughout your life. Identity raises puzzles about persistence, memory, and the self.",
    links: ["Self", "Person", "Change", "Memory", "Consciousness", "Essence", "Continuity", "Mind", "Time", "Philosophy"]
  },
  "Individual": {
    title: "Individual",
    extract: "An individual is a single, distinct entity. Individuality refers to the qualities that distinguish one person from others. The relationship between individual and society is a central question in philosophy and politics.",
    links: ["Person", "Self", "Society", "Identity", "Freedom", "Uniqueness", "Particular", "Universal", "Rights", "Philosophy"]
  },
  "Nature": {
    title: "Nature",
    extract: "Nature encompasses the physical world and its phenomena. It includes all living things and natural laws. Human nature refers to the fundamental characteristics of humanity. The relationship between nature and culture is debated.",
    links: ["Universe", "Life", "Science", "Environment", "Physics", "Biology", "Culture", "Human", "Reality", "Philosophy"]
  },
  "Culture": {
    title: "Culture",
    extract: "Culture encompasses social behavior, institutions, and norms in human societies, as well as knowledge, beliefs, arts, laws, customs, and habits. Culture is transmitted through learning and shapes human identity and experience.",
    links: ["Society", "Art", "Language", "Tradition", "Custom", "Human", "Nature", "History", "Civilization", "Knowledge"]
  },

  // === SOCIETY AND POLITICS ===
  "Society": {
    title: "Society",
    extract: "Society is a group of individuals involved in persistent social interaction. Societies are characterized by patterns of relationships, shared institutions, and common culture. The nature of society and its relationship to individuals is central to philosophy.",
    links: ["Culture", "Individual", "Politics", "Community", "Civilization", "Institution", "Law", "Justice", "Human", "Philosophy"]
  },
  "Politics": {
    title: "Politics",
    extract: "Politics is the set of activities associated with making decisions in groups and the distribution of power and resources. Political philosophy examines the nature of the state, justice, rights, law, and the good society.",
    links: ["Power", "Government", "Law", "Justice", "Rights", "Freedom", "Democracy", "State", "Society", "Philosophy"]
  },
  "Power": {
    title: "Power",
    extract: "Power is the ability to influence or control the behavior of people and events. Political power involves authority over communities. Philosophers analyze the sources of power, its justification, and its relation to freedom.",
    links: ["Politics", "Authority", "Force", "Control", "Freedom", "Government", "Society", "Will", "Influence", "Philosophy"]
  },
  "Government": {
    title: "Government",
    extract: "Government is the system by which a state or community is governed. Different forms include democracy, monarchy, and dictatorship. Political philosophy examines the legitimacy of government and its proper limits.",
    links: ["Politics", "State", "Law", "Power", "Authority", "Democracy", "Society", "Justice", "Freedom", "Philosophy"]
  },
  "Law": {
    title: "Law",
    extract: "Law is a system of rules created and enforced by social or governmental institutions. Legal philosophy examines the nature of law, its relationship to morality, and the basis of legal authority. Law structures human society.",
    links: ["Justice", "Rights", "Government", "Morality", "Authority", "Rule", "Society", "Crime", "Punishment", "Philosophy"]
  },
  "Justice": {
    title: "Justice",
    extract: "Justice is the moral principle of fairness and the upholding of what is right. Theories of justice address the distribution of goods, punishment of wrongs, and the structure of just institutions. Justice is central to ethics and politics.",
    links: ["Fairness", "Rights", "Law", "Ethics", "Equality", "Punishment", "Society", "Virtue", "Good", "Philosophy"]
  },
  "Rights": {
    title: "Rights",
    extract: "Rights are moral or legal entitlements to have or do something. Human rights are considered universal. Philosophers debate the source and extent of rights, whether natural or conventional, and how to resolve conflicts between rights.",
    links: ["Justice", "Freedom", "Law", "Morality", "Duty", "Liberty", "Human", "Society", "Ethics", "Philosophy"]
  },
  "Freedom": {
    title: "Freedom",
    extract: "Freedom is the power or right to act, speak, or think as one wants. Political freedom concerns liberty from oppression. Metaphysical freedom concerns free will versus determinism. Freedom is a central value in modern societies.",
    links: ["Liberty", "Will", "Rights", "Determinism", "Choice", "Autonomy", "Politics", "Society", "Ethics", "Philosophy"]
  },
  "Liberty": {
    title: "Liberty",
    extract: "Liberty is the state of being free within society from oppressive restrictions. Positive liberty is the freedom to act; negative liberty is freedom from interference. The concept is central to political philosophy.",
    links: ["Freedom", "Rights", "Politics", "Society", "Law", "Individual", "Democracy", "Autonomy", "State", "Philosophy"]
  },
  "Democracy": {
    title: "Democracy",
    extract: "Democracy is a system of government in which power is vested in the people. It involves voting, representation, and majority rule balanced with minority rights. Democracy has been praised as the best form of government and criticized for its flaws.",
    links: ["Government", "Politics", "Freedom", "Equality", "Voting", "Rights", "Society", "Power", "People", "Philosophy"]
  },
  "Equality": {
    title: "Equality",
    extract: "Equality is the state of being equal in status, rights, and opportunities. Equality before the law and political equality are widely valued. Philosophers debate what equality requires and how to balance it with other values.",
    links: ["Justice", "Rights", "Freedom", "Democracy", "Fairness", "Society", "Politics", "Discrimination", "Human", "Philosophy"]
  },

  // === ETHICS AND VALUES ===
  "Morality": {
    title: "Morality",
    extract: "Morality concerns the distinction between right and wrong, good and bad. Moral philosophy examines the foundations of morality, whether objective or subjective, and how we should live. Morality guides human action and judgment.",
    links: ["Ethics", "Good", "Evil", "Virtue", "Duty", "Rights", "Justice", "Value", "Action", "Philosophy"]
  },
  "Good": {
    title: "Good",
    extract: "Good is what is morally right, beneficial, or desirable. The nature of the good has been debated since ancient philosophy. Is goodness objective or subjective? Is there a highest good? These questions are central to ethics.",
    links: ["Evil", "Ethics", "Virtue", "Value", "Morality", "Happiness", "Right", "Benefit", "Beauty", "Philosophy"]
  },
  "Evil": {
    title: "Evil",
    extract: "Evil is profound immorality or that which causes harm and suffering. The problem of evil asks why evil exists if God is good and omnipotent. Philosophers examine the nature and origin of evil in human action and the world.",
    links: ["Good", "Morality", "Suffering", "Sin", "Harm", "God", "Ethics", "Vice", "Wrong", "Philosophy"]
  },
  "Virtue": {
    title: "Virtue",
    extract: "Virtue is a positive moral quality or character trait. Virtue ethics focuses on developing good character rather than following rules. Classical virtues include courage, temperance, justice, and wisdom. Virtues enable human flourishing.",
    links: ["Ethics", "Character", "Good", "Morality", "Courage", "Wisdom", "Justice", "Excellence", "Happiness", "Philosophy"]
  },
  "Vice": {
    title: "Vice",
    extract: "Vice is a bad or immoral habit or character trait. It is the opposite of virtue. Traditional vices include pride, greed, lust, envy, gluttony, wrath, and sloth. Vices corrupt character and harm human flourishing.",
    links: ["Virtue", "Sin", "Evil", "Morality", "Character", "Ethics", "Habit", "Weakness", "Corruption", "Philosophy"]
  },
  "Duty": {
    title: "Duty",
    extract: "Duty is a moral or legal obligation. Deontological ethics focuses on duty as the foundation of morality. Kant argued we must act from duty according to universal moral laws. Duty often conflicts with desire.",
    links: ["Morality", "Obligation", "Rights", "Responsibility", "Ethics", "Law", "Kant", "Action", "Principle", "Philosophy"]
  },
  "Value": {
    title: "Value",
    extract: "Values are principles or standards of behavior; judgments of what is important in life. Value theory examines what is valuable and why. Values can be moral, aesthetic, practical, or personal. Values guide human choice and action.",
    links: ["Good", "Ethics", "Morality", "Worth", "Meaning", "Principle", "Belief", "Culture", "Judgment", "Philosophy"]
  },
  "Meaning": {
    title: "Meaning",
    extract: "Meaning refers to the significance or purpose of something, especially of life itself. The question of life's meaning is central to existential philosophy. Meaning can be found in relationships, achievements, experiences, or transcendence.",
    links: ["Purpose", "Life", "Existence", "Value", "Significance", "Language", "Existentialism", "Death", "Happiness", "Philosophy"]
  },
  "Purpose": {
    title: "Purpose",
    extract: "Purpose is the reason for which something exists or is done. The question of human purpose asks why we are here and what we should do. Purpose can come from religion, relationships, work, or self-creation.",
    links: ["Meaning", "Goal", "Intention", "Function", "Teleology", "Life", "Existence", "Action", "Value", "Philosophy"]
  },

  // === EMOTIONS AND STATES ===
  "Happiness": {
    title: "Happiness",
    extract: "Happiness is a state of well-being and contentment. Philosophers have long debated what happiness consists in: pleasure, virtue, meaning, or flourishing. The pursuit of happiness is considered a fundamental human motivation.",
    links: ["Pleasure", "Joy", "Well-being", "Contentment", "Ethics", "Life", "Desire", "Virtue", "Meaning", "Philosophy"]
  },
  "Pleasure": {
    title: "Pleasure",
    extract: "Pleasure is a feeling of happy satisfaction and enjoyment. Hedonism holds that pleasure is the highest good. But is all pleasure equally valuable? Philosophers distinguish higher and lower pleasures, and pleasure from happiness.",
    links: ["Happiness", "Pain", "Joy", "Hedonism", "Desire", "Experience", "Good", "Sensation", "Body", "Philosophy"]
  },
  "Pain": {
    title: "Pain",
    extract: "Pain is physical suffering or mental distress. It serves as a warning of harm but can become chronic and purposeless. Philosophers examine whether pain is intrinsically bad and its relationship to suffering.",
    links: ["Pleasure", "Suffering", "Body", "Mind", "Harm", "Sensation", "Experience", "Evil", "Medicine", "Philosophy"]
  },
  "Suffering": {
    title: "Suffering",
    extract: "Suffering is the experience of pain, distress, or hardship. Buddhism sees suffering as central to existence. The problem of suffering asks why it exists and how to respond. Suffering raises profound questions about life's meaning.",
    links: ["Pain", "Evil", "Existence", "Buddhism", "Compassion", "Death", "Life", "Meaning", "God", "Philosophy"]
  },
  "Love": {
    title: "Love",
    extract: "Love is a complex set of emotions, behaviors, and beliefs associated with strong feelings of affection. Philosophers distinguish types of love: romantic, familial, friendship, and universal. Love is central to human experience and ethics.",
    links: ["Emotion", "Desire", "Friendship", "Relationship", "Compassion", "Care", "Beauty", "Person", "Happiness", "Philosophy"]
  },
  "Fear": {
    title: "Fear",
    extract: "Fear is an emotion induced by perceived danger or threat. It causes physiological changes and behavioral responses. Fear can be rational or irrational, protective or paralyzing. Philosophers examine fear of death and the unknown.",
    links: ["Emotion", "Danger", "Anxiety", "Courage", "Death", "Threat", "Mind", "Psychology", "Action", "Philosophy"]
  },
  "Hope": {
    title: "Hope",
    extract: "Hope is an optimistic attitude based on expectation of positive outcomes. It involves desire and belief in possibility. Hope sustains people through hardship. Philosophers examine hope's relationship to reason and action.",
    links: ["Future", "Desire", "Expectation", "Faith", "Optimism", "Fear", "Emotion", "Life", "Belief", "Philosophy"]
  },
  "Desire": {
    title: "Desire",
    extract: "Desire is a sense of longing for a person, object, or outcome. Desires motivate action and shape identity. Philosophers debate whether desires can be rational and how to balance desire with reason and morality.",
    links: ["Want", "Need", "Motivation", "Will", "Pleasure", "Action", "Emotion", "Mind", "Satisfaction", "Philosophy"]
  },
  "Anger": {
    title: "Anger",
    extract: "Anger is a strong feeling of displeasure and hostility. It can be a response to perceived injustice or threat. Philosophers debate whether anger is ever appropriate and how to manage it. Anger can motivate or destroy.",
    links: ["Emotion", "Hatred", "Justice", "Violence", "Passion", "Control", "Mind", "Action", "Virtue", "Philosophy"]
  },

  // === RELIGION AND THEOLOGY ===
  "God": {
    title: "God",
    extract: "God is conceived as the supreme being, creator, and principal object of faith in monotheistic religions. Philosophers have offered arguments for and against God's existence. The nature and attributes of God are debated.",
    links: ["Religion", "Faith", "Creator", "Existence", "Theology", "Belief", "Soul", "Eternity", "Good", "Philosophy"]
  },
  "Religion": {
    title: "Religion",
    extract: "Religion is a cultural system of designated behaviors, practices, worldviews, texts, and sacred places. Religions address ultimate questions about existence, purpose, and morality. The philosophy of religion examines religious beliefs and practices.",
    links: ["God", "Faith", "Sacred", "Ritual", "Belief", "Spirituality", "Morality", "Meaning", "Culture", "Philosophy"]
  },
  "Faith": {
    title: "Faith",
    extract: "Faith is confidence or trust in a person, thing, or concept, often without proof. Religious faith involves belief in God or spiritual truths. Philosophers debate the relationship between faith and reason.",
    links: ["Belief", "Trust", "Religion", "God", "Reason", "Knowledge", "Hope", "Doubt", "Truth", "Philosophy"]
  },
  "Sacred": {
    title: "Sacred",
    extract: "The sacred is that which is considered holy, divine, or worthy of spiritual veneration. It contrasts with the profane or ordinary. The experience of the sacred is central to religion. Philosophers examine what makes something sacred.",
    links: ["Holy", "Religion", "Divine", "God", "Ritual", "Transcendence", "Spirit", "Worship", "Meaning", "Philosophy"]
  },
  "Sin": {
    title: "Sin",
    extract: "Sin is an immoral act considered to be a transgression against divine law. The concept is central to many religions. Philosophers examine the nature of sin, guilt, and redemption. Sin relates to evil and moral responsibility.",
    links: ["Evil", "Morality", "Religion", "Guilt", "Redemption", "God", "Law", "Virtue", "Vice", "Philosophy"]
  },

  // === SCIENCE AND METHOD ===
  "Science": {
    title: "Science",
    extract: "Science is a systematic endeavor building knowledge through testable explanations and predictions. The scientific method involves observation, hypothesis, experimentation, and revision. Science has transformed human understanding and capability.",
    links: ["Knowledge", "Truth", "Method", "Experiment", "Theory", "Nature", "Physics", "Biology", "Chemistry", "Philosophy"]
  },
  "Theory": {
    title: "Theory",
    extract: "A theory is a well-substantiated explanation of natural phenomena, supported by evidence and subject to testing. Scientific theories unify and explain observations. The relationship between theory and reality is debated.",
    links: ["Science", "Hypothesis", "Evidence", "Explanation", "Knowledge", "Truth", "Observation", "Prediction", "Model", "Philosophy"]
  },
  "Experiment": {
    title: "Experiment",
    extract: "An experiment is a procedure to test a hypothesis by observation under controlled conditions. Experiments are central to the scientific method. They allow us to discover causal relationships and test theories.",
    links: ["Science", "Method", "Hypothesis", "Observation", "Test", "Evidence", "Control", "Result", "Knowledge", "Philosophy"]
  },
  "Observation": {
    title: "Observation",
    extract: "Observation is the active acquisition of information from a primary source. In science, it involves careful and systematic watching and recording. Philosophers debate whether observation is theory-laden.",
    links: ["Perception", "Science", "Experience", "Evidence", "Experiment", "Fact", "Knowledge", "Empiricism", "Sense", "Philosophy"]
  },
  "Hypothesis": {
    title: "Hypothesis",
    extract: "A hypothesis is a proposed explanation for a phenomenon, to be tested through experimentation. It is the starting point of scientific inquiry. A good hypothesis is testable and falsifiable.",
    links: ["Theory", "Science", "Experiment", "Prediction", "Test", "Explanation", "Evidence", "Method", "Question", "Philosophy"]
  },
  "Evidence": {
    title: "Evidence",
    extract: "Evidence is information indicating whether a belief or proposition is true or valid. Scientific evidence comes from observation and experiment. Legal evidence supports claims in court. Evidence is central to knowledge.",
    links: ["Truth", "Knowledge", "Proof", "Observation", "Fact", "Science", "Belief", "Reason", "Argument", "Philosophy"]
  },

  // === MATHEMATICS AND LOGIC ===
  "Mathematics": {
    title: "Mathematics",
    extract: "Mathematics is the study of quantity, structure, space, and change. It uses rigorous deduction from axioms and definitions. Mathematics is essential to science and technology. Its relationship to reality is debated.",
    links: ["Number", "Logic", "Geometry", "Algebra", "Proof", "Truth", "Science", "Abstract", "Infinite", "Philosophy"]
  },
  "Number": {
    title: "Number",
    extract: "Numbers are mathematical objects used to count, measure, and label. They include natural numbers, integers, rationals, reals, and complex numbers. The nature of numbers—whether discovered or invented—is philosophically debated.",
    links: ["Mathematics", "Quantity", "Zero", "Infinity", "Counting", "Measurement", "Abstract", "Logic", "Truth", "Philosophy"]
  },
  "Zero": {
    title: "Zero",
    extract: "Zero is the number representing nothing or absence of quantity. Its invention was a major advance in mathematics. Zero is also a placeholder in positional notation. Philosophically, zero relates to nothing and emptiness.",
    links: ["Number", "Nothing", "Mathematics", "Quantity", "Void", "Empty", "One", "Infinity", "Abstract", "Philosophy"]
  },
  "Proof": {
    title: "Proof",
    extract: "A proof is a convincing demonstration that a mathematical statement is necessarily true. Proofs use logical deduction from axioms and previously proven theorems. The nature of mathematical proof is studied in logic and philosophy.",
    links: ["Logic", "Mathematics", "Truth", "Demonstration", "Argument", "Validity", "Theorem", "Axiom", "Reason", "Philosophy"]
  },
  "Paradox": {
    title: "Paradox",
    extract: "A paradox is a seemingly absurd or self-contradictory statement that may nonetheless be true. Famous paradoxes include Zeno's paradoxes and the liar paradox. Paradoxes challenge our understanding and reveal hidden assumptions.",
    links: ["Logic", "Contradiction", "Truth", "Reason", "Puzzle", "Zeno", "Language", "Infinity", "Philosophy", "Problem"]
  },

  // === LANGUAGE AND MEANING ===
  "Language": {
    title: "Language",
    extract: "Language is a structured system of communication using grammar and vocabulary. It is the primary means by which humans convey meaning. The philosophy of language examines meaning, reference, truth, and the relationship between language and thought.",
    links: ["Communication", "Meaning", "Word", "Grammar", "Truth", "Thought", "Mind", "Symbol", "Speech", "Philosophy"]
  },
  "Word": {
    title: "Word",
    extract: "A word is a unit of language carrying meaning. Words are combined into sentences according to grammatical rules. The relationship between words and what they represent is central to philosophy of language.",
    links: ["Language", "Meaning", "Name", "Definition", "Symbol", "Concept", "Reference", "Speech", "Writing", "Philosophy"]
  },
  "Meaning": {
    title: "Meaning",
    extract: "Meaning is what is conveyed, signified, or intended. Linguistic meaning concerns what words and sentences express. Existential meaning concerns the significance of life. Both are central to philosophy.",
    links: ["Language", "Significance", "Sense", "Reference", "Interpretation", "Understanding", "Purpose", "Symbol", "Truth", "Philosophy"]
  },
  "Symbol": {
    title: "Symbol",
    extract: "A symbol is something that represents or stands for something else. Symbols are central to language, mathematics, and culture. The study of symbols and signs is called semiotics.",
    links: ["Sign", "Meaning", "Language", "Representation", "Culture", "Art", "Word", "Concept", "Reference", "Philosophy"]
  },
  "Concept": {
    title: "Concept",
    extract: "A concept is an abstract idea or mental representation. Concepts are the building blocks of thought. They allow us to categorize and reason about the world. The nature of concepts is debated in philosophy of mind.",
    links: ["Idea", "Thought", "Mind", "Abstract", "Category", "Understanding", "Definition", "Language", "Knowledge", "Philosophy"]
  },
  "Idea": {
    title: "Idea",
    extract: "An idea is a mental representation or thought. Ideas range from simple impressions to complex theories. Philosophers have debated whether ideas are innate or derived from experience, and how ideas relate to reality.",
    links: ["Concept", "Thought", "Mind", "Imagination", "Knowledge", "Plato", "Experience", "Representation", "Abstract", "Philosophy"]
  },

  // === ART AND BEAUTY ===
  "Art": {
    title: "Art",
    extract: "Art is a diverse range of human activities and products involving creative imagination. Art expresses ideas, emotions, or worldviews through various media. The definition and value of art are debated in aesthetics.",
    links: ["Beauty", "Aesthetics", "Creativity", "Expression", "Culture", "Artist", "Work", "Form", "Meaning", "Philosophy"]
  },
  "Beauty": {
    title: "Beauty",
    extract: "Beauty is a quality that gives pleasure to the senses or mind. Aesthetic beauty is studied in philosophy. Is beauty objective or subjective? Universal or cultural? These questions animate aesthetics.",
    links: ["Aesthetics", "Art", "Sublime", "Taste", "Pleasure", "Harmony", "Form", "Nature", "Perception", "Philosophy"]
  },
  "Creativity": {
    title: "Creativity",
    extract: "Creativity is the use of imagination to produce something new and valuable. It is central to art, science, and problem-solving. Philosophers examine the nature of creativity and its relationship to knowledge.",
    links: ["Imagination", "Art", "Innovation", "Originality", "Mind", "Expression", "Thought", "Genius", "Work", "Philosophy"]
  },
  "Imagination": {
    title: "Imagination",
    extract: "Imagination is the faculty of forming mental images or concepts not present to the senses. It enables creativity, planning, and understanding others. Imagination is essential to art, science, and everyday thought.",
    links: ["Mind", "Creativity", "Fantasy", "Image", "Thought", "Memory", "Dream", "Art", "Possibility", "Philosophy"]
  },

  // === ADDITIONAL CONCEPTS ===
  "Chaos": {
    title: "Chaos",
    extract: "Chaos is a state of complete disorder and unpredictability. In mythology, chaos preceded creation. In science, chaos theory studies systems sensitive to initial conditions. Chaos contrasts with order and cosmos.",
    links: ["Order", "Disorder", "Complexity", "Chance", "Creation", "System", "Physics", "Nature", "Pattern", "Philosophy"]
  },
  "Order": {
    title: "Order",
    extract: "Order is the arrangement of things following a particular sequence or pattern. Order can be natural or imposed. The relationship between order and chaos, and the source of order in the universe, are philosophical questions.",
    links: ["Chaos", "Pattern", "Structure", "Organization", "Law", "Cosmos", "Nature", "System", "Harmony", "Philosophy"]
  },
  "Cosmos": {
    title: "Cosmos",
    extract: "The cosmos is the universe seen as an ordered, harmonious whole. Ancient Greeks contrasted cosmos with chaos. Cosmology studies the origin and structure of the cosmos. The cosmos inspires wonder and inquiry.",
    links: ["Universe", "Order", "Chaos", "Nature", "Stars", "Space", "Time", "Creation", "Harmony", "Philosophy"]
  },
  "Universe": {
    title: "Universe",
    extract: "The universe is all of space, time, matter, and energy. It began with the Big Bang about 13.8 billion years ago. The universe's origin, structure, and fate are studied by cosmology. Why does the universe exist?",
    links: ["Cosmos", "Space", "Time", "Matter", "Energy", "Stars", "Galaxy", "Physics", "Existence", "Philosophy"]
  },
  "World": {
    title: "World",
    extract: "The world can mean the Earth, the universe, or a domain of experience. Philosophy examines our relationship to the world, how we know it, and what kind of thing it is. Being-in-the-world is central to existential philosophy.",
    links: ["Earth", "Universe", "Reality", "Experience", "Nature", "Society", "Life", "Existence", "Knowledge", "Philosophy"]
  },
  "Earth": {
    title: "Earth",
    extract: "Earth is the third planet from the Sun and the only known astronomical object to harbor life. It is home to millions of species including humans. Earth's environment and our responsibility to it are philosophical concerns.",
    links: ["World", "Nature", "Life", "Planet", "Environment", "Human", "Home", "Universe", "Existence", "Philosophy"]
  },
  "Environment": {
    title: "Environment",
    extract: "The environment encompasses all living and non-living things occurring naturally on Earth. Environmental ethics examines human responsibility toward nature. The relationship between humans and environment is crucial for our future.",
    links: ["Nature", "Earth", "Ecology", "Life", "Ethics", "Human", "Sustainability", "World", "Climate", "Philosophy"]
  },
  "Animal": {
    title: "Animal",
    extract: "Animals are multicellular eukaryotic organisms that form the kingdom Animalia. They include humans and other creatures with nervous systems. Animal ethics examines our moral obligations to non-human animals.",
    links: ["Life", "Human", "Nature", "Species", "Evolution", "Mind", "Consciousness", "Ethics", "Biology", "Philosophy"]
  },
  "Evolution": {
    title: "Evolution",
    extract: "Evolution is the change in heritable characteristics of biological populations over generations. Darwin's theory of natural selection explains how evolution occurs. Evolution connects all life and raises questions about human nature.",
    links: ["Biology", "Life", "Species", "Darwin", "Nature", "Change", "Adaptation", "Origin", "Science", "Philosophy"]
  },
  "Biology": {
    title: "Biology",
    extract: "Biology is the scientific study of life. It examines the structure, function, growth, origin, evolution, and distribution of living things. Biology raises questions about the nature of life and our place in it.",
    links: ["Life", "Evolution", "Science", "Organism", "Cell", "Nature", "Species", "Genetics", "Ecology", "Philosophy"]
  },
  "Chemistry": {
    title: "Chemistry",
    extract: "Chemistry is the scientific study of the composition, structure, properties, and change of matter. It is central to understanding the material world. Chemistry connects physics to biology and everyday life.",
    links: ["Matter", "Atom", "Element", "Molecule", "Reaction", "Science", "Physics", "Biology", "Substance", "Nature"]
  },
  "Physics": {
    title: "Physics",
    extract: "Physics is the natural science that studies matter, energy, and their interactions. It seeks fundamental laws of the universe. Physics has transformed our understanding of reality from atoms to galaxies.",
    links: ["Matter", "Energy", "Force", "Space", "Time", "Science", "Universe", "Nature", "Reality", "Philosophy"]
  },
  "Psychology": {
    title: "Psychology",
    extract: "Psychology is the scientific study of mind and behavior. It examines conscious and unconscious phenomena, thoughts, feelings, and motives. Psychology bridges biology and social science, nature and culture.",
    links: ["Mind", "Behavior", "Consciousness", "Emotion", "Thought", "Brain", "Science", "Human", "Perception", "Philosophy"]
  },
  "Brain": {
    title: "Brain",
    extract: "The brain is the organ of the central nervous system that controls most bodily activities and processes information. The relationship between brain and mind is a central question in philosophy of mind.",
    links: ["Mind", "Consciousness", "Thought", "Neuroscience", "Body", "Perception", "Memory", "Psychology", "Science", "Philosophy"]
  },
  "Body": {
    title: "Body",
    extract: "The body is the physical structure of a person or animal. The relationship between body and mind is debated. Embodiment is central to our experience of the world. The body raises questions about identity and mortality.",
    links: ["Mind", "Soul", "Physical", "Health", "Sensation", "Perception", "Death", "Life", "Experience", "Philosophy"]
  },
  "Health": {
    title: "Health",
    extract: "Health is a state of physical, mental, and social well-being. It is more than the absence of disease. Health ethics examines issues like healthcare access, patient autonomy, and end-of-life decisions.",
    links: ["Body", "Mind", "Well-being", "Disease", "Medicine", "Life", "Death", "Ethics", "Care", "Philosophy"]
  },
  "Medicine": {
    title: "Medicine",
    extract: "Medicine is the science and practice of diagnosing, treating, and preventing disease. Medical ethics examines the moral aspects of healthcare. Medicine intersects with philosophy on life, death, and personhood.",
    links: ["Health", "Disease", "Body", "Science", "Ethics", "Life", "Death", "Care", "Treatment", "Philosophy"]
  },
  "Technology": {
    title: "Technology",
    extract: "Technology is the application of scientific knowledge for practical purposes. It transforms human capabilities and societies. Philosophy of technology examines technology's impact on human life and values.",
    links: ["Science", "Tool", "Innovation", "Progress", "Society", "Human", "Machine", "Computer", "Change", "Philosophy"]
  },
  "Machine": {
    title: "Machine",
    extract: "A machine is a device that performs work using power. Machines range from simple tools to complex computers. The relationship between humans and machines, and whether machines can think, are philosophical questions.",
    links: ["Technology", "Tool", "Computer", "Work", "Artificial", "Intelligence", "Robot", "Power", "Human", "Philosophy"]
  },
  "Computer": {
    title: "Computer",
    extract: "A computer is a machine that can be programmed to carry out sequences of operations. Computers have transformed society. Philosophy of computer science examines computation, information, and artificial intelligence.",
    links: ["Machine", "Technology", "Information", "Program", "Intelligence", "Artificial", "Digital", "Data", "Logic", "Philosophy"]
  },
  "Intelligence": {
    title: "Intelligence",
    extract: "Intelligence is the ability to acquire and apply knowledge and skills. It involves reasoning, problem-solving, and learning. The nature of intelligence and whether machines can possess it are debated.",
    links: ["Mind", "Reason", "Knowledge", "Learning", "Artificial", "Brain", "Thought", "Problem", "Cognition", "Philosophy"]
  },
  "Artificial": {
    title: "Artificial Intelligence",
    extract: "Artificial intelligence is intelligence demonstrated by machines. AI systems can perform tasks requiring human intelligence. The development of AI raises profound questions about mind, consciousness, and human uniqueness.",
    links: ["Intelligence", "Machine", "Computer", "Mind", "Technology", "Robot", "Learning", "Consciousness", "Human", "Philosophy"]
  },
  "Information": {
    title: "Information",
    extract: "Information is data that has been processed into a meaningful form. Information theory studies the quantification of information. The information age has transformed society. The nature of information is philosophically examined.",
    links: ["Data", "Knowledge", "Communication", "Computer", "Technology", "Meaning", "Signal", "Message", "Truth", "Philosophy"]
  },
  "Communication": {
    title: "Communication",
    extract: "Communication is the transmission of information between parties. It can be verbal or nonverbal, written or spoken. Communication is essential to society, knowledge, and relationships. Language is its primary medium.",
    links: ["Language", "Information", "Message", "Meaning", "Society", "Understanding", "Speech", "Writing", "Media", "Philosophy"]
  },
  "Truth": {
    title: "Certainty",
    extract: "Certainty is the state of being completely confident that something is true. Descartes sought certain foundations for knowledge. Is certainty achievable? What can we be certain of? These are epistemological questions.",
    links: ["Knowledge", "Truth", "Doubt", "Belief", "Descartes", "Epistemology", "Proof", "Confidence", "Reason", "Philosophy"]
  },
  "Doubt": {
    title: "Doubt",
    extract: "Doubt is a state of uncertainty or questioning. Methodological doubt is used in philosophy to test beliefs. Skeptics embrace doubt as appropriate given our limited knowledge. Doubt can lead to inquiry or paralysis.",
    links: ["Certainty", "Belief", "Skepticism", "Knowledge", "Question", "Reason", "Descartes", "Truth", "Inquiry", "Philosophy"]
  },
  "Skepticism": {
    title: "Skepticism",
    extract: "Skepticism is the questioning of knowledge claims. Philosophical skeptics doubt that knowledge is possible. Skeptical arguments challenge our confidence in perception, memory, and reason. Skepticism motivates epistemology.",
    links: ["Doubt", "Knowledge", "Epistemology", "Belief", "Truth", "Reason", "Perception", "Certainty", "Philosophy", "Question"]
  },
  "Rationalism": {
    title: "Rationalism",
    extract: "Rationalism is the view that reason is the chief source of knowledge. Rationalists like Descartes and Leibniz argued for innate ideas and a priori knowledge. Rationalism contrasts with empiricism.",
    links: ["Reason", "Knowledge", "Epistemology", "Descartes", "Innate", "A priori", "Empiricism", "Mind", "Truth", "Philosophy"]
  },
  "Empiricism": {
    title: "Empiricism",
    extract: "Empiricism is the view that knowledge comes primarily from sensory experience. Empiricists like Locke and Hume rejected innate ideas. Empiricism emphasizes observation and experiment. It contrasts with rationalism.",
    links: ["Experience", "Sense", "Knowledge", "Epistemology", "Locke", "Hume", "Observation", "Rationalism", "Science", "Philosophy"]
  },
  "Experience": {
    title: "Experience",
    extract: "Experience is the direct observation of or participation in events. Empiricists see experience as the foundation of knowledge. Experience includes sensations, perceptions, and lived events. Experience shapes who we are.",
    links: ["Perception", "Knowledge", "Sense", "Consciousness", "Life", "Memory", "Learning", "Empiricism", "Reality", "Philosophy"]
  },
  "Sense": {
    title: "Sense",
    extract: "The senses are faculties by which we perceive the world: sight, hearing, touch, taste, and smell. Empiricists argue all knowledge derives from the senses. The reliability of the senses is debated.",
    links: ["Perception", "Experience", "Body", "Knowledge", "Empiricism", "Vision", "Hearing", "Touch", "Reality", "Philosophy"]
  },
  "Determinism": {
    title: "Determinism",
    extract: "Determinism is the doctrine that all events are determined by prior causes. If determinism is true, is free will an illusion? The debate between determinism and free will has profound implications for morality and law.",
    links: ["Freedom", "Will", "Causality", "Fate", "Necessity", "Choice", "Physics", "Morality", "Responsibility", "Philosophy"]
  },
  "Fate": {
    title: "Fate",
    extract: "Fate is the idea that events are predetermined and inevitable. Many cultures have concepts of fate or destiny. Philosophers debate whether fate is compatible with freedom and moral responsibility.",
    links: ["Determinism", "Destiny", "Freedom", "Will", "Necessity", "Future", "God", "Choice", "Life", "Philosophy"]
  },
  "Chance": {
    title: "Chance",
    extract: "Chance is the occurrence of events without apparent cause. Probability theory studies chance mathematically. Philosophers debate whether true chance exists or only reflects our ignorance. Chance affects life profoundly.",
    links: ["Probability", "Randomness", "Causality", "Luck", "Determinism", "Event", "Risk", "Uncertainty", "Mathematics", "Philosophy"]
  },
  "Possibility": {
    title: "Possibility",
    extract: "Possibility refers to what can be the case. Modal logic studies necessity and possibility. Philosophers examine different kinds of possibility: logical, physical, and metaphysical. Possibility shapes our understanding of reality.",
    links: ["Necessity", "Actuality", "Potential", "Modal", "Logic", "Future", "Reality", "Thought", "Freedom", "Philosophy"]
  },
  "Necessity": {
    title: "Necessity",
    extract: "Necessity refers to what must be the case, what cannot be otherwise. Necessary truths include logical and mathematical truths. The distinction between necessary and contingent is central to metaphysics.",
    links: ["Possibility", "Contingent", "Logic", "Truth", "Metaphysics", "Essential", "Modal", "Determinism", "Law", "Philosophy"]
  },
  "Essence": {
    title: "Essence",
    extract: "Essence is what makes something what it is, its fundamental nature. Aristotle distinguished essence from accident. Existentialists argue existence precedes essence for humans. Essence is central to metaphysics.",
    links: ["Existence", "Nature", "Identity", "Substance", "Definition", "Aristotle", "Essential", "Accident", "Being", "Philosophy"]
  },
  "Property": {
    title: "Property",
    extract: "A property is a characteristic or attribute of an object. Properties can be essential or accidental, intrinsic or relational. The nature of properties and their relationship to objects is debated in metaphysics.",
    links: ["Attribute", "Quality", "Substance", "Object", "Essence", "Accident", "Metaphysics", "Universal", "Particular", "Philosophy"]
  },
  "Universal": {
    title: "Universal",
    extract: "A universal is a quality that can be shared by multiple particular things, like redness or roundness. The problem of universals asks whether universals exist independently of particulars. This is a central metaphysical debate.",
    links: ["Particular", "Property", "Abstract", "Plato", "Nominalism", "Realism", "Concept", "Metaphysics", "Essence", "Philosophy"]
  },
  "Particular": {
    title: "Particular",
    extract: "A particular is an individual, concrete object or instance, as opposed to a universal. Each particular exists in a specific place and time. The relationship between particulars and universals is a key metaphysical question.",
    links: ["Universal", "Individual", "Object", "Concrete", "Instance", "Substance", "Existence", "Metaphysics", "Thing", "Philosophy"]
  },
  "Abstract": {
    title: "Abstract",
    extract: "Abstract entities exist independently of physical instantiation, like numbers, sets, and propositions. Abstract objects raise questions about existence, knowledge, and reference. Do abstract objects exist? How can we know them?",
    links: ["Concrete", "Number", "Mathematics", "Concept", "Universal", "Existence", "Knowledge", "Platonic", "Metaphysics", "Philosophy"]
  },
  "Concrete": {
    title: "Concrete",
    extract: "Concrete entities exist in space and time, like physical objects and events. Concrete particulars are the furniture of the everyday world. The distinction between concrete and abstract is fundamental to metaphysics.",
    links: ["Abstract", "Physical", "Object", "Particular", "Space", "Time", "Material", "Existence", "Reality", "Philosophy"]
  },
  "Object": {
    title: "Object",
    extract: "An object is anything that can be perceived, thought about, or acted upon. Objects can be physical or abstract. The nature of objects, their identity and persistence, is studied in metaphysics.",
    links: ["Thing", "Entity", "Substance", "Property", "Existence", "Perception", "Particular", "Subject", "World", "Philosophy"]
  },
  "Subject": {
    title: "Subject",
    extract: "A subject is a being with consciousness, a self that experiences and acts. The subject-object distinction is fundamental to philosophy. Subjectivity concerns first-person experience. The nature of the subject is debated.",
    links: ["Self", "Consciousness", "Object", "Experience", "Mind", "Person", "Perception", "Knowledge", "I", "Philosophy"]
  },
  "Relation": {
    title: "Relation",
    extract: "A relation is a connection between entities. Relations can be spatial, temporal, causal, or logical. Some philosophers argue relations are fundamental to reality. Understanding relations is key to understanding the world.",
    links: ["Connection", "Property", "Object", "Causality", "Logic", "Structure", "Metaphysics", "Order", "Pattern", "Philosophy"]
  },
  "Structure": {
    title: "Structure",
    extract: "Structure is the arrangement of and relations between parts of a whole. Structure is found in physical objects, languages, societies, and mathematics. Structuralism emphasizes structure over content.",
    links: ["Form", "Order", "Pattern", "Organization", "System", "Relation", "Whole", "Part", "Mathematics", "Philosophy"]
  },
  "Form": {
    title: "Form",
    extract: "Form is the structure or essence of something, as opposed to its matter. Plato's Forms are eternal, perfect archetypes. Aristotle saw form as the organizing principle of matter. Form is central to metaphysics and aesthetics.",
    links: ["Matter", "Structure", "Essence", "Plato", "Aristotle", "Shape", "Ideal", "Pattern", "Beauty", "Philosophy"]
  },
  "Pattern": {
    title: "Pattern",
    extract: "A pattern is a regular arrangement or sequence. Patterns are found throughout nature, mathematics, and human culture. Recognizing patterns is fundamental to knowledge and prediction. Patterns reveal underlying order.",
    links: ["Structure", "Order", "Regularity", "Design", "Nature", "Mathematics", "Repetition", "Symmetry", "Form", "Philosophy"]
  },
  "Symmetry": {
    title: "Symmetry",
    extract: "Symmetry is correspondence in form on opposite sides of a dividing line or around a center. Symmetry is fundamental to physics, mathematics, and aesthetics. Symmetry principles constrain and unify natural laws.",
    links: ["Pattern", "Balance", "Beauty", "Mathematics", "Physics", "Form", "Harmony", "Order", "Nature", "Philosophy"]
  },
  "Harmony": {
    title: "Harmony",
    extract: "Harmony is the combination of elements into a pleasing whole. Musical harmony involves simultaneous pitches. Cosmic harmony is the idea that the universe is orderly and beautiful. Harmony is valued across cultures.",
    links: ["Beauty", "Order", "Music", "Balance", "Unity", "Cosmos", "Aesthetics", "Symmetry", "Peace", "Philosophy"]
  },
  "Unity": {
    title: "Unity",
    extract: "Unity is the state of being one, undivided, or whole. Unity can be numerical, structural, or conceptual. The One was a fundamental concept for ancient philosophers. Unity contrasts with plurality and division.",
    links: ["One", "Whole", "Harmony", "Identity", "Integration", "Plurality", "Being", "Metaphysics", "Monism", "Philosophy"]
  },
  "Plurality": {
    title: "Plurality",
    extract: "Plurality is the state of being many, multiple, or diverse. Pluralism accepts multiple perspectives or realities. The relationship between unity and plurality is a fundamental metaphysical question.",
    links: ["Many", "Diversity", "Unity", "Multiplicity", "Pluralism", "Difference", "One", "Metaphysics", "Society", "Philosophy"]
  },
  "Whole": {
    title: "Whole",
    extract: "A whole is a complete entity composed of parts. The relationship between wholes and parts is studied in mereology. Some argue wholes are more than the sum of their parts. Understanding wholes is essential to understanding complex systems.",
    links: ["Part", "Unity", "System", "Totality", "Complete", "Structure", "Holism", "Integration", "Entity", "Philosophy"]
  },
  "Part": {
    title: "Part",
    extract: "A part is a portion or component of a whole. Parts can be physical or conceptual. The relationship between parts and wholes raises philosophical questions about composition and identity.",
    links: ["Whole", "Component", "Division", "Element", "Composition", "Structure", "Mereology", "System", "Analysis", "Philosophy"]
  },
  "System": {
    title: "System",
    extract: "A system is a set of interacting components forming a complex whole. Systems can be physical, biological, social, or conceptual. Systems thinking examines how parts interact to produce emergent properties.",
    links: ["Structure", "Whole", "Part", "Organization", "Complexity", "Interaction", "Order", "Function", "Network", "Philosophy"]
  },
  "Complexity": {
    title: "Complexity",
    extract: "Complexity refers to systems with many interacting parts that exhibit emergent behavior. Complex systems include ecosystems, economies, and minds. Complexity science studies how order emerges from interaction.",
    links: ["System", "Emergence", "Order", "Chaos", "Simple", "Interaction", "Pattern", "Science", "Network", "Philosophy"]
  },
  "Emergence": {
    title: "Emergence",
    extract: "Emergence is the arising of novel properties from the interaction of simpler components. Emergent properties cannot be predicted from parts alone. Consciousness may be emergent from brain activity. Emergence challenges reductionism.",
    links: ["Complexity", "System", "Property", "Whole", "Consciousness", "Mind", "Reductionism", "Level", "Novel", "Philosophy"]
  },
  "Simple": {
    title: "Simple",
    extract: "Something simple has few parts or is easy to understand. Simplicity is often valued in explanations and theories. Whether the fundamental level of reality is simple is debated. Occam's Razor favors simpler explanations.",
    links: ["Complex", "Fundamental", "Elementary", "Basic", "Explanation", "Theory", "Parsimony", "Analysis", "Reduction", "Philosophy"]
  },
  "Fundamental": {
    title: "Fundamental",
    extract: "What is fundamental serves as a foundation for everything else. Physics seeks fundamental laws and particles. Philosophy asks what is metaphysically fundamental. The fundamental explains the derivative.",
    links: ["Basic", "Foundation", "Principle", "Essential", "Ground", "Physics", "Metaphysics", "Primary", "Simple", "Philosophy"]
  },
  "Foundation": {
    title: "Foundation",
    extract: "A foundation is the basis on which something rests. Foundationalism in epistemology seeks basic beliefs that support all others. The search for foundations drives much of philosophy and science.",
    links: ["Fundamental", "Basis", "Ground", "Support", "Knowledge", "Belief", "Epistemology", "Certainty", "First", "Philosophy"]
  },
  "Principle": {
    title: "Principle",
    extract: "A principle is a fundamental truth or proposition serving as the foundation for reasoning. Principles guide action and explain phenomena. First principles are basic assumptions that cannot be deduced from others.",
    links: ["Fundamental", "Truth", "Law", "Foundation", "Rule", "Axiom", "Reason", "Basic", "Explanation", "Philosophy"]
  },
  "Axiom": {
    title: "Axiom",
    extract: "An axiom is a statement accepted as true without proof, serving as a starting point for reasoning. Mathematics and logic are built on axioms. The choice of axioms shapes entire systems of thought.",
    links: ["Principle", "Assumption", "Foundation", "Mathematics", "Logic", "Proof", "Self-evident", "Postulate", "System", "Philosophy"]
  },
  "Assumption": {
    title: "Assumption",
    extract: "An assumption is something taken for granted as true. All reasoning rests on assumptions. Philosophy examines hidden assumptions and questions what we take for granted. Making assumptions explicit is crucial.",
    links: ["Axiom", "Presupposition", "Belief", "Foundation", "Premise", "Reason", "Question", "Doubt", "Starting", "Philosophy"]
  }

  // === SCRAPED BATCH 2026-02-03 ===
  "Ontology": {
    title: "Ontology",
    extract: " Ontology is the philosophical study of being. It is traditionally understood as the subdiscipline of metaphysics focused on the most general features of reality. As one of the most fundamental concepts, being encompasses all of reality and every entity within it. To articulate the basic structure of being, ontology examines the commonalities among all things and investigates their classification into basic types, such as the categories of particulars and universals. Particulars are unique, non-repeatable entities, such as the person Socrates, whereas universals are general, repeatable entities, like the color green. Another distinction exists between concrete objects existing in space and time, such as a tree, and abstract objects existing outside space and time, like the number 7. Systems of categories aim to provide a comprehensive inventory of reality by employing categories such as substance, property, relation, state of affairs, and event.",
    links: ["A Treatise Concerning the Principles of Human Knowledge", "Abductive reasoning", "Abhidharma", "Absolute idealism", "Abstract and concrete", "Abstract object theory", "Academic Skepticism", "Achintya Bheda Abheda", "Action theory (philosophy)", "Advaita Vedanta"]
  },
  "Argument": {
    title: "Argument",
    extract: " An argument is one or more premises—sentences, statements, or propositions—directed towards arriving at a logical conclusion. The purpose of an argument is to give reasons for one's thinking and understanding via justification, explanation, or persuasion. As a series of logical steps, arguments are intended to determine or show the degree of truth or acceptability of a logical conclusion.",
    links: ["Abductive reasoning", "Abstract logic", "Accident (fallacy)", "Ackermann set theory", "Ad hominem", "Ad nauseam", "Affirmative conclusion from a negative premise", "Affirming a disjunct", "Affirming the consequent", "Aleph number"]
  },
  "Proposition": {
    title: "Proposition",
    extract: "Propositions are the meanings of declarative sentences, objects of beliefs, and bearers of truth values. They explain how different sentences, like the English \"Snow is white\" and the German \"Schnee ist weiß\", can have identical meaning by expressing the same proposition. Similarly, they ground the fact that different people can share a belief by being directed at the same content. True propositions describe the world as it is, while false ones fail to do so. Researchers distinguish types of propositions by their informational content and mode of assertion, such as the contrasts between affirmative and negative propositions, between universal and existential propositions, and between categorical and conditional propositions.",
    links: ["A. J. Ayer", "A priori and a posteriori", "Abductive reasoning", "Abstract objects", "Al-Farabi", "Alciphron (book)", "Alethic modality", "Alternative semantics", "Ambiguity", "An Essay Towards a Real Character, and a Philosophical Language"]
  },
  "Inference": {
    title: "Inference",
    extract: "Inferences are steps in logical reasoning, moving from premises to logical consequences; etymologically, the word infer means to \"carry forward\". Inference is theoretically traditionally divided into deduction and induction, a distinction that dates at least to Aristotle. Deduction is inference deriving logical conclusions from premises known or assumed to be true, with the laws of valid inference being studied in logic. Induction is inference from particular evidence to a universal conclusion. A third type of inference is sometimes distinguished, notably by Charles Sanders Peirce, contradistinguishing abduction from induction.",
    links: ["A priori and a posteriori", "Abductive reasoning", "Abhidharma", "Absolute idealism", "Academic Skepticism", "Achintya Bheda Abheda", "Action theory (philosophy)", "Advaita Vedanta", "Aesthetic emotions", "Aesthetics"]
  },
  "Fallacy": {
    title: "Fallacy",
    extract: "A fallacy is the use of invalid or otherwise faulty reasoning in the construction of an argument that may appear to be well-reasoned if unnoticed. The term was introduced in the Western intellectual tradition by the Aristotelian De Sophisticis Elenchis.",
    links: ["5G misinformation", "A Dialogue Concerning Oratorical Partitions", "A General Rhetoric", "Academic research", "Accident (fallacy)", "Active Measures Working Group", "Ad hominem", "Ad nauseam", "Adam Smith", "Advertisement"]
  },
  "Taste": {
    title: "Taste",
    extract: "The gustatory system or sense of taste is the sensory system that is partially responsible for the perception of taste. Taste is the perception stimulated when a substance in the mouth reacts chemically with taste receptor cells located on taste buds in the oral cavity, mostly on the tongue. Taste, along with the sense of smell and trigeminal nerve stimulation, determines flavors of food and other substances. Humans have taste receptors on taste buds and other areas, including the upper surface of the tongue and the epiglottis. The gustatory cortex is responsible for the perception of taste.",
    links: ["5-Nitro-2-propoxyaniline", "Acid", "Acids", "Acmella oleracea", "Acquired taste", "Action potential", "Active sensory system", "Addison's disease", "Adenylate cyclase", "Aftertaste"]
  },
  "Awareness": {
    title: "Awareness",
    extract: "  In philosophy and psychology, awareness is the perception or knowledge of something. The concept is often synonymous with consciousness; however, one can be aware of something without being explicitly conscious of it.",
    links: ["A Universe of Consciousness", "Accounting", "Aesthetic interpretation", "Affective forecasting", "Agnosia", "Alfred North Whitehead", "Alpha wave", "Altered state of consciousness", "Amodal perception", "Anil Seth"]
  },
  "Qualia": {
    title: "Qualia",
    extract: "In philosophy of mind, qualia are defined as instances of subjective, conscious experience. The term qualia derives from the Latin neuter plural form (qualia) of the Latin adjective quālis meaning \"of what sort\" or \"of what kind\" in relation to a specific instance, such as \"what it is like to taste a specific apple — this particular apple now\".",
    links: ["A. J. Ayer", "A Universe of Consciousness", "Abstract and concrete", "Agnosia", "Alan Turing", "Alex Byrne (philosopher)", "Alexander Bain (philosopher)", "Alfred North Whitehead", "Altered state of consciousness", "Alva Noë"]
  },
  "Sleep": {
    title: "Sleep",
    extract: "Sleep is a state of reduced mental and physical activity in which consciousness is altered and certain sensory activity is inhibited. During sleep, there is a marked decrease in muscle activity and interactions with the surrounding environment. While sleep differs from wakefulness in terms of the ability to react to stimuli, it still involves active brain patterns, making it more reactive than a coma or disorders of consciousness.",
    links: ["A. Roger Ekirch", "ABCC9", "ADRB1", "Actigraphy", "Activities of daily living", "Adenosine", "Adenosine triphosphate", "Adolescent sleep", "Advanced sleep phase disorder", "Advances in Nutrition"]
  },
  "Cognition": {
    title: "Cognition",
    extract: "Cognitions are mental processes that deal with knowledge. They encompass psychological activities that acquire, store, retrieve, transform, or apply information. Cognitions are a pervasive part of mental life, helping individuals understand and interact with the world.",
    links: ["4E cognition", "Abductive reasoning", "Ability", "Abstract concepts", "Abstraction", "Action (philosophy)", "Adjectives", "Adulthood", "Aesthetic interpretation", "Affect (psychology)"]
  },
  "Hearing": {
    title: "Hearing",
    extract: "Hearing, or auditory perception, is the ability to perceive sounds through an organ, such as an ear, by detecting vibrations as periodic changes in the pressure of a surrounding medium. The academic field concerned with hearing is auditory science.",
    links: ["Acoustic impedance", "Acoustic quieting", "Action potential", "Active sensory system", "Aditus to mastoid antrum", "Ageusia", "Agnosia", "Alice in Wonderland syndrome", "Allochiria", "Alzheimer's disease"]
  },
  "Illusion": {
    title: "Illusion",
    extract: "An illusion is a distortion of the senses, which can reveal how the mind normally organizes and interprets sensory stimulation. Although illusions distort the human perception of reality, they are generally shared by most people.",
    links: ["Accidental viewpoint", "Active sensory system", "Aesthetic illusion", "Aesthetic interpretation", "Affective forecasting", "Afterimage", "Ageusia", "Agnosia", "Alice in Wonderland syndrome", "Allochiria"]
  },
  "Learning": {
    title: "Learning",
    extract: "Learning is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes, and preferences. The ability to learn is possessed by humans, non-human animals, and some machines; there is also evidence for some kind of learning in certain plants. Some learning is immediate, induced by a single event, but much skill and knowledge accumulate from repeated experiences. The changes induced by learning often last a lifetime, and it is hard to distinguish learned material that seems to be \"lost\" from that which cannot be retrieved.",
    links: ["21st century skills", "AIXI", "Abductive reasoning", "Ability", "Abstraction", "Acculturation", "Active learning", "Adaptation", "Aesthetic interpretation", "Affective"]
  },
  "Forgetting": {
    title: "Forgetting",
    extract: "Forgetting or disremembering is the apparent loss or modification of information already encoded and stored in an individual's short or long-term memory. It is a spontaneous or gradual process in which old memories are unable to be recalled from memory storage. Problems with remembering, learning and retaining new information are a few of the most common complaints of older adults.  Studies show that retention improves with increased rehearsal. This improvement occurs because rehearsal helps to transfer information into long-term memory.",
    links: ["Absent-mindedness", "Active recall", "Alzheimer's", "Amnesia", "Andriy Slyusarchuk", "Anne Treisman", "Anterograde amnesia", "Art of memory", "Arthur P. Shimamura", "Atkinson–Shiffrin memory model"]
  },
  "Feeling": {
    title: "Feeling",
    extract: "According to the APA Dictionary of Psychology, a feeling is \"a self-contained phenomenal experience\"; feelings are \"subjective, evaluative, and independent of the sensations, thoughts, or images evoking them\". The term feeling is closely related to, but not the same as, emotion. Feeling may, for instance, refer to the conscious subjective experience of emotions. The study of subjective experiences is called phenomenology. Psychotherapy generally involves a therapist helping a client understand, articulate, and learn to effectively regulate the client's own feelings, and ultimately to take responsibility for the client's experience of the world. Feelings are sometimes held to be characteristic of embodied consciousness.",
    links: ["51 mental factors", "Abhidharma", "Acceptance", "Acute stress reaction", "Admiration", "Adoration", "Aesthetic emotions", "Affect (psychology)", "Affect as information hypothesis", "Affect consciousness"]
  },
  "Choice": {
    title: "Choice",
    extract: "A choice is the range of different things from which a being can choose. The arrival at a choice may incorporate motivators and models.",
    links: ["Abortion", "Binomial coefficient", "Brainwashing", "Brian Tracy", "Choice Preference Theory in Research", "Choice architecture", "Choice feminism", "Choice modelling", "Choice overload", "Choiceless awareness"]
  },
  "Intention": {
    title: "Intention",
    extract: "An intention is a mental state in which a person commits themselves to a course of action. Having the plan to visit the zoo tomorrow is an example of an intention. The action plan is the content of the intention while the commitment is the attitude towards this content. Other mental states can have action plans as their content, as when one admires a plan, but differ from intentions since they do not involve a practical commitment to realizing this plan. Successful intentions bring about the intended course of action while unsuccessful intentions fail to do so. Intentions, like many other mental states, have intentionality: they represent possible states of affairs.",
    links: ["A Treatise Concerning the Principles of Human Knowledge", "Abilities", "Abstract and concrete", "Abstract object theory", "Action (philosophy)", "Action plan", "Action theory (philosophy)", "Actus reus", "Aesthetic interpretation", "Affective forecasting"]
  },
  "Fact": {
    title: "Fact",
    extract: "A fact is a true datum about one or more aspects of a circumstance. Standard reference works are often used to check facts. Scientific facts are verified by repeatable careful observation or measurement by experiments or other means. Generally speaking, facts are independent of belief, knowledge and opinion.  Facts are different from inferences, theories, values, and objects.",
    links: ["A Treatise of Human Nature", "A priori and a posteriori", "Abraham Lincoln", "Admissible evidence", "Alfred North Whitehead", "Allegation", "Alternative hypothesis", "Ambiguity", "Analytic–synthetic distinction", "Anti-realism"]
  },
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Opinion": {
    title: "Opinion",
    extract: "An opinion is a judgement, viewpoint, or statement that is not conclusive, as opposed to facts, which are true statements.",
    links: ["Ambiguity", "Antithesis", "Argument", "Belief", "Bias", "Bibcode (identifier)", "Business", "Chinatown, San Francisco", "Committee", "Conformity"]
  },
  "Certainty": {
    title: "Certainty",
    extract: "Certainty is the epistemic property of beliefs which a person has no rational grounds for doubting. One standard way of defining epistemic certainty is that a belief is certain if and only if the person holding that belief could not be mistaken in holding that belief. Other common definitions of certainty involve the indubitable nature of such beliefs or define certainty as a property of those beliefs with the greatest possible justification. Certainty is closely related to knowledge, although contemporary philosophers tend to treat knowledge as having lower requirements than certainty.",
    links: ["A priori", "A priori and a posteriori", "Aayane", "Aayane Thabita", "Abdal", "Abhidharma", "About.com", "Absolute idealism", "Academic Skepticism", "Achintya Bheda Abheda"]
  },
  "Rationality": {
    title: "Rationality",
    extract: "Rationality is the quality of being guided by or based on reason. In this regard, a person acts rationally if they have a good reason for what they do, or a belief is rational if it is based on strong evidence. This quality can apply to an ability, as in a rational animal, to a psychological process, like reasoning, to mental states, such as beliefs and intentions, or to persons who possess these other forms of rationality. A thing that lacks rationality is either arational, if it is outside the domain of rational evaluation, or irrational, if it belongs to this domain but does not fulfill its standards.",
    links: ["A priori and a posteriori", "Abhidharma", "Abilities", "Absolute idealism", "Academic Skepticism", "Achintya Bheda Abheda", "Action (philosophy)", "Action theory (philosophy)", "Advaita Vedanta", "Aesthetic"]
  },
  "Insight": {
    title: "Insight",
    extract: "Insight is the understanding of a specific cause and effect within a particular context. The term insight can have several related meanings:a piece of information the act or result of understanding the inner nature of things or of seeing intuitively  an introspection the power of acute observation and deduction, discernment, and perception, called intellection or noesis an understanding of cause and effect based on the identification of relationships and behaviors within a model, system, context, or scenario ",
    links: ["Aaron Beck", "Accountability", "Achourya", "Adhiṭṭhāna", "Aesthetic taste", "Agape", "Ahimsa", "Akrodha", "Alertness", "Altruism"]
  },
  "Explanation": {
    title: "Explanation",
    extract: "An explanation is a set of statements usually constructed to describe a set of facts that clarifies the causes, context, and consequences of those facts. It may establish rules or laws, and clarifies the existing rules or laws in relation to any objects or phenomena examined.",
    links: ["Abductive reasoning", "Ambiguity", "Antithesis", "Argument", "Aristotle", "Axiom", "Belief", "Bias", "Causality", "Constructivism (philosophy of mathematics)"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Entity": {
    title: "Entity",
    extract: "An entity is something that exists as itself. It does not need to be of material existence. In particular, abstractions and legal fictions are usually regarded as entities. In general, there is also no presumption that an entity is animate, or present. The verb tense of this form is to 'entitize' - meaning to convert into an entity; to perceive as tangible or alive.",
    links: ["A. J. Ayer", "A Treatise Concerning the Principles of Human Knowledge", "Abstract and concrete", "Abstract object theory", "Abstraction", "Accounting network", "Action theory (philosophy)", "Al-Ghazali", "Al-Kindi", "Al-Nijat"]
  },
  "Vacuum": {
    title: "Vacuum",
    extract: "A vacuum is space devoid of matter. The word is derived from the Latin adjective vacuus meaning \"vacant\" or \"void\". An approximation to such vacuum is a region with a gaseous pressure much less than atmospheric pressure. Physicists often discuss ideal test results that would occur in a perfect vacuum, which they sometimes simply call \"vacuum\" or free space, and use the term partial vacuum to refer to an actual imperfect vacuum as one might have in a laboratory or in space. In engineering and applied physics on the other hand, vacuum refers to any space in which the pressure is considerably lower than atmospheric pressure. The Latin term in vacuo is used to describe an object that is surrounded by a vacuum.",
    links: ["Absolute pressure", "Abū Rayhān al-Bīrūnī", "Acclimatization", "Adhesive", "Aether (classical element)", "Aether (mythology)", "Ahmad Dallal", "Air embolism", "Al-Farabi", "Al-Jazari"]
  },
  "Emptiness": {
    title: "Emptiness",
    extract: "Emptiness as a human condition is a sense of generalized boredom, social alienation, nihilism, and apathy. Feelings of emptiness often accompany dysthymia, depression, loneliness, anhedonia, despair, or other mental/emotional disorders, including schizoid personality disorder, post-traumatic stress disorder, attention deficit hyperactivity disorder, schizotypal personality disorder and borderline personality disorder. A sense of emptiness is also part of a natural process of grief, as resulting death of a loved one, or other significant changes. The particular meanings of \"emptiness\" vary with the particular context and the religious or cultural tradition in which it is used.",
    links: ["Acceptance", "Acute stress reaction", "Admiration", "Adoration", "Aesthetic emotions", "Aesthetics", "Affect (psychology)", "Affect as information hypothesis", "Affect consciousness", "Affect in education"]
  },
  "Dimension": {
    title: "Dimension",
    extract: "In physics and mathematics, the dimension of a mathematical space is informally defined as the minimum number of coordinates needed to specify any point within it. Thus, a line has a dimension of one (1D) because only one coordinate is needed to specify a point on it – for example, the point at 5 on a number line. A surface, such as the boundary of a cylinder or sphere, has a dimension of two (2D) because two coordinates are needed to specify a point on it – for example, both a latitude and longitude are required to locate a point on the surface of a sphere. A two-dimensional Euclidean space is a two-dimensional space on the plane. The inside of a cube, a cylinder or a sphere is three-dimensional (3D) because three coordinates are needed to locate a point within these spaces.",
    links: ["3-manifold", "4-manifold", "4-polytope", "5-cell", "Absolute space and time", "Abstract index notation", "Affine connection", "Affine geometry", "Affine space", "Ahmes"]
  },
  "Distance": {
    title: "Distance",
    extract: "Distance is a numerical or occasionally qualitative measurement of how far apart objects, points, people, or ideas are. In physics or everyday usage, distance may refer to a physical length or an estimation based on other criteria. The term is also frequently used metaphorically to mean a measurement of the amount of difference between two similar objects or a degree of separation. Most such notions of distance, both physical and metaphorical, are formalized in mathematics using the notion of a metric space.",
    links: ["Absement", "Absolute difference", "Acceleration", "Affine subspace", "Altitude", "Ant", "Arc length", "As the crow flies", "Astronomical system of units", "Bacon number"]
  },
  "Geometry": {
    title: "Geometry",
    extract: "Geometry is a branch of mathematics concerned with properties of space such as the distance, shape, size, and relative position of figures. Geometry is, along with arithmetic, one of the oldest branches of mathematics. A mathematician who works in the field of geometry is called a geometer. Until the 19th century, geometry was almost exclusively devoted to Euclidean geometry, which includes the notions of point, line, plane, distance, angle, surface, and curve, as fundamental concepts.",
    links: ["4-polytope", "5-cell", "Absolute geometry", "Abstract algebra", "Acceleration", "Acylindrically hyperbolic group", "Aerodynamics", "Affine geometry", "Affine space", "Ahmes"]
  },
  "History": {
    title: "History",
    extract: "History is the systematic study of the past, focusing primarily on the human past. As an academic discipline, it analyses and interprets evidence to construct narratives about what happened and explain why it happened. Some theorists categorize history as a social science, while others see it as part of the humanities or consider it a hybrid discipline. Similar debates surround the purpose of history—for example, whether its main aim is theoretical, to uncover the truth, or practical, to learn lessons from the past. In a more general sense, the term history refers not to an academic field but to the past itself, times in the past, or to individual texts about the past.",
    links: ["\"Polish death camp\" controversy", "12-hour clock", "1948 Palestine war", "2,500-year celebration of the Persian Empire", "24-hour analogue dial", "24-hour clock", "A. J. P. Taylor", "ASPRO chronology", "A Conflict of Visions", "A Vindication of Natural Society"]
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Process": {
    title: "Process",
    extract: "A process is a series or set of activities that interact to produce a result; it may occur once-only or be recurrent or periodic.",
    links: ["3%", "Action (philosophy)", "Adiabatic process", "Biological process", "Branching process", "Business process", "Business process modeling", "Chemical process", "Child process", "Cognitive process"]
  },
  "Motion": {
    title: "Motion",
    extract: "In physics, motion is when an object changes its position with respect to a reference point in a given time. Motion is mathematically described in terms of displacement, distance, velocity, acceleration, speed, and frame of reference to an observer, measuring the change in position of the body relative to that frame with a change in time. The branch of physics describing the motion of objects without reference to their cause is called kinematics, while the branch studying forces and their effect on motion is called dynamics.",
    links: ["2019 revision of the SI", "A Treatise Concerning the Principles of Human Knowledge", "Absement", "Absolute location", "Absolute space and time", "Absolute zero", "Abstract and concrete", "Abstract object theory", "Acceleration", "Action theory (philosophy)"]
  },
  "Result": {
    title: "Result",
    extract: "A result is the outcome or consequence of a sequence of actions or events. Possible results include gain, injury, value, and victory. Some types of results include the outcome of an action, the final value of a calculation, and the outcome of a vote.",
    links: ["Accounting", "Action (philosophy)", "Calculation", "Chemistry", "Computer sciences", "Criminal investigation", "Data type", "Democracy", "Determinism", "Economics"]
  },
  "Prediction": {
    title: "Prediction",
    extract: "A prediction or  forecast is a statement about a future event or about future data. Predictions are often, but not always, based upon experience or knowledge of forecasters. There is no universal agreement about the exact difference between \"prediction\" and \"estimation\"; different authors and disciplines ascribe different connotations.",
    links: ["A.E. Stallings", "Abductive reasoning", "Acceleration", "Actuarial science", "Actuarial table", "Actuary", "Advanced NFL Stats", "Albert Einstein", "Ancient Greek", "Approval rating"]
  },
  "Mass": {
    title: "Mass",
    extract: "Mass is an intrinsic property of a body. In modern physics, it is generally defined as the strength of an object's gravitational attraction to other bodies - as measured by an observer moving along at the same speed.",
    links: ["2019 revision of the SI", "2019 revision of the SI base", "A priori and a posteriori", "Absement", "Acceleration", "Action (physics)", "Adhémar Jean Claude Barré de Saint-Venant", "Air resistance", "Albert Einstein", "Alexis Clairaut"]
  },
  "Materialism": {
    title: "Materialism",
    extract: "In philosophy and metaphysics, materialism is a form of monism holding that matter is the fundamental substance of nature, so that all things, including mind and consciousness, arise from material interactions and depend on physical processes, including those of the human brain and nervous system. It contrasts with monistic idealism, which treats consciousness as fundamental, and is related to naturalism, the view that only natural laws and forces operate in the universe, and to physicalism, the view that all that exists is ultimately physical. Physicalism extends materialism by including forms of physicality beyond ordinary matter, and some use the terms interchangeably.",
    links: ["A Treatise Concerning the Principles of Human Knowledge", "Abhidharma", "Absolute idealism", "Abstract and concrete", "Abstract object theory", "Academic Skepticism", "Achintya Bheda Abheda", "Acoustic ecology", "Action theory (philosophy)", "Advaita Vedanta"]
  },
  "Aristotle": {
    title: "Aristotle",
    extract: "Aristotle was an ancient Greek philosopher and polymath. His writings cover a broad range of subjects spanning the natural sciences, philosophy, linguistics, economics, politics, psychology, and the arts. As the founder of the Peripatetic school of philosophy in the Lyceum in Athens, he began the wider Aristotelian tradition that followed, which set the groundwork for the development of modern science.",
    links: ["6123 Aristoteles", "A. J. Ayer", "A Dialogue Concerning Oratorical Partitions", "A General Rhetoric", "A History of British Birds", "A Theory of Justice", "A Treatise Concerning the Principles of Human Knowledge", "A Treatise of Human Nature", "Abbasid Caliphate", "Abbott Handerson Thayer"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Particle": {
    title: "Particle",
    extract: "In the physical sciences, a particle is a small localized object which can be described by several physical or chemical properties, such as volume, density, or mass. They vary greatly in size or quantity, from subatomic particles like the electron, to microscopic particles like atoms and molecules, to macroscopic particles like powders and other granular materials. Particles can also be used to create scientific models of even larger objects depending on their density, such as humans moving in a crowd or celestial bodies in motion.",
    links: ["Abiogenesis", "Abstraction", "Addison-Wesley", "Aerosol", "Aerosol impaction", "Air pollution", "American Meteorological Society", "Animal", "Antihydrogen", "Antineutron"]
  },
  "Molecule": {
    title: "Molecule",
    extract: "A molecule is a group of two or more atoms that are held together by attractive forces known as chemical bonds; depending on context, the term may or may not include ions that satisfy this criterion. In quantum physics, organic chemistry, and biochemistry, the distinction from ions is dropped and molecule is often used when referring to polyatomic ions.",
    links: ["2D geometric model", "ASM International", "Abiogenesis", "Absorbance", "Acetaldehyde", "Acetamide", "Acetic acid", "Acetone", "Acetonitrile", "Acetylene"]
  },
  "Electron": {
    title: "Electron",
    extract: "The electron is a subatomic particle whose electric charge is negative one elementary charge. It is an elementary particle that comprises the ordinary matter that makes up the universe, along with up and down quarks.",
    links: ["(2+1)-dimensional topological gravity", "1", "4D N = 1 global supersymmetry", "4D N = 1 supergravity", "6D (2,0) superconformal field theory", "ABJM superconformal field theory", "ADONE", "AIP Conference Proceedings", "AORN Journal", "A History of the Theories of Aether and Electricity"]
  },
  "Heat": {
    title: "Heat",
    extract: "In thermodynamics, heat is defined as the form of energy crossing the boundary of a thermodynamic system by virtue of a temperature difference across the boundary. A thermodynamic system does not contain heat. Nevertheless, the term is also often used to refer to the thermal energy contained in a system as a component of its internal energy and that is reflected in the temperature of the system.",
    links: ["Adiabatic process", "Advection", "Air pump", "An Inquiry Concerning the Source of the Heat Which Is Excited by Friction", "Annalen der Physik", "Antoine Lavoisier", "BBC", "Bellows", "Benjamin Franklin", "Benjamin Thompson"]
  },
  "Light": {
    title: "Light",
    extract: "Light, visible light, or visible radiation is electromagnetic radiation that can be perceived by the human eye. Visible light spans the visible spectrum and is usually defined as having wavelengths in the range of 400–700 nanometres (nm), corresponding to frequencies of 750–420 terahertz. The visible band sits adjacent to the infrared and the ultraviolet, called collectively optical radiation.",
    links: ["1984 Moroccan radiation accident", "1990 Clinic of Zaragoza radiotherapy accident", "1996 San Juan de Dios radiotherapy accident", "A Treatise on Electricity and Magnetism", "Abdus Salam", "Absorbance", "Académie des Sciences", "Achromatopsia", "Acoustic radiation force", "Acute radiation syndrome"]
  },
  "Gravity": {
    title: "Gravity",
    extract: "In physics, gravity, also known as gravitation or a gravitational interaction, is a fundamental interaction, which may be described as the force that draws material objects towards each other.",
    links: ["(2+1)-dimensional topological gravity", "ADM formalism", "AQUAL", "Abraham H. Taub", "Accelerated expansion", "Acceleration", "Action at a distance", "Action principles", "Air resistance", "Al-Biruni"]
  },
  "Organism": {
    title: "Organism",
    extract: "An organism is any living thing that functions as an individual. Such a definition raises more problems than it solves, not least because the concept of an individual is also difficult. Several criteria, few of which are widely accepted, have been proposed to define what constitutes an organism. Among the most common is that an organism has autonomous reproduction, growth, and metabolism. This would exclude viruses, even though they evolve like organisms.",
    links: ["A Greek–English Lexicon", "Abiogenesis", "Adaptation", "Addison-Wesley", "Alga", "Algae", "Amoeba", "Ancient Greek", "Anglerfish", "Animal"]
  },
  "Afterlife": {
    title: "Afterlife",
    extract: "The afterlife or life after death is a speculation concerning existence after death,in which the essential part of an individual's stream of consciousness or identity continues to exist after the death of their physical body. The surviving essential aspect varies between belief systems; it may be some partial element, or the entire soul or spirit, which carries with it one's personal identity.",
    links: ["18th Dynasty", "19th-century philosophy", "21 Grams", "21 grams experiment", "2 Maccabees", "ABC-CLIO", "Aaru", "Abortion", "Abortion law", "Abraham Isaac Kook"]
  },
  "Mother": {
    title: "Mother",
    extract: "A mother is the female parent of a child. A woman may be considered a mother by virtue of having given birth, by raising a child who may or may not be her biological offspring, or by supplying her ovum for fertilisation in the case of gestational surrogacy.",
    links: ["3D ultrasound", "Abdominal pregnancy", "Abortion", "Achievement ideology", "Acute fatty liver of pregnancy", "Adaptation to extrauterine life", "Adjective", "Adoption", "Adoption in the United States", "Adoptive"]
  },
  "Child": {
    title: "Child",
    extract: "A child is a human being between the stages of birth and puberty, or between the developmental period of infancy and puberty. The term may also refer to an unborn human being. In English-speaking countries, the legal definition of child generally refers to a minor, in this case as a person younger than the local age of majority, regardless of their physical, mental and sexual development as biological adults. Children generally have fewer rights and responsibilities than adults. They are generally classed as unable to make serious decisions.",
    links: ["ADHD", "Abstinence", "Adolescence", "Adoption", "Adult", "Adult development", "Affinity (law)", "Agape", "Age of Enlightenment", "Age of consent"]
  },
  "Civilization": {
    title: "Civilization",
    extract: "  A civilization is any complex society characterized by the development of the state, social stratification, urbanization, and symbolic systems of communication beyond signed or spoken languages.",
    links: ["5.9 kiloyear event", "8.2 kiloyear event", "A Study of History", "Abbasid Caliphate", "Acculturation", "Acropolis of Athens", "Adam Ferguson", "Age of Discovery", "Age of Enlightenment", "Agriculture"]
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Dualism": {
    title: "Dualism",
    extract: "Dualism is a family of views proposing a fundamental division into two separate principles or kinds. It typically emphasizes a sharp distinction between independent or antagonistic sides, but in a broader sense, it also includes theories in which the two sides are correlated or complementary. Dualism contrasts with monism, which rejects any fundamental division, and with forms of pluralism that posit more than two basic principles.",
    links: ["-ism", "Abrahamic religions", "Abstract and concrete", "Action (philosophy)", "Adi Shankara", "Advaita Vedanta", "Afterlife", "Ahura Mazda", "Ajiva", "All-powerful"]
  },
  "Ghost": {
    title: "Ghost",
    extract: "In folklore, a ghost is the soul or spirit of a dead person or non-human animal that is believed by some people to be able to appear to the living. In ghostlore, descriptions of ghosts vary widely, from an invisible presence to translucent or barely visible wispy shapes to realistic, lifelike forms, whether they resemble humans or animals. The deliberate attempt to contact the spirit of a deceased person is known as necromancy, or in spiritism as a séance. Other terms associated with it are apparition, haunt, haint, phantom, poltergeist, shade, specter, spirit, spook, wraith, demon, and ghoul.",
    links: ["1 Samuel", "A Christmas Carol", "A Haunting", "A Nightmare on Elm Street (franchise)", "Abdera, Thrace", "Abolitionism", "Abrahamic religion", "Abu Hamed Mohammad ibn Mohammad Ghazali", "Acacia", "Adam (Bible)"]
  },
  "Uniqueness": {
    title: "Uniqueness",
    extract: "Uniqueness is a state or condition wherein someone or something is unlike anything else in comparison, or is remarkable, or unusual. When used in relation to humans, it is often in relation to a person's personality, or some specific characteristics of it, signalling that it is unlike the personality traits that are prevalent in that individual's culture. When the term uniqueness is used in relation to an object, it is often within the realm of product, with the term being a factor used to publicize or market the product in order to make it stand out from other products within the same category.",
    links: ["Human", "Loner", "Personality", "Personality trait", "Scarcity", "Uniqueness quantification"]
  },
  "Tradition": {
    title: "Tradition",
    extract: "A tradition is a system of beliefs or behaviors passed down within a group of people or society with symbolic meaning or special significance with origins in the past. A component of cultural expressions and folklore, common examples include holidays or impractical but socially meaningful clothes, but the idea has also been applied to social norms and behaviors such as greetings. Traditions can persist and evolve for thousands of year. The word tradition itself derives from the Latin word tradere literally meaning to transmit, to hand over, to give for safekeeping. While it is reportedly assumed that traditions have an ancient history, many traditions have been invented on purpose, whether it be political or cultural, over short periods of time. Various academic disciplines also use the word in a variety of ways.",
    links: ["1 Corinthians 11", "A Conflict of Visions", "A Vindication of Natural Society", "Aarne–Thompson–Uther Index", "Academic discipline", "Action Française", "Activism", "Adam Müller", "Adam Smith", "Adjective"]
  },
  "Community": {
    title: "Community",
    extract: "A community is a social unit with a shared socially-significant characteristic(s), being place, set of norms, culture, religion, values, customs, or identity. Communities may share a sense of place situated in a given geographical area or in virtual space through communication platforms. Durable good relations that extend beyond immediate genealogical ties also define a sense of community, important to people's identity, practice, and roles in social institutions such as family, home, work, government, society, or humanity at large. Although communities are usually small relative to personal social ties, \"community\" may also refer to large-group affiliations such as national communities, international communities, and virtual communities.",
    links: ["Abiotic", "Activism", "Affinity (sociology)", "Affinity group", "Alexis de Tocqueville", "Alphonso Lingis", "Ancestral spirits", "Archaeology", "Ashram", "Asset-based community development"]
  },
  "Institution": {
    title: "Institution",
    extract: "An institution is a humanly devised structure of rules and norms that shape and constrain social behavior. All definitions of institutions generally entail that there is a level of persistence and continuity. Laws, rules, social conventions and norms are all examples of institutions. Institutions vary in their level of formality and informality. Institutions embody a great deal of knowledge of how to do things in society and have been described as the social science equivalent of theories in the natural sciences.",
    links: ["A Conflict of Visions", "A Vindication of Natural Society", "Academia", "Academic institution", "Activism", "Actor analysis", "Adam Smith", "Advocacy", "Advocacy group", "Agency (philosophy)"]
  },
  "Authority": {
    title: "Authority",
    extract: "Authority is commonly understood as the legitimate power of a person or group over other people. In a civil state, authority may be practiced by legislative, executive, and judicial branches of government, each of which has authority and is an authority. The term \"authority\" has multiple nuances and distinctions within various academic fields ranging from sociology to political science.",
    links: ["A Theory of Justice", "Abraham Lincoln", "Act of Congress", "Adam Smith", "Agrarianism", "Al-Farabi", "Al-Ghazali", "Alain Badiou", "Alain de Benoist", "Alberto Fujimori"]
  },
  "Crime": {
    title: "Crime",
    extract: "  In ordinary language, a crime is an unlawful act punishable by a state or other authority. The term crime does not, in modern criminal law, have any simple and universally accepted definition, though statutory definitions have been provided for certain purposes. The most popular view is that crime is a category created by law; in other words, something is a crime if declared as such by the relevant and applicable law. One proposed definition is that a crime or offence is an act harmful not only to some individual but also to a community, society, or the state. Such acts are forbidden and punishable by law.",
    links: []
  },
  "Autonomy": {
    title: "Autonomy",
    extract: "In developmental psychology and moral, political, bioethical philosophy, autonomy is the capacity to make an informed, uncoerced decision. Autonomous organizations or institutions are independent or self-governing. Autonomy can also be defined from a human resources perspective, where it denotes a level of discretion granted to an employee in their work. In such cases, autonomy is known to generally increase job satisfaction. Self-actualized individuals are thought to operate autonomously of external expectations. In a medical context, respect for a patient's personal autonomy is considered one of many fundamental ethical principles in medicine.",
    links: []
  },
  "Voting": {
    title: "Voting",
    extract: "Voting is the process of making collective decisions by means of submitting and then adding up individual choices. The choice voted upon is often a candidate for office, but the object of a vote can be anything, for example what kind of food to buy or whether a defendant is innocent or guilty. Voting can be formal, using ballots and specific rules, or informal using raised hands, shouts, or movement to indicate preference.",
    links: []
  },
  "People": {
    title: "People",
    extract: "The term \"the people\" refers to the public or common mass of people of a polity. As such it is a concept of human rights law, international law as well as constitutional law, particularly used for claims of popular sovereignty. In contrast, a people is any plurality of persons considered as a whole. Used in politics and law, the term \"a people\" refers to the collective or community of an ethnic group or nation.",
    links: []
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Punishment": {
    title: "Punishment",
    extract: "Punishment, commonly, is the imposition of an undesirable or unpleasant outcome upon an individual or group, meted out by an authority. The term punishment is used both within and outside of the criminal justice context. For example, punishment outside of criminal law can include child discipline measures or conscious or subconscious impositions of unpleasant measures in a relationship.",
    links: ["American Society of Criminology", "Amputation", "Anarchist criminology", "Anomie", "Anthropological criminology", "Aristotle", "Authority", "Aversives", "Avoidance learning", "B.F. Skinner"]
  },
  "Discrimination": {
    title: "Discrimination",
    extract: "Discrimination is the process of making unjustified distinctions between people based on the groups, classes, or other categories to which they belong or are perceived to belong, usually in a way that it deprives them of their legal or human rights. The group may be such as race, gender, age, class, religion, disability or sexual orientation. Discrimination typically leads to groups being unfairly treated on the basis of perceived statuses of characteristics, for example ethnic, racial, gender or religious categories. It involves depriving members of one group of opportunities or privileges that are available to members of another group.",
    links: ["Ableism", "Abolitionism (animal rights)", "Abuse", "Abuse of power", "Abusive supervision", "Academia", "Academic bias", "Academic disciplines", "Accent (sociolinguistics)", "Adolf Hitler"]
  },
  "Rights": {
    title: "Rights",
    extract: "Rights are legal, social, or ethical principles of freedom or entitlement; that is, rights are the fundamental normative rules about what is allowed of people or owed to people according to some legal system, social convention, or ethical theory. Rights are an important concept in law and ethics, especially theories of justice and deontology.",
    links: ["Rights", "Scissor", "Scissors", "Trouser", "Trousers"]
  },
  "Harm": {
    title: "Harm",
    extract: "Harm is a moral and legal concept with multiple definitions. It generally functions as a synonym for evil or anything that is bad under certain moral systems. Something that causes harm is harmful, and something that does not is harmless.",
    links: ["Aarhus Convention", "Academic journal", "Accord on Fire and Building Safety in Bangladesh", "Accountability", "Aphorism", "Aptitude", "Audit", "Auguste François Chomel", "Benefit corporation", "Bernard Gert"]
  },
  "Wrongdoing": {
    title: "Wrongdoing",
    extract: "A wrong or wrength is an act that is illegal, incorrect, or immoral. Legal wrongs are usually quite clearly defined in the law of a state or jurisdiction. They can be divided into civil wrongs and crimes in common law countries, while civil law countries tend to have some additional categories, such as contraventions.",
    links: ["Adjective", "Noun", "Wrongdoing"]
  },
  "Courage": {
    title: "Courage",
    extract: "Courage is the choice and willingness to confront agony, pain, danger, uncertainty, or intimidation. Valor is courage or bravery, especially in battle.",
    links: ["1 Corinthians 13", "A Treatise of Human Nature", "Acceptance", "Accountability", "Achourya", "Acute stress reaction", "Adhiṭṭhāna", "Admiration", "Adoration", "Aesthetic emotions"]
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Rights": {
    title: "Rights",
    extract: "Rights are legal, social, or ethical principles of freedom or entitlement; that is, rights are the fundamental normative rules about what is allowed of people or owed to people according to some legal system, social convention, or ethical theory. Rights are an important concept in law and ethics, especially theories of justice and deontology.",
    links: ["Rights", "Scissor", "Scissors", "Trouser", "Trousers"]
  },
  "Wrongdoing": {
    title: "Wrongdoing",
    extract: "A wrong or wrength is an act that is illegal, incorrect, or immoral. Legal wrongs are usually quite clearly defined in the law of a state or jurisdiction. They can be divided into civil wrongs and crimes in common law countries, while civil law countries tend to have some additional categories, such as contraventions.",
    links: ["Adjective", "Noun", "Wrongdoing"]
  },
  "Habit": {
    title: "Habit",
    extract: "A habit is a routine of behavior that is repeated regularly and tends to occur subconsciously.",
    links: ["Accountability", "Achourya", "Adhiṭṭhāna", "Aesthetic taste", "Agape", "Ahimsa", "Akrodha", "Alertness", "Altruism", "American Journal of Psychology"]
  },
  "Weakness": {
    title: "Weakness",
    extract: "Weakness is a symptom of many different medical conditions. The causes are many and can be divided into conditions that have true or perceived muscle weakness. True muscle weakness is a primary symptom of a variety of skeletal muscle diseases, including muscular dystrophy and inflammatory myopathy. It occurs in neuromuscular junction disorders, such as myasthenia gravis.",
    links: ["Acid", "Actin", "Action potential", "Acute bronchitis", "Acute muscle soreness", "Adenosine diphosphate", "Adenosine triphosphate", "Adenoviridae", "Adhesion (medicine)", "Alcoholism"]
  },
  "Corruption": {
    title: "Corruption",
    extract: "Corruption is a form of dishonesty or a criminal offense that is undertaken by a person or an organization that is entrusted in a position of authority to acquire illicit benefits or abuse power for one's gain. Corruption may involve activities like bribery, influence peddling, embezzlement, and fraud as well as practices that are legal in many countries, such as lobbying. Political corruption occurs when an office-holder or other governmental employee acts in an official capacity for personal gain.",
    links: ["1992 Indian stock market scam", "1Malaysia Development Berhad scandal", "2011 Azerbaijani protests", "2011 Indian anti-corruption movement", "2012 Indian anti-corruption movement", "2015–2016 protests in Brazil", "2017–2018 Russian protests", "2017–2019 Romanian protests", "Absenteeism", "Abuse of discretion"]
  },
  "Obligation": {
    title: "Obligation",
    extract: " An obligation is a course of action which someone is required to take, be it a legal obligation or a moral obligation. Obligations are constraints; they limit freedom. People who are under obligations may choose to freely act under obligations. Obligation exists when there is a choice to do what is morally good and what is morally unacceptable. There are also obligations in other normative contexts, such as obligations of etiquette, social obligations, religious, and possibly in terms of politics, where obligations are requirements which must be fulfilled. These are generally legal obligations, which can incur a penalty for non-fulfilment, although certain people are obliged to carry out certain actions for other reasons as well, whether as a tradition or for social reasons.",
    links: ["1983 Code of Canon Law", "Ability", "Ambystomatidae", "Breach of contract", "Congressional Budget Office", "Consideration", "Contract", "Convention (norm)", "Damages", "Doi (identifier)"]
  },
  "Immanuel Kant": {
    title: "Immanuel Kant",
    extract: "Immanuel Kant was a German philosopher. Born in Königsberg in the Kingdom of Prussia, he is considered one of the central thinkers of the Enlightenment. His comprehensive and systematic works in epistemology, metaphysics, ethics, and aesthetics have made him one of the most influential and highly discussed figures in modern Western philosophy.",
    links: ["Immanuel Kant", "Surname"]
  },
  "Existentialism": {
    title: "Existentialism",
    extract: "Existentialism is a family of philosophical views and inquiry that explore the human individual's struggle to lead an authentic life despite the apparent absurdity or incomprehensibility of existence. In examining meaning, purpose, and value, existentialist thought often includes concepts such as existential crises, angst, courage, and freedom.",
    links: ["'Pataphysics", "20th-century Western painting", "A. J. Ayer", "ABCANZ Armies", "ANZUK", "ANZUS", "AUKUS", "AUSCANNZUKUS", "A Clockwork Orange (film)", "A Theory of Justice"]
  },
  "Goal": {
    title: "Goal",
    extract: "A goal or objective is an idea of the future or desired result that a person or a group of people envision, plan, and commit to achieve. People endeavour to reach goals within a finite time by setting deadlines.",
    links: ["Abstract object", "Action (philosophy)", "Action theory (philosophy)", "Agency (philosophy)", "Agency (psychology)", "Agency (sociology)", "Alexander Osterwalder", "American Automatic Control Council", "American Psychologist", "Arousal"]
  },
  "Teleology": {
    title: "Teleology",
    extract: "Teleology or finality is a branch of causality giving the reason or an explanation for something as a function of its end, its purpose, or its goal, as opposed to as a function of its efficient cause.",
    links: ["-logy", "A Treatise Concerning the Principles of Human Knowledge", "A priori and a posteriori", "Abstract and concrete", "Abstract object theory", "Accidentalism (philosophy)", "Action theory (philosophy)", "Aeon (magazine)", "After Virtue", "Al-Ghazali"]
  },
  "Joy": {
    title: "Joy",
    extract: "Joy is the state of being that allows one to experience feelings of intense, long-lasting happiness and contentment of life. It is closely related to, and often evoked by, well-being, success, or good fortune. Happiness, pleasure, and gratitude are closely related to joy but are not identical to it.",
    links: ["Acceptance", "Acute stress reaction", "Admiration", "Adoration", "Aesthetic emotions", "Affect (psychology)", "Affect as information hypothesis", "Affect consciousness", "Affect in education", "Affect measures"]
  },
  "Well-being": {
    title: "Well-being",
    extract: "Well-being is what is ultimately good for a person. Also called \"welfare\" and \"quality of life\", it is a measure of how well life is going for someone. It is a central goal of many individual and societal endeavors.",
    links: ["Abhidharma", "Abnormal psychology", "Abraham Maslow", "Absolute idealism", "Academic Skepticism", "Academic degree", "Achintya Bheda Abheda", "Action theory (philosophy)", "Advaita Vedanta", "Aesthetic emotions"]
  },
  "Contentment": {
    title: "Contentment",
    extract: "Contentment is a moderate form of happiness, a state of being or emotion in which one is satisfied with their current life situation, and the state of affairs in one's life as they presently are. If one is content, they are at inner peace with their situation and how the elements in one's life are situated. Contrary to popular belief, it is possible to be content with one's life regardless of the circumstance, regardless of whether things are going as one expected or not.",
    links: ["Absentee funeral prayer (Islam)", "Acceptance", "Accountability", "Achourya", "Acute stress reaction", "Adhan", "Adhiṭṭhāna", "Admiration", "Adoration", "Aesthetic emotions"]
  },
  "Hedonism": {
    title: "Hedonism",
    extract: "Hedonism is a family of philosophical views that prioritize pleasure. Psychological hedonism is the theory that all human behavior is motivated by the desire to maximize pleasure and minimize pain. As a form of egoism, it suggests that people only help others if they expect a personal benefit. Axiological hedonism is the view that pleasure is the sole source of intrinsic value. It asserts that other things, like knowledge and money, only have value insofar as they produce pleasure and reduce pain. This view divides into quantitative hedonism, which only considers the intensity and duration of pleasures, and qualitative hedonism, which identifies quality as another relevant factor. The closely related position of prudential hedonism states that pleasure and pain are the only factors of well-being. Ethical hedonism applies axiological hedonism to morality, arguing that people have a moral duty to pursue pleasure and avoid pain. Utilitarian versions assert that the goal is to increase overall happiness for everyone, whereas egoistic versions state that each person should only pursue their own pleasure. Outside the academic context, hedonism is sometimes used as a pejorative term for an egoistic lifestyle seeking short-term gratification.",
    links: ["Abilene paradox", "Abstinence", "Abu Bakr al-Razi", "Academic bias", "Activism", "Aesthetic emotions", "Aesthetic taste", "Aesthetic value", "African traditional religions", "Afterlife"]
  },
  "Buddhism": {
    title: "Buddhism",
    extract: "Buddhism, also known as Buddha-dharma and Dharmavinaya, is an Indian religion and philosophy based on teachings attributed to the Buddha, a śramaṇa and religious teacher who lived in the 6th or 5th century BCE. It is the world's fourth-largest religion, with about 320 million followers, known as Buddhists, who comprise 4.1% of the global population. It arose in the eastern Gangetic plain as a śramaṇa movement in the 5th century BCE, and gradually spread throughout much of Asia. Buddhism has subsequently played a major role in Asian culture and spirituality, eventually spreading to the West in the 20th century.",
    links: ["14th Dalai Lama", "1959 Tibetan uprising", "2nd millennium", "3rd Karmapa, Rangjung Dorje", "969 Movement", "A. K. Warder", "Abenaki mythology", "Abhidhamma", "Abhidharma", "Abhidharmadīpa"]
  },
  "Compassion": {
    title: "Compassion",
    extract: "Compassion is a social emotion that motivates people to go out of their way to relieve the physical, mental, or emotional pains of others and themselves. Compassion is sensitivity to the emotional aspects of the suffering of others. When based on notions such as fairness, justice, and interdependence, it may be considered partially rational in nature.",
    links: ["14th Dalai Lama", "9/11", "99 Names of Allah", "Acceptance", "Accountability", "Achourya", "Acute stress reaction", "Adhiṭṭhāna", "Admiration", "Adoration"]
  },
  "Friendship": {
    title: "Friendship",
    extract: "Friendship is a relationship of mutual affection between people. It is a stronger form of interpersonal bond than an \"acquaintance\" or an \"association\", such as a classmate, neighbor, coworker, or colleague.",
    links: ["Abuse", "Acquaintance", "Activities of daily living", "Affection", "Affinity (sociology)", "Agape", "Agency (sociology)", "Aggression", "Alan Bray", "All Things Considered"]
  },
  "Anxiety": {
    title: "Anxiety",
    extract: "Anxiety is an emotion characterised by an unpleasant state of inner turmoil and includes feelings of dread over anticipated events. Anxiety is different from fear in that fear is defined as the emotional response to a present threat, whereas anxiety is the anticipation of a future one. It is often accompanied by nervous behaviour such as pacing back and forth, somatic complaints, and rumination.",
    links: ["Acceptance", "Acute stress reaction", "Admiration", "Adoration", "Aesthetic emotions", "Affect (psychology)", "Affect as information hypothesis", "Affect consciousness", "Affect in education", "Affect measures"]
  },
  "Threat": {
    title: "Threat",
    extract: "A threat is a communication of intent to inflict harm or loss on another person. Intimidation is a tactic used between conflicting parties to make the other timid or psychologically insecure for coercion or control. The act of intimidation for coercion is considered a threat.",
    links: ["Anger", "Assault", "Balance of threat", "Brazil", "Coercion", "Communication", "Crime", "Cyberbullying", "Death threat", "Elonis v. United States"]
  },
  "Optimism": {
    title: "Optimism",
    extract: "Optimism is the attitude or mindset of expecting events to lead to particularly positive, favorable, desirable, and hopeful outcomes. A common idiom used to illustrate optimism versus pessimism is a glass filled with water to the halfway point: an optimist is said to see the glass as half full, while a pessimist sees the glass as half empty. In ordinary English, optimism may be synonymous with idealism—often, unrealistic or foolish optimism in particular.",
    links: ["Acceptance", "Accountability", "Achourya", "Acute stress reaction", "Adhiṭṭhāna", "Admiration", "Adoration", "Aesthetic emotions", "Aesthetic taste", "Affect (psychology)"]
  },
  "Want": {
    title: "Want",
    extract: "The idea of want can be examined from many perspectives. In secular societies want might be considered similar to the emotion desire, which can be studied scientifically through the disciplines of psychology or sociology. Alternatively want can be studied in a non-secular, spiritual, moralistic or religious way, particularly by Buddhism but also Christianity, Islam and Judaism.",
    links: ["Anti-consumerism", "Appetition", "Buddhist economics", "Coincidence of wants", "Comfort", "Companionship", "Concupiscence", "Consumption (economics)", "Demand (economics)", "Desire"]
  },
  "Need": {
    title: "Need",
    extract: "  A need is a deficiency at a point of time and in a given context. Needs are distinguished from wants. In the case of a need, a deficiency causes a clear adverse outcome: a dysfunction or death. In other words, a need is something required for a safe, stable and healthy life while a want is a desire, wish or aspiration. When needs or wants are backed by purchasing power, they have the potential to become economic demands.",
    links: ["Abraham Maslow", "Amartya Sen", "Basic needs", "Biology", "Capability approach", "Clayton Alderfer", "Community", "Consumer behaviour", "David Wiggins", "Demand"]
  },
  "Motivation": {
    title: "Motivation",
    extract: "Motivation is an internal state that propels individuals to engage in goal-directed behavior. It is often understood as a force that explains why people or other animals initiate, continue, or terminate a certain behavior at a particular time. It is a complex phenomenon and its precise definition is disputed. It contrasts with amotivation, which is a state of apathy or listlessness. Motivation is studied in fields such as psychology, motivation science, neuroscience, and philosophy.",
    links: ["3C-model", "Ability", "Abnormal psychology", "Abraham Maslow", "Absenteeism", "Abulia", "Academic discipline", "Academic success", "Acedia", "Achievement motivation"]
  },
  "Hatred": {
    title: "Hatred",
    extract: "Hatred or hate is an intense negative emotional response towards certain people, things or ideas, usually related to opposition or revulsion toward something. Hatred is often associated with intense feelings of anger, contempt, and disgust. Hatred is seen as the opposite of love.",
    links: ["Aaron T. Beck", "Acceptance", "Acute stress reaction", "Adam Phillips (psychologist)", "Admiration", "Adoration", "Aesthetic emotions", "Affect (psychology)", "Affect as information hypothesis", "Affect consciousness"]
  },
  "Violence": {
    title: "Violence",
    extract: "Violence is characterized as the use of physical force by humans to cause harm to other living beings, such as pain, injury, disablement, death, damage and destruction. The World Health Organization (WHO) defines violence as \"the intentional use of physical force or power, threatened or actual, against oneself, another person, or against a group or community, which either results in or has a high likelihood of resulting in injury, death, psychological harm, maldevelopment, or deprivation\"; it recognizes the need to include violence not resulting in injury or death.",
    links: ["2011 Bahraini uprising", "African American", "Aggression", "Ahimsa", "Alternative dispute resolution", "American Psychological Association", "Anthropology", "Anthropology of religion", "Anxiety", "Appeasement"]
  },
  "Theology": {
    title: "Theology",
    extract: "Theology is the study of religious belief from a religious perspective, with a focus on the nature of divinity and the history behind religion. It is taught as an academic discipline, typically in universities and seminaries. It occupies itself with the unique content of analyzing the supernatural, but also deals with religious epistemology, asks and seeks to answer the question of revelation. Revelation pertains to the acceptance of God, gods, or deities, as not only transcendent or above the natural world, but also willing and able to interact with the natural world and to reveal themselves to humankind.",
    links: ["1 Peter 4", "A. J. Ayer", "Abenaki mythology", "Abkhaz traditional religion", "Abrahamic religions", "Absolute (philosophy)", "Accusative case", "Acoma Pueblo", "Acosmism", "Acts 7"]
  },
  "Ritual": {
    title: "Ritual",
    extract: "A ritual is a repeated, structured sequence of actions or behaviors that alters the internal or external state of an individual, group, or environment, regardless of conscious understanding, emotional context, or symbolic meaning. Traditionally associated with gestures, words, or revered objects, rituals also occur in non-human species, such as elephant mourning or corvid object-leaving. They may be prescribed by tradition, including religious practices, and are often characterized by formalism, traditionalism, rule-governance, and performance.",
    links: ["A.R. Radcliffe-Brown", "Aarne–Thompson–Uther Index", "Abenaki mythology", "Abkhaz traditional religion", "Abrahamic religions", "Acoma Pueblo", "Adoption", "Adventism", "Adyghe Xabze", "African diaspora religions"]
  },
  "Spirituality": {
    title: "Spirituality",
    extract: "The meaning of spirituality has developed and expanded over time, and various meanings can be found alongside each other. Traditionally, spirituality referred to a religious process of re-formation which \"aims to recover the original shape of man\", oriented at \"the image of God\" as exemplified by the founders and sacred texts of the religions of the world. The term was used within early Christianity to refer to a life oriented toward the Holy Spirit and broadened during the Late Middle Ages to include mental aspects of life.",
    links: ["A Course in Miracles", "Abenaki mythology", "Abkhaz traditional religion", "Abrahamic religions", "Achourya", "Acoma Pueblo", "Advaita Vedanta", "Adventism", "Adyghe Xabze", "African diaspora religions"]
  },
  "Sacredness": {
    title: "Sacredness",
    extract: "  Sacred describes something that is dedicated or set apart for the service or worship of a deity; is considered worthy of spiritual respect or devotion; or inspires awe or reverence among believers. The property is often ascribed to objects, or places.",
    links: ["Sacredness"]
  },
  "Divinity": {
    title: "Divinity",
    extract: "Divinity refers to the quality, presence, or nature of that which is divine—a term that, before the rise of monotheism, evoked a broad and dynamic field of sacred power. In the ancient world, divinity was not limited to a single deity or abstract ideal but was recognized in multiple forms: as a radiant attribute possessed by gods, as a vital force cushioning nature, and even as a quality glimpsed in extraordinary humans, laws, or acts. The Latin divinitas and its Greek counterparts conveyed something both immanent and awe-inspiring: a presence that could be felt in thunder, justice, ecstasy, fate, or beauty.",
    links: ["Adjective", "Divinity", "Noun"]
  },
  "Worship": {
    title: "Worship",
    extract: "Worship is an act of religious devotion usually directed towards a deity or God. For many, worship is not about an emotion, it is more about a recognition of a God. An act of worship may be performed individually, in an informal or formal group, or by a designated leader. Such acts may involve honoring.",
    links: ["Abenaki mythology", "Abkhaz traditional religion", "Abrahamic religions", "Acoma Pueblo", "Adoration", "Adventism", "Adyghe Xabze", "African diaspora religions", "African traditional religions", "Agni Yoga"]
  },
  "Model": {
    title: "Model",
    extract: "A model is an informative representation of an object, person, or system. The term originally denoted the plans of a building in late 16th-century English, and derived via French and Italian ultimately from Latin modulus, 'a measure'.",
    links: ["Applied science", "Atom", "Australian War Memorial", "Axiom", "Bibcode (identifier)", "Bourton-on-the-Water", "Brassiere", "Car model", "Charles Frederick Worth", "Computational fluid dynamics"]
  },
  "Question": {
    title: "Question",
    extract: "A question is an utterance which serves as a request for information. Questions are sometimes distinguished from interrogatives, which are the grammatical forms, typically used to express them. Rhetorical questions, for instance, are interrogative in form but may not be considered bona fide questions, as they are not expected to be answered.",
    links: ["Alternative semantics", "Answer ellipsis", "Asking (song)", "Atatláhuca–San Miguel Mixtec", "Cambridge Grammar of the English Language", "Cambridge University Press", "Cancellation (linguistics)", "Clause", "Complex question", "Confusion"]
  },
  "Algebra": {
    title: "Algebra",
    extract: "Algebra is a branch of mathematics that deals with abstract systems, known as algebraic structures, and the manipulation of expressions within those systems. It is a generalization of arithmetic that introduces variables and algebraic operations other than the standard arithmetic operations, such as addition and multiplication.",
    links: []
  },
  "Counting": {
    title: "Counting",
    extract: "Counting is the process of determining the number of elements of a finite set of objects; that is, determining the size of a set. The traditional way of counting consists of continually increasing a counter by a unit for every element of the set, in some order, while marking those elements to avoid visiting the same element more than once, until no unmarked elements are left; if the counter was set to one after the first object, the value after visiting the final object gives the desired number of elements. The related term enumeration refers to uniquely identifying the elements of a finite (combinatorial) set or infinite set by assigning a number to each element.",
    links: ["1", "Abacus", "Accountancy", "Ancient Roman calendar", "Brian Butterworth", "Calculation", "Card reading (bridge)", "Cardinal number", "Cardinality", "Christian liturgical calendar"]
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Rights": {
    title: "Rights",
    extract: "Rights are legal, social, or ethical principles of freedom or entitlement; that is, rights are the fundamental normative rules about what is allowed of people or owed to people according to some legal system, social convention, or ethical theory. Rights are an important concept in law and ethics, especially theories of justice and deontology.",
    links: ["Rights", "Scissor", "Scissors", "Trouser", "Trousers"]
  },
  "Wrongdoing": {
    title: "Wrongdoing",
    extract: "A wrong or wrength is an act that is illegal, incorrect, or immoral. Legal wrongs are usually quite clearly defined in the law of a state or jurisdiction. They can be divided into civil wrongs and crimes in common law countries, while civil law countries tend to have some additional categories, such as contraventions.",
    links: ["Adjective", "Noun", "Wrongdoing"]
  },
  "Immanuel Kant": {
    title: "Immanuel Kant",
    extract: "Immanuel Kant was a German philosopher. Born in Königsberg in the Kingdom of Prussia, he is considered one of the central thinkers of the Enlightenment. His comprehensive and systematic works in epistemology, metaphysics, ethics, and aesthetics have made him one of the most influential and highly discussed figures in modern Western philosophy.",
    links: ["Immanuel Kant", "Surname"]
  },
  "Sacredness": {
    title: "Sacredness",
    extract: "  Sacred describes something that is dedicated or set apart for the service or worship of a deity; is considered worthy of spiritual respect or devotion; or inspires awe or reverence among believers. The property is often ascribed to objects, or places.",
    links: ["Sacredness"]
  },
  "Divinity": {
    title: "Divinity",
    extract: "Divinity refers to the quality, presence, or nature of that which is divine—a term that, before the rise of monotheism, evoked a broad and dynamic field of sacred power. In the ancient world, divinity was not limited to a single deity or abstract ideal but was recognized in multiple forms: as a radiant attribute possessed by gods, as a vital force cushioning nature, and even as a quality glimpsed in extraordinary humans, laws, or acts. The Latin divinitas and its Greek counterparts conveyed something both immanent and awe-inspiring: a presence that could be felt in thunder, justice, ecstasy, fate, or beauty.",
    links: ["Adjective", "Divinity", "Noun"]
  },
  "Quantity": {
    title: "Quantity",
    extract: "Quantity or amount is a property that includes numbers and quantifiable phenomena such as mass, time, distance, heat, angle, and information. Quantities can commonly be compared in terms of \"more\", \"less\", or \"equal\", or by assigning a numerical value multiple of a unit of measurement. Quantity is among the basic classes of things along with quality, substance, change, and relation. Some quantities are such by their inner nature, while others function as states of things such as heavy and light, long and short, broad and narrow, small and great, or much and little.",
    links: ["1", "A priori and a posteriori", "Alcohol by volume", "Angle", "ArXiv (identifier)", "Argument of a function", "Aristotelian realist philosophy of mathematics", "Aristotle", "Base unit of measurement", "Bibcode (identifier)"]
  },
  "Measurement": {
    title: "Measurement",
    extract: "Measurement is the quantification of attributes of an object or event, which can be used to compare with other objects or events. In other words, measurement is a process of determining how large or small a physical quantity is as compared to a basic reference quantity of the same kind. The scope and application of measurement are dependent on the context and discipline. In natural sciences and engineering, measurements do not apply to nominal properties of objects or events, which is consistent with the guidelines of the International Vocabulary of Metrology (VIM) published by the International Bureau of Weights and Measures (BIPM). However, in other fields such as statistics as well as the social and behavioural sciences, measurements can have multiple levels, which would include nominal, ordinal, interval and ratio scales.",
    links: ["Absolute scale", "Abucco", "Accuracy and precision", "Additive conjoint measurement", "Afghan units of measurement", "Air resistance", "Algerian units of measurement", "Amount of substance", "Ampere", "Ancient Arabic units of measurement"]
  },
  "1": {
    title: "1",
    extract: "1 is a number, numeral, and grapheme. It is the first and smallest positive integer of the infinite sequence of natural numbers. This fundamental property has led to its unique uses in other fields, ranging from science to sports, where it commonly denotes the first, leading, or top thing in a group. 1 is the unit of counting or measurement, and represents a single thing. The representation of 1 evolved from ancient Sumerian and Babylonian symbols to the modern Arabic numeral. Linguistically, in English, \"one\" is a determiner for singular nouns and a gender-neutral pronoun.",
    links: ["1", "Number", "Numeral (linguistics)"]
  },
  "Theorem": {
    title: "Theorem",
    extract: "In mathematics and formal logic, a theorem is a statement that has been proven, or can be proven. The proof of a theorem is a logical argument that uses the inference rules of a deductive system to establish that the theorem is a logical consequence of the axioms and previously proved theorems.",
    links: ["Abstract logic", "Ackermann set theory", "Aesthetics of mathematics", "Aleph number", "Alfréd Rényi", "Algebraic logic", "Alphabet (formal languages)", "Antecedent (logic)", "Aphorism", "ArXiv (identifier)"]
  },
  "Contradiction": {
    title: "Contradiction",
    extract: "In traditional logic, a contradiction involves a proposition conflicting either with itself or established fact. It is often used as a tool to detect disingenuous beliefs and bias. Illustrating a general tendency in applied logic, The law of noncontradiction states that \"It is impossible that the same thing can at the same time both belong and not belong to the same object and in the same respect.\"",
    links: ["Abductive reasoning", "Abstract logic", "Ackermann set theory", "Aleph number", "Algebraic logic", "Alphabet (formal languages)", "Ampersand", "Analytic–synthetic distinction", "Antecedent (logic)", "Antinomy"]
  },
  "Puzzle": {
    title: "Puzzle",
    extract: "A puzzle is a game, problem, or toy that tests a person's ingenuity or knowledge. In a puzzle, the solver is expected to put pieces together in a logical way, in order to find the solution of the puzzle. There are different genres of puzzles, such as crossword puzzles, word-search puzzles, number puzzles, relational puzzles, and logic puzzles. The academic study of puzzles is called enigmatology.",
    links: ["15 puzzle", "ASIN (identifier)", "Abstract noun", "Adventure game", "Ambiguity", "Anagram", "BODMAS", "Bananagrams", "Boggle", "Bonza (Word Game)"]
  },
  "Problem solving": {
    title: "Problem solving",
    extract: "Problem solving is the process of achieving a goal by overcoming obstacles, a frequent part of most activities. Problems in need of solutions range from simple personal tasks to complex issues in business and technical fields. The former is an example of simple problem solving (SPS) addressing one issue, whereas the latter is complex problem solving (CPS) with multiple interrelated obstacles. Another classification of problem-solving tasks is into well-defined problems with specific obstacles and goals, and ill-defined problems in which the current situation is troublesome but it is not clear what kind of resolution to aim for. Similarly, one may distinguish formal or fact-based problems requiring psychometric intelligence, versus socio-emotional problems which depend on the changeable emotions of individuals or groups, such as tactful behavior, fashion, or gift choices.",
    links: ["Problem solving"]
  },
  "Grammar": {
    title: "Grammar",
    extract: "In linguistics, grammar is the set of rules for how a natural language is structured, as demonstrated by its speakers or writers. Grammar rules may concern the use of clauses, phrases, and words. The term may also refer to the study of such rules, a subject that includes phonology, morphology, and syntax, together with phonetics, semantics, and pragmatics. There are in effect two different ways to study grammar: traditional grammar and theoretical grammar.",
    links: ["Abbasid", "Abu al-Aswad al-Du'ali", "Adam Bohorič", "Aemilius Asper", "Affix", "Affix grammar over a finite lattice", "Afrikaans language", "Aggressive mood", "Alethic modality", "Alternative semantics"]
  },
  "Speech": {
    title: "Speech",
    extract: "Speech is the use of the human voice as a medium for language. Spoken language combines vowel and consonant sounds to form units of meaning like words, which belong to a language's lexicon. There are many different intentional speech acts, such as informing, declaring, asking, persuading, directing; acts may vary in various aspects like enunciation, intonation, loudness, and tempo to convey meaning. Individuals may also unintentionally communicate aspects of their social position through speech, such as sex, age, place of origin, physiological and mental condition, education, and experiences.",
    links: ["Acoustics", "Advertising research", "Affect (linguistics)", "Affect display", "Aggression", "Alaryngeal speech", "Aldous Huxley", "Alogia", "Animal communication", "Animal language"]
  },
  "Name": {
    title: "Name",
    extract: "A name is a term used for identification by an external observer. They can identify a class or category of things, or a single thing, either uniquely, or within a given context. The entity identified by a name is called its referent. A personal name identifies, not necessarily uniquely, a specific individual human. The name of a specific entity is sometimes called a proper name and is, when consisting of only one word, a proper noun. Other nouns are sometimes called \"common names\" or (obsolete) \"general names\". A name can be given to a person, place, or thing; for example, parents can give their child a name or a scientist can give an element a name.",
    links: ["-onym", "2002 Bali bombings", "Abductive reasoning", "Abraham", "Abrahamic covenant", "Abram", "Academic degree", "Academic ranks", "Acronym", "Afghan name"]
  },
  "Definition": {
    title: "Definition",
    extract: "A definition is a semantic statement of the meaning of a term. Definitions can be classified into two large categories: intensional definitions, and extensional definitions. Another important category of definitions is the class of ostensive definitions, which convey the meaning of a term by pointing out examples. A term may have many different senses and multiple meanings, and thus require multiple definitions.",
    links: ["Abductive reasoning", "Accident (philosophy)", "An Essay Concerning Human Understanding", "Analytic philosophy", "Analytic proposition", "Analytic–synthetic distinction", "Ancestor", "Antecedent (logic)", "Antinomy", "Apodicticity"]
  },
  "Reference": {
    title: "Reference",
    extract: "In logic, a reference is a relationship between objects in which one object designates, or acts as a means by which to connect to or link to, another object. The first object in this relation is said to refer to the second object. It is called a name for the second object. The next object, the one to which the first object refers, is called the referent of the first object. A name is usually a phrase or expression, or some other symbolic representation. Its referent may be anything – a material object, a person, an event, an activity, or an abstract concept.",
    links: ["Abductive reasoning", "Agent (grammar)", "Alpha-numeric grid", "Analytic–synthetic distinction", "Anaphora (linguistics)", "Antecedent (grammar)", "Antecedent (logic)", "Antinomy", "Argumentation theory", "Art"]
  },
  "Writing": {
    title: "Writing",
    extract: "Writing is the act of creating a persistent, usually visual representation of language on a surface. As a structured system of communication, writing is also known as written language. Historically, written languages have emerged as a way to record corresponding spoken languages. While the use of language is universal across human societies, most spoken languages are not written. A particular set of symbols, called a script, as well as the rules by which they encode a particular spoken language, is known as a writing system. In some rare cases, writing may be tactile rather than visual.",
    links: ["AI literacy", "Abjad", "Abugida", "Abydos, Egypt", "Academic discipline", "Accounting", "Adolescent literacy", "Aegean Islands", "Agricultural literacy", "Akkadian language"]
  },
  "Sign": {
    title: "Sign",
    extract: "A sign is an object, quality, event, or entity whose presence or occurrence indicates the probable presence or occurrence of something else. A natural sign bears a causal relation to its object—for instance, thunder is a sign of storm, or medical symptoms a sign of disease. A conventional sign signifies by agreement, as a full stop signifies the end of a sentence; similarly the words and expressions of a language, as well as bodily gestures, can be regarded as signs, expressing particular meanings. The physical objects most commonly referred to as signs generally inform or instruct using written text, symbols, pictures or a combination of these.",
    links: []
  },
  "Artist": {
    title: "Artist",
    extract: "An artist is a person engaged in creating art, or practicing the arts. The most common usage in everyday speech and academic discourse refers to a practitioner in the visual arts only.",
    links: []
  },
  "Originality": {
    title: "Originality",
    extract: "Originality is the aspect of created or invented works that distinguish them from reproductions, clones, forgeries, or substantially derivative works. The modern idea of originality is according to some scholars tied to Romanticism, by a notion that is often called romantic originality. The validity of \"originality\" as an operational concept has been questioned. For example, there is no clear boundary between \"derivative\" and \"inspired by\" or \"in the tradition of.\"",
    links: []
  },
  "Genius": {
    title: "Genius",
    extract: "Genius is a characteristic of original and exceptional insight in the performance of some art or endeavor that surpasses expectations, sets new standards for the future, establishes better methods of operation, or remains outside the capabilities of competitors. Genius is associated with intellectual ability and creative productivity. The term genius can also be used to refer to people characterised by genius, and/or to polymaths who excel across many subjects.",
    links: []
  },
  "Fantasy": {
    title: "Fantasy",
    extract: "Fantasy is a genre of speculative fiction that involves supernatural or magical elements, often including completely imaginary realms and creatures.",
    links: []
  },
  "Star": {
    title: "Star",
    extract: "A star is a luminous spheroid of plasma held together by self-gravity. The nearest star to Earth is the Sun. Many other stars are visible to the naked eye at night; their immense distances from Earth make them appear as fixed points of light. The most prominent stars have been categorised into constellations and asterisms, and many of the brightest stars have proper names. Astronomers have assembled star catalogues that identify the known stars and provide standardized stellar designations. The observable universe contains an estimated 1022 to 1024 stars. Only about 4,000 of these stars are visible to the naked eye—all within the Milky Way galaxy.",
    links: []
  },
  "Planet": {
    title: "Planet",
    extract: "A planet is a large, rounded astronomical body that is generally required to be in orbit around a star, stellar remnant, or brown dwarf, and is not one itself. The Solar System has eight planets by the most restrictive definition of the term: the terrestrial planets Mercury, Venus, Earth, and Mars, and the giant planets Jupiter, Saturn, Uranus, and Neptune. The best available theory of planet formation is the nebular hypothesis, which posits that an interstellar cloud collapses out of a nebula to create a young protostar orbited by a protoplanetary disk. Planets grow in this disk by the gradual accumulation of material driven by gravity, a process called accretion.",
    links: []
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Rights": {
    title: "Rights",
    extract: "Rights are legal, social, or ethical principles of freedom or entitlement; that is, rights are the fundamental normative rules about what is allowed of people or owed to people according to some legal system, social convention, or ethical theory. Rights are an important concept in law and ethics, especially theories of justice and deontology.",
    links: ["Rights", "Scissor", "Scissors", "Trouser", "Trousers"]
  },
  "Wrongdoing": {
    title: "Wrongdoing",
    extract: "A wrong or wrength is an act that is illegal, incorrect, or immoral. Legal wrongs are usually quite clearly defined in the law of a state or jurisdiction. They can be divided into civil wrongs and crimes in common law countries, while civil law countries tend to have some additional categories, such as contraventions.",
    links: ["Adjective", "Noun", "Wrongdoing"]
  },
  "Immanuel Kant": {
    title: "Immanuel Kant",
    extract: "Immanuel Kant was a German philosopher. Born in Königsberg in the Kingdom of Prussia, he is considered one of the central thinkers of the Enlightenment. His comprehensive and systematic works in epistemology, metaphysics, ethics, and aesthetics have made him one of the most influential and highly discussed figures in modern Western philosophy.",
    links: ["Immanuel Kant", "Surname"]
  },
  "Sacredness": {
    title: "Sacredness",
    extract: "  Sacred describes something that is dedicated or set apart for the service or worship of a deity; is considered worthy of spiritual respect or devotion; or inspires awe or reverence among believers. The property is often ascribed to objects, or places.",
    links: ["Sacredness"]
  },
  "Divinity": {
    title: "Divinity",
    extract: "Divinity refers to the quality, presence, or nature of that which is divine—a term that, before the rise of monotheism, evoked a broad and dynamic field of sacred power. In the ancient world, divinity was not limited to a single deity or abstract ideal but was recognized in multiple forms: as a radiant attribute possessed by gods, as a vital force cushioning nature, and even as a quality glimpsed in extraordinary humans, laws, or acts. The Latin divinitas and its Greek counterparts conveyed something both immanent and awe-inspiring: a presence that could be felt in thunder, justice, ecstasy, fate, or beauty.",
    links: ["Adjective", "Divinity", "Noun"]
  },
  "1": {
    title: "1",
    extract: "1 is a number, numeral, and grapheme. It is the first and smallest positive integer of the infinite sequence of natural numbers. This fundamental property has led to its unique uses in other fields, ranging from science to sports, where it commonly denotes the first, leading, or top thing in a group. 1 is the unit of counting or measurement, and represents a single thing. The representation of 1 evolved from ancient Sumerian and Babylonian symbols to the modern Arabic numeral. Linguistically, in English, \"one\" is a determiner for singular nouns and a gender-neutral pronoun.",
    links: ["1", "Number", "Numeral (linguistics)"]
  },
  "Problem solving": {
    title: "Problem solving",
    extract: "Problem solving is the process of achieving a goal by overcoming obstacles, a frequent part of most activities. Problems in need of solutions range from simple personal tasks to complex issues in business and technical fields. The former is an example of simple problem solving (SPS) addressing one issue, whereas the latter is complex problem solving (CPS) with multiple interrelated obstacles. Another classification of problem-solving tasks is into well-defined problems with specific obstacles and goals, and ill-defined problems in which the current situation is troublesome but it is not clear what kind of resolution to aim for. Similarly, one may distinguish formal or fact-based problems requiring psychometric intelligence, versus socio-emotional problems which depend on the changeable emotions of individuals or groups, such as tactful behavior, fashion, or gift choices.",
    links: ["Problem solving"]
  },
  "Plato": {
    title: "Plato",
    extract: "Plato was an ancient Greek philosopher of Classical Athens who is most commonly considered the foundational thinker of the Western philosophical tradition. An innovator of the literary dialogue and dialectic forms, Plato influenced all the major areas of theoretical philosophy and practical philosophy, and was the founder of the Platonic Academy, a philosophical school in Athens where Plato taught the collection of philosophical theories that would later become known as Platonism.",
    links: ["A. J. Ayer", "A Theory of Justice", "A Treatise Concerning the Principles of Human Knowledge", "A Treatise of Human Nature", "A priori and a posteriori", "Abonoteichos", "Abstract and concrete", "Abstract object theory", "Academic skepticism", "Acarnanian League"]
  },
  "Innovation": {
    title: "Innovation",
    extract: "Innovation is the practical implementation of ideas that result in the introduction of new goods or services or improvement in offering goods or services. ISO TC 279 in the standard ISO 56000:2020 defines innovation as \"a new or changed entity, realizing or redistributing value\". Others have different definitions; a common element in the definitions is a focus on newness, improvement, and spread of ideas or technologies.",
    links: ["3D printing", "A/B testing", "AUSFTA", "Abalone", "Abrasive", "Academic bias", "Academic freedom", "Access to information", "Accounting network", "Actor–network theory"]
  },
  "Image": {
    title: "Image",
    extract: "An image or picture is a visual representation. An image can be two-dimensional, such as a drawing, painting, or photograph, or three-dimensional, such as a carving or sculpture. Images may be displayed through other media, including a projection on a surface, activation of electronic signals, or digital displays; they can also be reproduced through mechanical means, such as photography, printmaking, or photocopying. Images can also be animated through digital or physical processes.",
    links: ["3D film", "Abrahamic religions", "Aesthetics", "Allegory of the cave", "Amplitude", "Andy Warhol", "Animation", "Banner", "Beta movement", "Bibcode (identifier)"]
  },
  "Organization": {
    title: "Organization",
    extract: "An organization or organisation is an entity—such as a company, or corporation or an institution, or an association—comprising one or more people and having a particular purpose.",
    links: ["Absenteeism", "Abusive supervision", "Accounting", "Activity theory", "Actor–network theory", "Advisory board", "Advocacy group", "Affinity group", "American and British English spelling differences", "Annual general meeting"]
  },
  "Star": {
    title: "Star",
    extract: "A star is a luminous spheroid of plasma held together by self-gravity. The nearest star to Earth is the Sun. Many other stars are visible to the naked eye at night; their immense distances from Earth make them appear as fixed points of light. The most prominent stars have been categorised into constellations and asterisms, and many of the brightest stars have proper names. Astronomers have assembled star catalogues that identify the known stars and provide standardized stellar designations. The observable universe contains an estimated 1022 to 1024 stars. Only about 4,000 of these stars are visible to the naked eye—all within the Milky Way galaxy.",
    links: ["Star"]
  },
  "Galaxy": {
    title: "Galaxy",
    extract: "A galaxy is a system of stars, stellar remnants, interstellar gas, dust, and dark matter bound together by gravity. The word is derived from the Greek galaxias (γαλαξίας), literally 'milky', a reference to the Milky Way galaxy that contains the Solar System. Galaxies, averaging an estimated 100 million stars, range in size from dwarfs with less than a thousand stars, to the largest galaxies known – supergiants with one hundred trillion stars, each orbiting its galaxy's centre of mass. Most of the mass in a typical galaxy is in the form of dark matter, with only a few percent of that mass visible in the form of stars and nebulae. Supermassive black holes are a common feature at the centres of galaxies.",
    links: ["10^12", "2MASS", "3C 236", "Abd al-Rahman al-Sufi", "Abell 1413", "Academy of Sciences of the Czech Republic", "Accretion disc", "Active galactic nucleus", "Active galaxy", "Adam Riess"]
  },
  "Home": {
    title: "Home",
    extract: "A home, or domicile, is a space used as a permanent or semi-permanent residence for one or more human occupants, and sometimes various companion animals. Homes provide sheltered spaces, for instance rooms, where domestic activity can be performed such as sleeping, preparing food, eating and hygiene as well as providing spaces for work and leisure such as remote working, studying and playing.",
    links: ["15-minute city", "2008 financial crisis", "5-over-1", "ARCHIVE Global", "Adverse possession", "Affordable housing", "Affordable housing by country", "Age of Enlightenment", "Alpine club hut", "Alternative lifestyle"]
  },
  "Ecology": {
    title: "Ecology",
    extract: "Ecology is the natural science of the relationships among living organisms and their environment. Ecology considers organisms at the individual, population, community, ecosystem, and biosphere levels. Ecology overlaps with the closely related sciences of biogeography, evolutionary biology, genetics, ethology, and natural history.",
    links: ["-logy", "Abiogenesis", "Abiotic", "Abiotic component", "Abiotic stress", "Abundance (ecology)", "Adaptation", "Adenosine triphosphate", "Aerobiology", "Africa"]
  },
  "Sustainability": {
    title: "Sustainability",
    extract: "Sustainability is the ability to continue over a long period of time. In modern usage it generally refers to a state in which the environment, economy, and society will continue to exist over a long period of time. Many definitions emphasize the environmental dimension. This can include addressing key environmental problems, such as climate change and biodiversity loss. The idea of sustainability can guide decisions at the global, national, organizational, and individual levels. A related concept is that of sustainable development, and the terms are often used to mean the same thing. UNESCO distinguishes the two like this: \"Sustainability is often thought of as a long-term goal, while sustainable development refers to the many processes and pathways to achieve it.\"",
    links: ["2015 United Nations Climate Change Conference", "7 Billion Actions", "Adaptive capacity", "Aerosol", "Affluenza", "Agenda 21", "Agenda 21 for culture", "Agrarianism", "Agriculture", "Air pollution"]
  },
  "Climate": {
    title: "Climate",
    extract: "Climate is the long-term weather pattern in a region, typically averaged over 30 years. More rigorously, it is the mean and variability of meteorological variables over a time spanning from months to millions of years. Some of the meteorological variables that are commonly measured are temperature, humidity, atmospheric pressure, wind, and precipitation. In a broader sense, climate is the state of the components of the climate system, including the atmosphere, hydrosphere, cryosphere, lithosphere and biosphere and the interactions between them. The climate of a location is affected by its latitude, longitude, terrain, altitude, land use and nearby water bodies and their currents.",
    links: ["2019 in climate change", "2020 in climate change", "2021 in climate change", "2022 in climate change", "2023 in climate change", "2024 in climate change", "2025 in climate change", "2026 in climate change", "Abiogenesis", "Abrupt climate change"]
  },
  "Species": {
    title: "Species",
    extract: "A species is the basic unit of classification and a taxonomic rank of an organism, as well as a unit of biodiversity. It can be defined as the largest group of organisms in which any two individuals of the appropriate sexes or mating types can produce fertile offspring, typically by sexual reproduction. Other ways of defining species include their karyotype, DNA sequence, morphology, behaviour, or ecological niche. In addition, palaeontologists use the concept of the chronospecies since fossil reproduction cannot be examined. The most recent rigorous estimate for the total number of species of eukaryotes is between 8 and 8.7 million. About 14% of these had been described by 2011. All species are given a two-part name, a \"binomen\". The first part of a binomen is the name of a genus to which the species belongs. The second part is called the specific name or the specific epithet. For example, Boa constrictor is one of the species of the genus Boa, with constrictor being the specific name.",
    links: ["16S ribosomal RNA", "Abiogenesis", "Accident-proneness", "Acquired characteristic", "Adaptation", "Adaptationism", "Adaptive radiation", "Adaptive unconscious", "Affect (psychology)", "Affect display"]
  },
  "Adaptation": {
    title: "Adaptation",
    extract: "In biology, adaptation has three related meanings. Firstly, it is the dynamic evolutionary process of natural selection that fits organisms to their environment, enhancing their evolutionary fitness. Secondly, it is a state reached by the population during that process. Thirdly, it is a phenotypic trait or adaptive trait, with a functional role in each individual organism, that is maintained and has evolved through natural selection.",
    links: ["Abiogenesis", "Acclimatization", "Adaptation and Natural Selection", "Adaptationism", "Adaptive evolution in the human genome", "Adaptive memory", "Adaptive mutation", "Adaptive radiation", "Adaptive system", "Adenosine triphosphate"]
  },
  "Genetics": {
    title: "Genetics",
    extract: "Genetics is the study of genes, genetic variation, and heredity in organisms. It is an important branch in biology because heredity is vital to organisms' evolution. Gregor Mendel, a Moravian Augustinian friar working in the 19th century in Brno, was the first to study genetics scientifically. Mendel studied \"trait inheritance\", patterns in the way traits are handed down from parents to offspring over time. He observed that organisms inherit traits by way of discrete \"units of inheritance\". This term, still used today, is a somewhat ambiguous definition of what is referred to as a gene.",
    links: ["Abiogenesis", "Acentric fragment", "Acetabularia", "Acrocentric", "Adaptation", "Adenine", "Adenosine triphosphate", "Aerobiology", "Agronomy", "Agrostology"]
  },
  "Behavior": {
    title: "Behavior",
    extract: "Behavior or behaviour is the range of actions of organisms, individuals, systems or artificial entities in some environment. These systems can include other systems or organisms as well as the inanimate physical environment. It is the computed response of the system or organism to various stimuli or inputs, whether internal or external, conscious or subconscious, overt or covert, and voluntary or involuntary. While some behavior is produced in response to an organism's environment, behavior can also be the product of intrinsic motivation, also referred to as \"agency\" or \"free will\".",
    links: ["American English", "Animal behavior", "Applied behavior analysis", "ArXiv (identifier)", "Artificial intelligence", "Behavior computing", "Behavior informatics", "Behavioral cusp", "Behavioral ecology", "Behavioral economics"]
  },
  "Neuroscience": {
    title: "Neuroscience",
    extract: "Neuroscience is the scientific study of the nervous system, its functions, and its disorders. It is a multidisciplinary science that combines physiology, anatomy, molecular biology, developmental biology, cytology, psychology, physics, computer science, chemistry, medicine, statistics, and mathematical modeling to understand the fundamental and emergent properties of neurons, glia, and neural circuits. The understanding of the biological basis of learning, memory, behavior, perception, and consciousness has been described by Eric Kandel as the \"epic challenge\" of the biological sciences.",
    links: ["1700 BC", "Abiogenesis", "Abu al-Qasim al-Zahrawi", "Academic Press", "Action potential", "Action potentials", "Adaptation", "Addiction medicine", "Adolf Beck (physiologist)", "Aerobiology"]
  },
  "Disease": {
    title: "Disease",
    extract: "A disease is a particular abnormal condition that adversely affects the structure or function of all or part of an organism and is not immediately due to any external injury. Diseases are often known to be medical conditions that are associated with specific signs and symptoms. A disease may be caused by external factors such as pathogens or by internal dysfunctions. For example, internal dysfunctions of the immune system can produce a variety of different diseases, including various forms of immunodeficiency, hypersensitivity, allergies, and autoimmune disorders.",
    links: []
  },
  "Progress": {
    title: "Progress",
    extract: "Progress is movement towards a perceived refined, improved, or otherwise desired state. It is central to the philosophy of progressivism, which interprets progress as the set of advancements in technology, science, and social organization – the latter being generally achieved through direct societal action, as in social enterprise or through activism, but being also attainable through natural sociocultural evolution – that progressivism holds all human societies should strive towards.",
    links: ["A Theory of Justice", "Abbasid Caliphate", "Abby Stein", "Abolitionism", "Accelerating change", "Accelerationism", "Activism", "Adam Ferguson", "Adam Smith", "Adolf Brand"]
  },
  "Data": {
    title: "Data",
    extract: "Data are a collection of discrete or continuous values that convey information, describing the quantity, quality, fact, statistics, other basic units of meaning, or simply sequences of symbols that may be further interpreted formally. A datum is an individual value in a collection of data. Data are usually organized into structures such as tables that provide additional context and meaning, and may themselves be used as data in larger structures. Data may be used as variables in a computational process. Data may represent abstract ideas or concrete measurements. Data are commonly used in scientific research, economics, and virtually every other form of human organizational activity. Examples of data sets include price indices, unemployment rates, literacy rates, and census data. In this context, data represent the raw facts and figures from which useful information can be extracted.",
    links: ["APA style", "A priori and a posteriori", "Academic library", "Accelerated failure time model", "Actuarial science", "Adaptive clinical trial", "Adrien Auzout", "Akaike information criterion", "Alphabet", "American English"]
  },
  "Message": {
    title: "Message",
    extract: "A message is a unit of communication that conveys information from a sender to a receiver. It can be transmitted through various forms, such as spoken or written words, signals, or electronic data, and can range from simple instructions to complex information.",
    links: []
  },
  "René Descartes": {
    title: "René Descartes",
    extract: "René Descartes was a French philosopher, scientist, and mathematician, widely considered a seminal figure in the emergence of modern philosophy and science. Mathematics was paramount to his method of inquiry, and he connected the previously separate fields of geometry and algebra into analytic geometry.",
    links: []
  },
  "Confidence": {
    title: "Confidence",
    extract: "Confidence is the feeling of belief or trust that a person or thing is reliable. Self-confidence is trust in oneself. Self-confidence involves a positive belief that one can generally accomplish what one wishes to do in the future. Self-confidence is not the same as self-esteem, which is an evaluation of one's worth. Self-confidence is related to self-efficacy—belief in one's ability to accomplish a specific task or goal. Confidence can be a self-fulfilling prophecy, as those without it may fail because they lack it, and those with it may succeed because they have it rather than because of an innate ability or skill.",
    links: []
  },

  // === SCRAPED BATCH 2026-02-03 ===
  "False statement": {
    title: "False statement",
    extract: "A false statement, also known as a falsehood, falsity, misstatement or untruth, is a statement that is false or does not align with reality. This concept spans various fields, including communication, law, linguistics, and philosophy. It is considered a fundamental issue in human discourse. The intentional dissemination of misstatements (disinformation) is commonly termed as deception or lying, while unintentional inaccuracies may arise from misconceptions, misinformation, or mistakes.",
    links: ["False statement"]
  },
  "Judgement": {
    title: "Judgement",
    extract: "Judgement is the evaluation of given circumstances to make a decision or form an opinion. It may also refer to the result of such an evaluation, or to the ability of someone to make good judgements.",
    links: ["Judgement", "MOS:NOPIPE"]
  },
  "Baruch Spinoza": {
    title: "Baruch Spinoza",
    extract: "Baruch (de) Spinoza, also known under his Latinized pen name Benedictus de Spinoza, was a philosopher of Portuguese-Jewish origin, who was born and lived in the Dutch Republic. A forerunner of the Age of Enlightenment, Spinoza significantly influenced modern biblical criticism, 17th-century rationalism, and Dutch intellectual culture, establishing himself as one of the most important and radical philosophers of the early modern period. Influenced by Stoicism, Thomas Hobbes, René Descartes, Ibn Tufayl, and heterodox Christians, Spinoza was a leading philosopher of the Dutch Golden Age.",
    links: ["Baruch Spinoza", "Surname"]
  },
  "Rights": {
    title: "Rights",
    extract: "Rights are legal, social, or ethical principles of freedom or entitlement; that is, rights are the fundamental normative rules about what is allowed of people or owed to people according to some legal system, social convention, or ethical theory. Rights are an important concept in law and ethics, especially theories of justice and deontology.",
    links: ["Rights", "Scissor", "Scissors", "Trouser", "Trousers"]
  },
  "Wrongdoing": {
    title: "Wrongdoing",
    extract: "A wrong or wrength is an act that is illegal, incorrect, or immoral. Legal wrongs are usually quite clearly defined in the law of a state or jurisdiction. They can be divided into civil wrongs and crimes in common law countries, while civil law countries tend to have some additional categories, such as contraventions.",
    links: ["Adjective", "Noun", "Wrongdoing"]
  },
  "Immanuel Kant": {
    title: "Immanuel Kant",
    extract: "Immanuel Kant was a German philosopher. Born in Königsberg in the Kingdom of Prussia, he is considered one of the central thinkers of the Enlightenment. His comprehensive and systematic works in epistemology, metaphysics, ethics, and aesthetics have made him one of the most influential and highly discussed figures in modern Western philosophy.",
    links: ["Immanuel Kant", "Surname"]
  },
  "Sacredness": {
    title: "Sacredness",
    extract: "  Sacred describes something that is dedicated or set apart for the service or worship of a deity; is considered worthy of spiritual respect or devotion; or inspires awe or reverence among believers. The property is often ascribed to objects, or places.",
    links: ["Sacredness"]
  },
  "Divinity": {
    title: "Divinity",
    extract: "Divinity refers to the quality, presence, or nature of that which is divine—a term that, before the rise of monotheism, evoked a broad and dynamic field of sacred power. In the ancient world, divinity was not limited to a single deity or abstract ideal but was recognized in multiple forms: as a radiant attribute possessed by gods, as a vital force cushioning nature, and even as a quality glimpsed in extraordinary humans, laws, or acts. The Latin divinitas and its Greek counterparts conveyed something both immanent and awe-inspiring: a presence that could be felt in thunder, justice, ecstasy, fate, or beauty.",
    links: ["Adjective", "Divinity", "Noun"]
  },
  "1": {
    title: "1",
    extract: "1 is a number, numeral, and grapheme. It is the first and smallest positive integer of the infinite sequence of natural numbers. This fundamental property has led to its unique uses in other fields, ranging from science to sports, where it commonly denotes the first, leading, or top thing in a group. 1 is the unit of counting or measurement, and represents a single thing. The representation of 1 evolved from ancient Sumerian and Babylonian symbols to the modern Arabic numeral. Linguistically, in English, \"one\" is a determiner for singular nouns and a gender-neutral pronoun.",
    links: ["1", "Number", "Numeral (linguistics)"]
  },
  "Problem solving": {
    title: "Problem solving",
    extract: "Problem solving is the process of achieving a goal by overcoming obstacles, a frequent part of most activities. Problems in need of solutions range from simple personal tasks to complex issues in business and technical fields. The former is an example of simple problem solving (SPS) addressing one issue, whereas the latter is complex problem solving (CPS) with multiple interrelated obstacles. Another classification of problem-solving tasks is into well-defined problems with specific obstacles and goals, and ill-defined problems in which the current situation is troublesome but it is not clear what kind of resolution to aim for. Similarly, one may distinguish formal or fact-based problems requiring psychometric intelligence, versus socio-emotional problems which depend on the changeable emotions of individuals or groups, such as tactful behavior, fashion, or gift choices.",
    links: ["Problem solving"]
  },
  "Star": {
    title: "Star",
    extract: "A star is a luminous spheroid of plasma held together by self-gravity. The nearest star to Earth is the Sun. Many other stars are visible to the naked eye at night; their immense distances from Earth make them appear as fixed points of light. The most prominent stars have been categorised into constellations and asterisms, and many of the brightest stars have proper names. Astronomers have assembled star catalogues that identify the known stars and provide standardized stellar designations. The observable universe contains an estimated 1022 to 1024 stars. Only about 4,000 of these stars are visible to the naked eye—all within the Milky Way galaxy.",
    links: ["Star"]
  },
  "Tool": {
    title: "Tool",
    extract: "A tool is an object that can extend an individual's ability to modify features of the surrounding environment or help them accomplish a particular task, and proto-typically refers to solid hand-operated non-biological objects with a single broad purpose that lack multiple functions, unlike machines or computers. Although human beings are proportionally most active in using and making tools in the animal kingdom, as use of stone tools dates back hundreds of millennia, and also in using tools to make other tools, many animals have demonstrated tool use in both instances.",
    links: ["3D printing", "Abacus", "Abalone", "Abri de la Madeleine", "Accounting", "Acheulean", "Adhesive", "Adze", "Aerostat", "Agricultural machinery"]
  },
  "Robot": {
    title: "Robot",
    extract: "A robot is a machine—especially one programmable by a computer—capable of carrying out a complex series of actions automatically. A robot can be guided by an external control device, or the control may be embedded within. Robots may be constructed to evoke human form, but most robots are task-performing machines, designed with an emphasis on stark functionality, rather than expressive aesthetics.",
    links: ["1939 New York World's Fair", "2-XL", "2001: A Space Odyssey", "3D scanner", "8-track tape", "A.I. Artificial Intelligence", "ABB", "AIBO", "AI control problem", "AI takeover in popular culture"]
  },
  "Signal": {
    title: "Signal",
    extract: "A signal is both the process and the result of transmission of data over some media accomplished by embedding some variation. Signals are important in multiple subject fields, including signal processing, information theory and biology.",
    links: ["44,100 Hz", "A Mathematical Theory of Communication", "Analog-to-digital converter", "Analog signal", "Analog signals", "Aneroid barometer", "Audio signal", "Beacon", "Bibcode (identifier)", "Biological membrane"]
  },
  "René Descartes": {
    title: "René Descartes",
    extract: "René Descartes was a French philosopher, scientist, and mathematician, widely considered a seminal figure in the emergence of modern philosophy and science. Mathematics was paramount to his method of inquiry, and he connected the previously separate fields of geometry and algebra into analytic geometry.",
    links: ["René Descartes", "Surname"]
  },
  "Inquiry": {
    title: "Inquiry",
    extract: "An inquiry is any process that has the aim of augmenting knowledge, resolving doubt, or solving a problem. A theory of inquiry is an account of the various types of inquiry and a treatment of the ways that each type of inquiry achieves its aim.",
    links: ["A priori and a posteriori", "Abductive inference", "Abductive reasoning", "Alfred North Whitehead", "Alpha graph", "Alternative hypothesis", "Ambiguity", "American English", "Analogical reasoning", "Analogy"]
  },
  "A priori and a posteriori": {
    title: "A priori and a posteriori",
    extract: "A priori and a posteriori are Latin phrases used in philosophy & linguistics to distinguish types of knowledge, justification, or argument by their reliance on experience. A priori knowledge is independent of any experience. Examples include mathematics, tautologies and deduction from pure reason. A posteriori knowledge depends on empirical evidence. Examples include most fields of science and aspects of personal knowledge.",
    links: ["A priori and a posteriori"]
  },
  "Somatosensory system": {
    title: "Somatosensory system",
    extract: "The somatosensory system, or somatic sensory system, is a subset of the sensory nervous system. The main functions of the somatosensory system are the perception of external stimuli, the perception of internal stimuli, and the regulation of body position and balance (proprioception). It is believed to act as a pathway between the different sensory modalities within the body.",
    links: ["Somatosensory system"]
  },
  "Destiny": {
    title: "Destiny",
    extract: "Destiny, sometimes also called fate, is a predetermined course of events. It may be conceived as a predetermined future, whether in general or of an individual.",
    links: ["19th-century philosophy", "A. J. Ayer", "Aeon", "Aevum", "Alphonse Mucha", "Amor fati", "Anattā", "Ancient Greek religion", "Argentina", "Art"]
  },
  "Probability": {
    title: "Probability",
    extract: "Probability is a branch of mathematics and statistics concerning events and numerical descriptions of how likely they are to occur. The probability of an event is a number between 0 and 1; the larger the probability, the more likely an event is to occur. This number is often expressed as a percentage (%), ranging from 0% to 100%. A simple example is the tossing of a fair (unbiased) coin. Since the coin is fair, the two outcomes are both equally probable; the probability of \"heads\" equals the probability of \"tails\"; and since no other outcomes are possible, the probability of either \"heads\" or \"tails\" is 1/2.",
    links: ["Abductive reasoning", "Abraham de Moivre", "Actuarial science", "Adolphe Quetelet", "Adrien-Marie Legendre", "Albert Einstein", "Algebra", "Almost surely", "Analytic–synthetic distinction", "Andrey Kolmogorov"]
  },
  "Randomness": {
    title: "Randomness",
    extract: "In common usage, randomness is the apparent or actual lack of definite patterns or predictability in information. A random sequence of events, symbols or steps often has no order and does not follow an intelligible pattern or combination. Individual random events are, by definition, unpredictable, but if there is a known probability distribution, the frequency of different outcomes over repeated events is predictable. For example, when throwing two dice, the outcome of any particular roll is unpredictable, but a sum of 7 will tend to occur twice as often as 4. In this view, randomness is not haphazardness; it is a measure of uncertainty of an outcome. Randomness applies to concepts of chance, probability, and information entropy.",
    links: ["A priori", "Accelerated failure time model", "Actuarial science", "Adaptive clinical trial", "Akaike information criterion", "Aleksandr Lyapunov", "Alfréd Rényi", "Algorithmic information theory", "Algorithmic probability", "Algorithmic randomness"]
  },
  "Luck": {
    title: "Luck",
    extract: "Luck is a phenomenon or belief that humans may associate with experiencing improbable events, especially improbably positive or negative events.  Philosophical naturalism, eschewing any supernatural explanations, might suggest that positive or negative events may happen at any time, and that even improbable events can happen by random chance. In this view, the epithet \"lucky\" or \"unlucky\" is a descriptive label that refers to an event's positivity, negativity, or improbability.",
    links: ["1", "11:11 (numerology)", "13 (number)", "17 (number)", "27 (number)", "27 Club", "3", "39 (number)", "4", "666 (number)"]
  },
  "Risk": {
    title: "Risk",
    extract: "Risk is the possibility of something bad happening, comprising a level of uncertainty about the effects and implications of an activity, particularly negative and undesirable consequences.",
    links: ["ALARP", "Aaron Wildavsky", "Absolute probability judgement", "Accident insurance", "Accidental death and dismemberment insurance", "Act of God", "Actual cash value", "Actuarial science", "Actuary", "Adverse selection"]
  },
  "Uncertainty": {
    title: "Uncertainty",
    extract: "Uncertainty or incertitude refers to situations involving imperfect or unknown information. It applies to predictions of future events, to physical measurements that are already made, or to the unknown, and is particularly relevant for decision-making. Uncertainty arises in partially observable or stochastic or complex or dynamic environments, as well as due to ignorance, indolence, or both. It arises in any number of fields, including insurance, philosophy, physics, statistics, economics, entrepreneurship, finance, medicine, psychology, sociology, engineering, metrology, meteorology, ecology and information science.",
    links: ["AI alignment", "A Treatise on Probability", "A priori and a posteriori", "Academic Skepticism", "Acatalepsy", "Accident", "Accident insurance", "Accidental death and dismemberment insurance", "Accuracy and precision", "Act of God"]
  },
  "Potentiality and actuality": {
    title: "Potentiality and actuality",
    extract: "In philosophy, potentiality and actuality are a pair of closely connected principles which Aristotle used to analyze motion, causality, ethics, and physiology in his Physics, Metaphysics, Nicomachean Ethics, and On the Soul.",
    links: ["Potentiality and actuality"]
  },
  "Potential": {
    title: "Potential",
    extract: "Potential generally refers to a currently unrealized ability. The term is used in a wide variety of fields, from physics to the social sciences to indicate things that are in a state where they are able to change in ways ranging from the simple release of energy by objects to the realization of abilities in people.",
    links: ["Ability", "Aristotelian ethics", "Aristotelian physics", "Aristotle", "Bibcode (identifier)", "Coulomb potential", "De Anima", "Doi (identifier)", "Electric potential", "Electrode potential"]
  },
  "Accident": {
    title: "Accident",
    extract: "An accident is an unintended and usually undesirable event that is not deliberately caused by humans. Although in ordinary conversations, intentionality is the only factor most people consider, formally, accidents require three factors: it must be unintended, unpreventable, and unexpected. The term accident usually implies the presence of unrecognized or unaddressed risks. Many researchers and professionals in injury prevention discourage the use of the word accident, because the word accident suggests there is no fault, no guilt, no control, and that the situation could not have been anticipated or prevented. Instead, experts emphasize preventable factors that increase risk and worsen outcomes. For example, while a tree falling in a windstorm may not involve human intention, factors such as its condition, placement, or maintenance may contribute to the outcome. Similarly, most road collisions stem from risky behaviour or preventable circumstances rather than being truly accidental; the perception that they are accidents rather than predictable and preventable events was strengthened in the mid-20th century due to automobile industry influence through media.",
    links: ["ARkStorm", "Accident-proneness", "Accident analysis", "Accident insurance", "Accident triangle", "Accidental death", "Act of God", "Anticipatory action", "Automobile industry", "Automotive safety"]
  },
  "Nominalism": {
    title: "Nominalism",
    extract: "In metaphysics, nominalism is the view that universals and abstract objects do not actually exist other than being merely names or labels. There are two main versions of nominalism. One denies the existence of universals—that which can be instantiated or exemplified by many particular things. The other version specifically denies the existence of abstract objects as such—objects that do not exist in space and time.",
    links: []
  },
  "I": {
    title: "I",
    extract: "I, or i, is the ninth letter and the third vowel letter of the Latin alphabet, used in the modern English alphabet, the alphabets of other western European languages and others worldwide. Its name in English is i, plural i's or is.",
    links: ["1 (number)", "3 (letter)", "7 (letter)", "A", "AZERTY", "African reference alphabet", "Alphabet", "American Sign Language", "American manual alphabet", "Ancient Greeks"]
  },
  "Shape": {
    title: "Shape",
    extract: "A shape is a graphical representation of an object's form or its external boundary, outline, or external surface. It is distinct from other object properties, such as color, texture, or material type. In geometry, shape excludes information about the object's position, size, orientation and chirality. A figure is a representation including both shape and size.",
    links: []
  },
};

// Get all available article titles
export function getCachedArticleTitles(): string[] {
  return Object.keys(ARTICLE_CACHE);
}

// Check if an article is cached
export function isArticleCached(title: string): boolean {
  return title in ARTICLE_CACHE;
}

// Get a cached article (case-insensitive)
export function getCachedArticle(title: string): CachedArticle | null {
  // Try exact match first
  if (ARTICLE_CACHE[title]) {
    return ARTICLE_CACHE[title];
  }

  // Try case-insensitive match
  const lowerTitle = title.toLowerCase();
  for (const key of Object.keys(ARTICLE_CACHE)) {
    if (key.toLowerCase() === lowerTitle) {
      return ARTICLE_CACHE[key];
    }
  }

  return null;
}

// Get count of cached articles
export function getCachedArticleCount(): number {
  return Object.keys(ARTICLE_CACHE).length;
}
