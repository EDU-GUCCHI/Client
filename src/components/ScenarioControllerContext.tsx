import React, { createContext, useState, useContext, useEffect } from 'react';
import { ScenarioController } from '../backend/controller/controllers/ScenarioController';

type ScenarioControllerType = ScenarioController | null;

const ScenarioControllerContext = createContext<ScenarioControllerType>(null);

export const ScenarioControllerProvider = ({ children }) => {
  const [scenarioController, setScenarioController] = useState<ScenarioControllerType>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initScenarioController = async () => {
      const controller = new ScenarioController();
      controller.onLoadingChange = setIsLoading; // Set the callback
      setScenarioController(controller);
    };
    initScenarioController();
  }, []);
  return (
    <ScenarioControllerContext.Provider value={{scenarioController, isLoading}}>
      {children}
    </ScenarioControllerContext.Provider>
  );
};
export const useScenarioController = () => {
  const context = useContext(ScenarioControllerContext);
  if (!context) {
    throw new Error(
      'useScenarioController must be used within a ScenarioControllerProvider',
    );
  }
  return context; // Now this returns the whole context
};