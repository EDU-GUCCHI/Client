//Ligger denna i rätt mapp?
export enum State {
  Idle = 'idle',
  Exercise = 'exercise',
  Work = 'work',
  Social = 'social',
}

export class GotchiStateMachine {
  private _currentState: State;

  constructor() {
    //Initial state
    this._currentState = State.Idle;
  }

  public transitionTo(newState: State): void {
    if (this.isValidTransition(this._currentState, newState)) {
      console.log(`Transitioning from ${this._currentState} to ${newState}`);
      this._currentState = newState;
    } else {
      console.log(
        `Invalid transition from ${this._currentState} to ${newState}`,
      );
    }
  }

  //Just nu kan man gå från och till alla states, ska man kunna det?
  private isValidTransition(currentState: State, newState: State): boolean {
    const validTransitions: Record<State, State[]> = {
      [State.Idle]: [State.Exercise, State.Work, State.Social],
      [State.Exercise]: [State.Idle, State.Work, State.Social],
      [State.Work]: [State.Idle, State.Exercise, State.Social],
      [State.Social]: [State.Idle, State.Exercise, State.Work],
    };

    return validTransitions[currentState].includes(newState);
  }

  public currentState(): State {
    return this._currentState;
  }
}
