//Ligger denna i rätt mapp?
enum State {
  Idle = 'idle',
  Exercise = 'exercise',
  Work = 'work',
  Social = 'social',
}

class GotchiStateMachine {
  private _currentState: State;

  constructor(initialState: State) {
    this._currentState = initialState;
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

  public getCurrentState(): State {
    return this._currentState;
  }
}
