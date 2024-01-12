import React, { createContext, useState, useContext, useEffect } from 'react';
import { ScenarioController } from '../backend/controller/controllers/ScenarioController';

/**
 * This class is critical. For React-purposes it wraps the entire scope of the App()
 * within a ScenarioController, allowing this immutable object to be referenced when
 * calling useScenarioController(). 
 * 
 * Critically, this class would also need to contain the logic which reinitializes
 * the controller state based on previous information. 
 */

type ScenarioControllerType = ScenarioController | null;

type ScenarioControllerContextType = {
  scenarioController: ScenarioControllerType;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScenarioControllerContext = createContext<ScenarioControllerContextType>({
  scenarioController: null,
  isLoading: false,
  setLoading: () => { },
});

// Add the type for children here
type ScenarioControllerProviderProps = {
  children: React.ReactNode;
};

export const ScenarioControllerProvider: React.FC<
  ScenarioControllerProviderProps
> = ({ children }) => {
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


/**
 * This method is responsible for returning the @class 
 * ScenarioController which wraps the logic of the app. 
 * 
 * @returns an immutable object of ScenarioController
 * to be used within the context of the application
 * 
 * TODO: Reinitialize the ScenarioController based on 
 * previous data.
 */
export const useScenarioController = () => {
  const context = useContext(ScenarioControllerContext);
  if (!context || !context.scenarioController) {

    /**
     * 
     */
    throw new Error('ScenarioController not yet initialized');
  }

  const { scenarioController, isLoading } = context;

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
