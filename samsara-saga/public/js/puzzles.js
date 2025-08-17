/**
 * @file Puzzles.js
 * @description Defines all puzzles for Samsara Saga Act II, including mechanics, solutions, and progression states.
 * @version 1.0.0
 * @license MIT
 */

export const puzzles = {
    /**
     * Shilpa Shastra Crafting System
     * A multi-stage crafting puzzle based on the sacred art of divine crafting
     */
    "ShilpaShastraCrafting": {
        "title": "The Sacred Art of Divine Crafting",
        "description": "Master the four stages of Shilpa Shastra to create divine artifacts.",
        "difficulty": "Variable",
        "stages": [
            {
                "name": "Atma Shuddhi (Self-Purification)",
                "description": "Purify your spiritual energy through meditation",
                "challenge": "Complete a mandala pattern by selecting the correct sequence of energy points",
                "mechanics": {
                    "type": "PatternMatching",
                    "pattern": [1, 4, 7, 2, 8, 5, 9, 6, 3], // The correct sequence of points to activate
                    "totalPoints": 9,
                    "attempts": 0,
                    "maxAttempts": 3,
                    "hint": "Begin at the root and follow the path of ascending energy, crossing the center only once."
                },
                "completed": false
            },
            {
                "name": "Dravya Shuddhi (Material Purification)",
                "description": "Purify the celestial materials",
                "challenge": "Balance elemental energies by arranging materials in the correct geometric pattern",
                "mechanics": {
                    "type": "ElementalArrangement",
                    "elements": ["Ether", "Air", "Fire", "Water", "Earth"],
                    "correctArrangement": {
                        "center": "Ether",
                        "topRight": "Air",
                        "bottomRight": "Fire",
                        "bottomLeft": "Water",
                        "topLeft": "Earth"
                    },
                    "currentArrangement": {},
                    "hint": "Ether belongs at the center. The other elements should follow the cycle of creation, moving clockwise."
                },
                "completed": false
            },
            {
                "name": "Nirmana (Creation)",
                "description": "Assemble the purified materials into the divine form",
                "challenge": "Connect components in the correct sequence to form a resonance bell",
                "mechanics": {
                    "type": "SequentialAssembly",
                    "components": ["Base", "Stem", "Chamber", "Striker", "Resonator"],
                    "correctSequence": ["Base", "Stem", "Chamber", "Resonator", "Striker"],
                    "currentSequence": [],
                    "hint": "Begin with what grounds the bell, then build upward. The striker is the last component to be added."
                },
                "completed": false
            },
            {
                "name": "Prana Pratishtha (Invocation of Life)",
                "description": "Imbue the created form with divine energy",
                "challenge": "Channel spiritual energy through specific mantras and visualizations",
                "mechanics": {
                    "type": "EnergyChanneling",
                    "mantras": ["Aum", "Hreem", "Shreem", "Kleem", "Saraswati Namaha"],
                    "correctVisualization": "Golden light spiraling clockwise into the bell's center",
                    "energyThreshold": 85, // Percentage of energy needed for success
                    "currentEnergy": 0,
                    "hint": "Begin with the universal sound and progress through the bija mantras before invoking the deity. Visualize energy flowing inward, not outward."
                },
                "completed": false
            }
        ],
        "rewards": {
            "item": "Resonance Bell",
            "abilities": ["Detect divine vibrations", "Amplify celestial sounds", "Dispel minor dissonance"],
            "craftingExperience": 100
        },
        "completed": false,
        "currentStage": 1
    },

    /**
     * Harmonic Resonance Puzzle
     * A musical puzzle requiring understanding of divine harmonics
     */
    "HarmonicResonance": {
        "title": "The Celestial Harmony",
        "description": "Unlock the temple entrance by playing the five sacred notes with perfect harmonic resonance.",
        "difficulty": "Medium",
        "mechanics": {
            "type": "MusicalSequence",
            "notes": ["Sa", "Ga", "Pa", "Dha", "Ni"],
            "correctSequence": ["Sa", "Ga", "Pa", "Dha", "Ni"],
            "harmonicRequirements": {
                "timing": {
                    "description": "Each note must be played with precise timing, following the cosmic rhythm",
                    "pattern": [1, 0.5, 0.5, 1, 2], // Duration multipliers for each note
                    "tolerance": 0.2 // Acceptable error margin
                },
                "intensity": {
                    "description": "Each note requires a specific intensity to create the perfect resonance",
                    "pattern": [70, 85, 100, 85, 70], // Percentage intensity for each note
                    "tolerance": 10 // Acceptable error margin
                },
                "resonance": {
                    "description": "Each note must be allowed to fully resonate before playing the next",
                    "minResonanceTime": [0.5, 0.3, 0.7, 0.5, 1.0], // Minimum seconds of resonance per note
                    "maxResonanceTime": [1.5, 1.0, 2.0, 1.5, 3.0] // Maximum seconds of resonance per note
                }
            },
            "environmentalFactors": {
                "waterSurface": {
                    "description": "The temple's reflection on the water's surface provides visual feedback on harmonic accuracy",
                    "effectOnSuccess": "The water's surface forms perfect concentric ripples that align with the temple's architecture",
                    "effectOnFailure": "The water's surface becomes chaotic, with ripples that clash and cancel each other out"
                },
                "crystalResonance": {
                    "description": "The crystal chimes glow with different intensities based on harmonic accuracy",
                    "effectOnSuccess": "All five chimes glow with synchronized, pulsating light",
                    "effectOnFailure": "The chimes emit discordant, flickering light"
                }
            },
            "tools": {
                "tuningFork": {
                    "description": "Tvashtar's tuning fork can be used to find the perfect pitch for each note",
                    "effect": "Reduces timing tolerance requirements by 50%"
                },
                "resonanceBell": {
                    "description": "The crafted resonance bell can amplify harmonic patterns",
                    "effect": "Provides visual feedback on harmonic accuracy before committing to the full sequence"
                }
            },
            "attempts": 0,
            "maxAttempts": null // Unlimited attempts
        },
        "hints": [
            "The water's surface can show you if your timing is correct—watch for symmetrical ripple patterns.",
            "Each note corresponds to an aspect of Saraswati's essence: knowledge (Sa), creativity (Ga), harmony (Pa), revelation (Dha), and transcendence (Ni).",
            "The intensity of each note should mirror the cosmic importance of its corresponding aspect.",
            "Allow each note to fully express itself before moving to the next—rushing creates dissonance."
        ],
        "rewards": {
            "access": "Sunken Temple of Saraswati",
            "ability": "Enhanced musical perception",
            "knowledge": "Understanding of cosmic harmonic principles"
        },
        "completed": false
    },

    /**
     * Synesthetic Harmony Puzzle
     * A puzzle requiring understanding of the relationship between sound and color in the divine realm
     */
    "SynestheticHarmony": {
        "title": "The Colors of Divine Sound",
        "description": "Neutralize the corrupted crystal by understanding and manipulating the synesthetic relationship between sound and color in the divine realm.",
        "difficulty": "Hard",
        "mechanics": {
            "type": "SynestheticMatching",
            "noteColorPairs": [
                {"note": "Sa", "color": "Golden White", "frequency": 432, "effect": "Illuminates paths of knowledge"},
                {"note": "Re", "color": "Crimson", "frequency": 484, "effect": "Strengthens resolve and courage"},
                {"note": "Ga", "color": "Emerald Green", "frequency": 544, "effect": "Enhances creative potential"},
                {"note": "Ma", "color": "Deep Blue", "frequency": 576, "effect": "Deepens wisdom and perception"},
                {"note": "Pa", "color": "Solar Yellow", "frequency": 648, "effect": "Expands consciousness"},
                {"note": "Dha", "color": "Cosmic Violet", "frequency": 729, "effect": "Connects to divine realms"},
                {"note": "Ni", "color": "Pearl Silver", "frequency": 768, "effect": "Transcends material limitations"}
            ],
            "corruptionPattern": {
                "description": "The crystal's corruption manifests as dissonant color-sound pairs that must be harmonized",
                "dissonances": [
                    {"corruptedNote": "Sa", "corruptedColor": "Sickly Green"},
                    {"corruptedNote": "Ga", "corruptedColor": "Murky Brown"},
                    {"corruptedNote": "Pa", "corruptedColor": "Dull Gray"},
                    {"corruptedNote": "Dha", "corruptedColor": "Harsh Red"},
                    {"corruptedNote": "Ni", "corruptedColor": "Oily Black"}
                ]
            },
            "solution": {
                "type": "ColorSoundAlignment",
                "description": "Create a perfect synesthetic alignment by matching each corrupted note with its true color",
                "steps": [
                    "Identify each corrupted note-color pair in the crystal",
                    "Visualize the true color for each note",
                    "Project the correct color-note resonance into the crystal",
                    "Maintain the correct alignment until the corruption dissolves"
                ],
                "challengeFactors": {
                    "timing": "Colors must shift in perfect synchronization with their corresponding notes",
                    "intensity": "Color brightness must match sound volume precisely",
                    "stability": "The alignment must be maintained despite the crystal's resistance"
                }
            },
            "attempts": 0,
            "maxAttempts": null // Unlimited attempts
        },
        "hints": [
            "The corruption inverts the natural relationship between sound and color—what should be bright becomes dark, what should be pure becomes muddied.",
            "Focus first on the Sa note, as it forms the foundation of all other harmonies.",
            "The crystal will resist correction—maintain your focus even as it attempts to revert to corruption.",
            "Your Nakshatra's natural affinity can provide insight into specific note-color relationships."
        ],
        "rewards": {
            "ability": "Synesthetic perception—the ability to see sounds and hear colors",
            "knowledge": "Deeper understanding of the interconnected nature of sensory experiences in the divine realm"
        },
        "completed": false
    },

    /**
     * Court Intrigue Puzzle
     * A social puzzle requiring navigation of divine politics
     */
    "CourtIntrigue": {
        "title": "The Celestial Court",
        "description": "Navigate the complex politics of Indra's court to gain allies for your quest.",
        "difficulty": "Medium",
        "mechanics": {
            "type": "SocialNavigation",
            "factions": [
                {
                    "name": "Adityas",
                    "leader": "Indra",
                    "domain": "Celestial Authority",
                    "values": ["Order", "Hierarchy", "Duty", "Righteousness"],
                    "approach": "Formal and protocol-driven",
                    "currentStanding": 50, // 0-100 scale
                    "rivalFaction": "Rudras",
                    "allyFaction": "Vasus"
                },
                {
                    "name": "Rudras",
                    "leader": "Rudra",
                    "domain": "Cosmic Forces",
                    "values": ["Power", "Transformation", "Directness", "Intensity"],
                    "approach": "Bold and challenging",
                    "currentStanding": 30,
                    "rivalFaction": "Adityas",
                    "allyFaction": "Maruts"
                },
                {
                    "name": "Vasus",
                    "leader": "Brihaspati",
                    "domain": "Cosmic Abundance",
                    "values": ["Wealth", "Refinement", "Knowledge", "Preservation"],
                    "approach": "Diplomatic and resource-focused",
                    "currentStanding": 40,
                    "rivalFaction": "Maruts",
                    "allyFaction": "Adityas"
                },
                {
                    "name": "Maruts",
                    "leader": "Vayu",
                    "domain": "Cosmic Movement",
                    "values": ["Change", "Innovation", "Freedom", "Adaptability"],
                    "approach": "Dynamic and unpredictable",
                    "currentStanding": 35,
                    "rivalFaction": "Vasus",
                    "allyFaction": "Rudras"
                }
            ],
            "courtEvents": [
                {
                    "name": "Celestial Debate",
                    "description": "A formal debate on the proper response to the Celestial Silence",
                    "factionPositions": {
                        "Adityas": "Maintain traditional protocols and hierarchical response",
                        "Rudras": "Take direct action against the source of the silence",
                        "Vasus": "Invest resources in protective measures and research",
                        "Maruts": "Adapt to the silence and find new ways of communication"
                    },
                    "playerOptions": [
                        {"position": "Support Adityas", "effect": {"Adityas": +15, "Rudras": -10, "Vasus": +5, "Maruts": -5}},
                        {"position": "Support Rudras", "effect": {"Adityas": -10, "Rudras": +15, "Vasus": -5, "Maruts": +5}},
                        {"position": "Support Vasus", "effect": {"Adityas": +5, "Rudras": -5, "Vasus": +15, "Maruts": -10}},
                        {"position": "Support Maruts", "effect": {"Adityas": -5, "Rudras": +5, "Vasus": -10, "Maruts": +15}},
                        {"position": "Propose Compromise", "effect": {"Adityas": +5, "Rudras": +5, "Vasus": +5, "Maruts": +5}, "difficulty": "Hard"}
                    ]
                },
                {
                    "name": "Divine Banquet",
                    "description": "A formal celestial feast where seating arrangements and conversation topics matter",
                    "challengeType": "Social Navigation",
                    "playerOptions": [
                        {"choice": "Sit with Adityas", "effect": {"Adityas": +10, "Rudras": -5, "Vasus": 0, "Maruts": 0}},
                        {"choice": "Sit with Rudras", "effect": {"Adityas": -5, "Rudras": +10, "Vasus": 0, "Maruts": 0}},
                        {"choice": "Sit with Vasus", "effect": {"Adityas": 0, "Rudras": 0, "Vasus": +10, "Maruts": -5}},
                        {"choice": "Sit with Maruts", "effect": {"Adityas": 0, "Rudras": 0, "Vasus": -5, "Maruts": +10}},
                        {"choice": "Move between groups", "effect": {"Adityas": +3, "Rudras": +3, "Vasus": +3, "Maruts": +3}, "difficulty": "Medium"}
                    ]
                },
                {
                    "name": "Factional Dispute",
                    "description": "A disagreement between factions that requires mediation",
                    "disputingFactions": ["Adityas", "Rudras"],
                    "issue": "Control over a sacred artifact that might help against the Celestial Silence",
                    "playerOptions": [
                        {"choice": "Support Adityas' claim", "effect": {"Adityas": +20, "Rudras": -15, "Vasus": +5, "Maruts": -5}},
                        {"choice": "Support Rudras' claim", "effect": {"Adityas": -15, "Rudras": +20, "Vasus": -5, "Maruts": +5}},
                        {"choice": "Propose joint custody", "effect": {"Adityas": +5, "Rudras": +5, "Vasus": +10, "Maruts": +10}, "difficulty": "Hard"},
                        {"choice": "Suggest the artifact be given to a neutral third party", "effect": {"Adityas": -5, "Rudras": -5, "Vasus": +15, "Maruts": +15}, "difficulty": "Medium"}
                    ]
                }
            ],
            "favorThresholds": [
                {"level": 25, "status": "Acknowledged", "benefit": "Basic information access"},
                {"level": 50, "status": "Respected", "benefit": "Faction-specific insights and minor assistance"},
                {"level": 75, "status": "Trusted Ally", "benefit": "Access to faction resources and significant support"},
                {"level": 90, "status": "Honored Champion", "benefit": "Full faction backing and special divine boons"}
            ]
        },
        "hints": [
            "Balance is key—gaining too much favor with one faction will inevitably cost you standing with their rivals.",
            "Listen carefully to how each faction discusses the Celestial Silence—their approach reveals their values.",
            "Some divine beings hold influence across multiple factions—identifying these key figures can help navigate complex situations.",
            "Your Nakshatra's natural affinity may align more easily with certain factions."
        ],
        "rewards": {
            "alliances": "Divine allies who can provide unique assistance against the Celestial Silence",
            "knowledge": "Political insights that reveal hidden aspects of the cosmic crisis",
            "resources": "Access to faction-specific divine artifacts and abilities"
        },
        "completed": false
    },

    /**
     * Festival Preparation Puzzle
     * A puzzle focused on preparing for and participating in the Navaratri festival
     */
    "FestivalPreparation": {
        "title": "The Nine Nights",
        "description": "Prepare for and participate in the Navaratri festival to gain divine blessings that may help against the Celestial Silence.",
        "difficulty": "Medium",
        "mechanics": {
            "type": "RitualPreparation",
            "components": [
                {
                    "name": "Crimson Lotus",
                    "location": "Gardens of Nandana",
                    "description": "A rare lotus that blooms only in the presence of pure devotion",
                    "gatheringChallenge": "Must be picked at the exact moment its petals fully open",
                    "associatedNight": 1,
                    "deity": "Shailaputri",
                    "effect": "Enhances stability and groundedness",
                    "collected": false
                },
                {
                    "name": "Celestial Copper",
                    "location": "Tvashtar's Workshop",
                    "description": "Metal forged in divine fire that resonates with transformative energy",
                    "gatheringChallenge": "Must be purified through a specific alchemical process",
                    "associatedNight": 2,
                    "deity": "Brahmacharini",
                    "effect": "Strengthens discipline and focus",
                    "collected": false
                },
                {
                    "name": "Harmony Water",
                    "location": "Sunken Temple Vicinity",
                    "description": "Water that naturally forms perfect ripple patterns",
                    "gatheringChallenge": "Must be collected without disturbing its natural harmonic patterns",
                    "associatedNight": 3,
                    "deity": "Chandraghanta",
                    "effect": "Dispels negative energies",
                    "collected": false
                },
                {
                    "name": "Luminous Honey",
                    "location": "Kalpavriksha Grove",
                    "description": "Honey produced by celestial bees that feed on wish-fulfilling flowers",
                    "gatheringChallenge": "Must be harvested while reciting specific mantras",
                    "associatedNight": 4,
                    "deity": "Kushmanda",
                    "effect": "Nourishes creative energy",
                    "collected": false
                },
                {
                    "name": "Whisper Silk",
                    "location": "Apsara Dance Hall",
                    "description": "Ethereal fabric that captures the essence of divine movement",
                    "gatheringChallenge": "Must be woven from strands of light during a celestial dance",
                    "associatedNight": 5,
                    "deity": "Skandamata",
                    "effect": "Enhances divine connection",
                    "collected": false
                },
                {
                    "name": "Memory Crystal",
                    "location": "Hall of Records",
                    "description": "A crystal that preserves perfect recollection of cosmic knowledge",
                    "gatheringChallenge": "Must be attuned to your specific spiritual frequency",
                    "associatedNight": 6,
                    "deity": "Katyayani",
                    "effect": "Sharpens perception and insight",
                    "collected": false
                },
                {
                    "name": "Twilight Incense",
                    "location": "Boundary Shrines",
                    "description": "Incense that burns at the threshold between realms",
                    "gatheringChallenge": "Must be harvested exactly at the moment between day and night",
                    "associatedNight": 7,
                    "deity": "Kalaratri",
                    "effect": "Reveals hidden truths",
                    "collected": false
                },
                {
                    "name": "Cosmic Ghee",
                    "location": "Divine Kitchens",
                    "description": "Clarified butter prepared with the milk of celestial cows",
                    "gatheringChallenge": "Must be churned while maintaining perfect inner peace",
                    "associatedNight": 8,
                    "deity": "Mahagauri",
                    "effect": "Purifies spiritual channels",
                    "collected": false
                },
                {
                    "name": "Wisdom Lamp",
                    "location": "Saraswati's Archives",
                    "description": "A lamp whose flame burns with pure knowledge",
                    "gatheringChallenge": "Must be lit with fire from your own spiritual insight",
                    "associatedNight": 9,
                    "deity": "Siddhidatri",
                    "effect": "Grants perfect clarity of purpose",
                    "collected": false
                }
            ],
            "festivalNights": [
                {
                    "night": 1,
                    "deity": "Shailaputri",
                    "aspect": "Primal Stability",
                    "ritual": "Ground yourself through meditation on mountains and earth",
                    "challenge": "Maintain perfect stillness while cosmic energies surge around you",
                    "reward": "Enhanced stability in the face of the Celestial Silence",
                    "completed": false
                },
                {
                    "night": 2,
                    "deity": "Brahmacharini",
                    "aspect": "Disciplined Focus",
                    "ritual": "Channel energy through precise mantras and mudras",
                    "challenge": "Maintain concentration despite increasing distractions",
                    "reward": "Ability to focus through disruptive silence",
                    "completed": false
                },
                // Additional nights would be defined here
            ],
            "communityGoal": {
                "description": "Collectively perform 10,000 acts of devotion across Svarga",
                "progress": 0,
                "threshold": 10000,
                "reward": "Temporary weakening of the Celestial Silence",
                "playerContribution": 0
            }
        },
        "hints": [
            "Each component must be gathered with the specific intention aligned with its associated deity.",
            "The order of the nine nights follows a spiritual progression from grounding to transcendence.",
            "Your participation in each night's ritual builds upon the previous, creating a cumulative effect.",
            "Your Nakshatra's natural affinity may make certain nights' rituals more powerful for you."
        ],
        "rewards": {
            "abilities": "Nine distinct divine blessings, one from each night of the festival",
            "knowledge": "Deeper understanding of the cosmic feminine principles that counter the Celestial Silence",
            "communityEffect": "Strengthened bonds with divine beings across Svarga"
        },
        "completed": false
    }
};

