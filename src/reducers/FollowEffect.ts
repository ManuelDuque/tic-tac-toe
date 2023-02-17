export const FOLLOW_EFFECT_ACTIONS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  UPDATE_POSITION: 'CHANGE_POSITION',
  RESET: 'RESET',
  ON_MOBILE_EVENT_DRAW_STOP: 'ON_MOBILE_EVENT_DRAW_STOP'
}

const UPDATE_STATE_BY_ACTION = {
  [FOLLOW_EFFECT_ACTIONS.ACTIVE]: (state: any, action: any) => {
    return {
      ...state,
      followEffectActive: true
    }
  },
  [FOLLOW_EFFECT_ACTIONS.INACTIVE]: (state: any, action: any) => {
    return {
      ...state,
      followEffectActive: false
    }
  },
  [FOLLOW_EFFECT_ACTIONS.UPDATE_POSITION]: (state: any, action: any) => {
    const { payload } = action
    const isPointerMove = payload.type === 'pointermove'
    const isTouchMove = payload.type === 'touchmove'
    let position = { x: 0, y: 0 }
    if (isPointerMove) {
      position = {
        x: payload.clientX,
        y: payload.clientY
      }
    } else if (isTouchMove) {
      position = {
        x: payload.touches[0].clientX,
        y: payload.touches[0].clientY
      }
    }
    return {
      ...state,
      position: position
    }
  },
  [FOLLOW_EFFECT_ACTIONS.RESET]: (state: any, action: any) => {
    return {
      ...state,
      followEffectActive: true,
      position: { x: 0, y: 0 }
    }
  }
}

export const followEffectReducer = (state: any, action: any) => {
  const { type } = action
  const updateState = UPDATE_STATE_BY_ACTION[type]
  return updateState ? updateState(state, action) : state
}