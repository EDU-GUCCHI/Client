import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {ScenarioController} from '../backend/controller/controllers/ScenarioController';

type ScenarioControllerType = ScenarioController | null;

type ScenarioControllerContextType = {
  scenarioController: ScenarioControllerType;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScenarioControllerContext = createContext<ScenarioControllerContextType>({
  scenarioController: null,
  isLoading: false,
  setLoading: () => {},
});

// Add the type for children here
type ScenarioControllerProviderProps = {
  children: React.ReactNode;
};

export const ScenarioControllerProvider: React.FC<
  ScenarioControllerProviderProps
> = ({children}) => {
  const [scenarioController, setScenarioController] =
    useState<ScenarioController | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new ScenarioController();
    controller.setLoading = setIsLoading; // Allow ScenarioController to update isLoading
    setScenarioController(controller);
  }, []);

  const contextValue = {
    scenarioController,
    isLoading,
    setLoading: setIsLoading,
  };

  return (
    <ScenarioControllerContext.Provider value={contextValue}>
      {children}
    </ScenarioControllerContext.Provider>
  );
};

export const useScenarioController = () => {
  const context = useContext(ScenarioControllerContext);
  if (!context || !context.scenarioController) {
    console.log('ScenarioController not yet initialized')
    context.scenarioController = new ScenarioController()
    
    /**
     * Parse Gotchi from JSON
     * Parse Events from JSON
     * Parse
     */
    
    //throw new Error('ScenarioController not yet initialized');
  }

  const {scenarioController, isLoading} = context;

  // Assuming the scenarioController has a property named GUIController
  const GUIController = scenarioController.GUIController;
  const storage = scenarioController.storage;

  return {
    ...scenarioController, // This spreads all methods and properties of scenarioController
    isLoading,
    GUIController, // Add GUIController to the returned object
    storage,
  };
};