/**
 * Helper functions for puzzle management
 */
export const puzzleUtils = {
    /**
     * Initialize a puzzle for a player
     * @param {string} puzzleId - The ID of the puzzle to initialize
     * @param {object} playerState - The current state of the player
     * @returns {object} Updated player state with initialized puzzle
     */
    initializePuzzle: function(puzzleId, playerState) {
        if (!playerState.puzzles) {
            playerState.puzzles = {};
        }
        
        if (!playerState.puzzles[puzzleId]) {
            playerState.puzzles[puzzleId] = {
                active: true,
                started: true,
                completed: false,
                currentStage: 1,
                attempts: 0,
                progress: 0
            };
        }
        
        return playerState;
    },
    
    /**
     * Update puzzle progress
     * @param {string} puzzleId - The ID of the puzzle to update
     * @param {object} playerState - The current state of the player
     * @param {number} progress - Progress value (0-100)
     * @param {number} stage - Current stage (optional)
     * @returns {object} Updated player state with puzzle progress
     */
    updatePuzzleProgress: function(puzzleId, playerState, progress, stage) {
        if (!playerState.puzzles || !playerState.puzzles[puzzleId]) {
            playerState = this.initializePuzzle(puzzleId, playerState);
        }
        
        playerState.puzzles[puzzleId].progress = progress;
        
        if (stage) {
            playerState.puzzles[puzzleId].currentStage = stage;
        }
        
        if (progress >= 100) {
            playerState.puzzles[puzzleId].completed = true;
        }
        
        return playerState;
    },
    
    /**
     * Check if a puzzle is completed
     * @param {string} puzzleId - The ID of the puzzle to check
     * @param {object} playerState - The current state of the player
     * @returns {boolean} Whether the puzzle is completed
     */
    isPuzzleCompleted: function(puzzleId, playerState) {
        return playerState.puzzles && 
               playerState.puzzles[puzzleId] && 
               playerState.puzzles[puzzleId].completed;
    },
    
    /**
     * Get current puzzle stage
     * @param {string} puzzleId - The ID of the puzzle
     * @param {object} playerState - The current state of the player
     * @returns {number} Current stage number
     */
    getCurrentStage: function(puzzleId, playerState) {
        if (!playerState.puzzles || !playerState.puzzles[puzzleId]) {
            return 1;
        }
        return playerState.puzzles[puzzleId].currentStage;
    },
    
    /**
     * Record a puzzle attempt
     * @param {string} puzzleId - The ID of the puzzle
     * @param {object} playerState - The current state of the player
     * @param {boolean} success - Whether the attempt was successful
     * @returns {object} Updated player state with attempt recorded
     */
    recordAttempt: function(puzzleId, playerState, success) {
        if (!playerState.puzzles || !playerState.puzzles[puzzleId]) {
            playerState = this.initializePuzzle(puzzleId, playerState);
        }
        
        playerState.puzzles[puzzleId].attempts++;
        
        if (success) {
            if (puzzles[puzzleId].mechanics.type === "SequentialStages") {
                // For multi-stage puzzles, advance to the next stage
                const currentStage = playerState.puzzles[puzzleId].currentStage;
                const totalStages = puzzles[puzzleId].stages.length;
                
                if (currentStage < totalStages) {
                    playerState.puzzles[puzzleId].currentStage++;
                } else {
                    playerState.puzzles[puzzleId].completed = true;
                }
            } else {
                // For single-stage puzzles, mark as completed
                playerState.puzzles[puzzleId].completed = true;
            }
        }
        
        return playerState;
    },
    
    /**
     * Get a hint for the current puzzle stage
     * @param {string} puzzleId - The ID of the puzzle
     * @param {object} playerState - The current state of the player
     * @returns {string} A hint for the current stage
     */
    getHint: function(puzzleId, playerState) {
        if (!puzzles[puzzleId]) {
            return "No puzzle information available.";
        }
        
        const currentStage = this.getCurrentStage(puzzleId, playerState);
        
        if (puzzles[puzzleId].mechanics.type === "SequentialStages") {
            // For multi-stage puzzles
            if (puzzles[puzzleId].stages[currentStage - 1]) {
                return puzzles[puzzleId].stages[currentStage - 1].mechanics.hint;
            }
        } else if (puzzles[puzzleId].hints && puzzles[puzzleId].hints.length > 0) {
            // For single-stage puzzles with multiple hints
            const attemptCount = playerState.puzzles && 
                                playerState.puzzles[puzzleId] ? 
                                playerState.puzzles[puzzleId].attempts : 0;
            
            // Provide more detailed hints as attempts increase
            const hintIndex = Math.min(attemptCount, puzzles[puzzleId].hints.length - 1);
            return puzzles[puzzleId].hints[hintIndex];
        }
        
        return "Focus on understanding the puzzle's core principles.";
    },
    
    /**
     * Apply puzzle rewards to player state
     * @param {string} puzzleId - The ID of the completed puzzle
     * @param {object} playerState - The current state of the player
     * @returns {object} Updated player state with rewards applied
     */
    applyRewards: function(puzzleId, playerState) {
        if (!puzzles[puzzleId] || !puzzles[puzzleId].rewards) {
            return playerState;
        }
        
        const rewards = puzzles[puzzleId].rewards;
        
        // Initialize rewards tracking if needed
        if (!playerState.rewards) {
            playerState.rewards = {
                items: [],
                abilities: [],
                knowledge: []
            };
        }
        
        // Apply item rewards
        if (rewards.item) {
            playerState.rewards.items.push(rewards.item);
            
            // Set specific item flags
            if (rewards.item === "Resonance Bell") {
                playerState.has_resonance_bell = true;
            } else if (rewards.item === "Tuning Fork") {
                playerState.has_tuning_fork = true;
            }
        }
        
        // Apply ability rewards
        if (rewards.abilities) {
            playerState.rewards.abilities = [
                ...playerState.rewards.abilities,
                ...rewards.abilities
            ];
        }
        
        // Apply knowledge rewards
        if (rewards.knowledge) {
            playerState.rewards.knowledge.push(rewards.knowledge);
        }
        
        // Apply specific access rewards
        if (rewards.access) {
            playerState[`access_${rewards.access.toLowerCase().replace(/\s+/g, '_')}`] = true;
        }
        
        return playerState;
    }
};