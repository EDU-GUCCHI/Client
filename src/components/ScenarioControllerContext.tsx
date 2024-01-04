import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {ScenarioController} from '../backend/controller/controllers/ScenarioController';

type ScenarioControllerType = ScenarioController | null;

const ScenarioControllerContext = createContext<ScenarioControllerType>(null);

// Add the type for children here
type ScenarioControllerProviderProps = {
  children: React.ReactNode;
};

export const ScenarioControllerProvider: React.FC<
  ScenarioControllerProviderProps
> = ({children}) => {
  const [scenarioController, setScenarioController] =
    useState<ScenarioControllerType>(null);
  useEffect(() => {
    const initScenarioController = async () => {
      const controller = new ScenarioController();
      setScenarioController(controller);
    };
    initScenarioController();
  }, []);
  return (
    <ScenarioControllerContext.Provider value={scenarioController}>
      {children}
    </ScenarioControllerContext.Provider>
  );
};

export const useScenarioController = () => {
  const scenarioController = useContext(ScenarioControllerContext);
  if (scenarioController === null) {
    throw new Error('ScenarioController not yet initialized');
  }
  return scenarioController;
};
