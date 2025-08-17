/**
 * =================================================================
 * Samsara Saga - main.js
 * * This file is the central controller and the application's entry point.
 * It orchestrates the interactions between the Model (gameState), 
 * the View (UIController), and the game's logic engines.
 * It imports all other necessary modules.
 * =================================================================
 */

// --- 1. IMPORT MODULES ---
// Placeholders for the individual JS files you will create.
import { UIController } from './UIController.js';
import { GameStateManager } from './GameStateManager.js';
import { StoryEngine } from './StoryEngine.js';
import { PuzzleEngine } from './PuzzleEngine.js';
import { storyData } from './storyData.js';

// --- CONTROLLER: GameController ---
// The main class that orchestrates the entire game.
class GameController {
    constructor() {
        this.uiController = new UIController();
        this.gameState = {
            playerProfile: null,
            currentSceneId: null,
        };
        // Bind 'this' to ensure correct context in event handlers
        this.handleChoice = this.handleChoice.bind(this);
    }

    /**
     * Initializes the game.
     * Loads saved state or starts a new game.
     */
    init() {
        this.setupEventListeners();
        const savedState = GameStateManager.loadGame();

        if (savedState) {
            this.gameState = savedState;
        } else {
            this.startNewGame(false); // Start new game without confirmation
        }
        this.showScene(this.gameState.currentSceneId);
    }
    
    /**
     * Resets the game to its initial state.
     * @param {boolean} confirmFirst - Whether to ask for user confirmation.
     */
    startNewGame(confirmFirst = true) {
        if (confirmFirst && !confirm("Begin a new cycle? Your current journey will be lost to time.")) {
            return;
        }
        GameStateManager.deleteSave();
        this.gameState.playerProfile = {
            gunas: { sattva: 10, rajas: 10, tamas: 10 },
            karma: 0,
            inventory: []
        };
        this.gameState.currentSceneId = "START";
        this.showScene(this.gameState.currentSceneId);
    }

    /**
     * Renders a scene based on its ID.
     * This is the core loop of the game.
     * @param {string} sceneId - The ID of the scene to display.
     */
    showScene(sceneId) {
        this.gameState.currentSceneId = sceneId;
        const scene = StoryEngine.getScene(sceneId, storyData);

        if (!scene) {
            console.error(`Error: Scene "${sceneId}" not found! Returning to the start.`);
            return this.showScene("START");
        }

        this.uiController.renderScene(scene.text);

        if (scene.puzzleId) {
            const puzzle = PuzzleEngine.initPuzzle(scene.puzzleId, this.gameState.playerProfile);
            // Puzzle-specific choice handling would go here
        } else {
            const choices = StoryEngine.getAvailableChoices(scene, this.gameState.playerProfile);
            this.uiController.renderChoices(choices, this.handleChoice);
        }

        this.uiController.updateStatusPanel(this.gameState.playerProfile);
        GameStateManager.saveGame(this.gameState);
    }

    /**
     * Handles a player's choice.
     * @param {object} choice - The selected choice object from storyData.
     */
    handleChoice(choice) {
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }
        this.showScene(choice.nextScene);
    }

    /**
     * Applies the effects of a choice to the player's profile.
     * @param {object} effects - The effects object from a choice.
     */
    applyEffects(effects) {
        const profile = this.gameState.playerProfile;
        for (const key in effects) {
            if (key === 'gunas') {
                for (const guna in effects.gunas) {
                    profile.gunas[guna] += effects.gunas[guna];
                }
            } else if (profile.hasOwnProperty(key)) {
                profile[key] += effects[key];
            }
        }
    }

    /**
     * Sets up global event listeners for UI elements like the cursor and control buttons.
     */
    setupEventListeners() {
        const cursorContainer = document.getElementById('cursor-container');
        if (window.matchMedia('(pointer: fine)').matches) {
            document.body.style.cursor = 'none';
            document.addEventListener('mousemove', (e) => {
                cursorContainer.style.left = `${e.clientX}px`;
                cursorContainer.style.top = `${e.clientY}px`;
            });

            document.body.addEventListener('mouseover', (e) => {
                if (e.target.matches('.choice-button, .control-button')) {
                    cursorContainer.classList.add('active');
                }
            });
            document.body.addEventListener('mouseout', (e) => {
                if (e.target.matches('.choice-button, .control-button')) {
                    cursorContainer.classList.remove('active');
                }
            });
        }
        
        document.getElementById('new-game-btn').addEventListener('click', () => this.startNewGame());
    }
}

// --- APPLICATION ENTRY POINT ---
// This ensures the script runs after the full HTML document has been loaded.
window.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    game.init();
});