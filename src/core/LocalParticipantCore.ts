export class LocalParticipant {
  identity: string

  name: string

  isSpeaking: boolean

  _eventsCount: number

  _maxListeners: number

  _connectionQuality: string

  constructor(
    identity: string,
    name: string,
    isSpeaking: boolean,
    _eventsCount: number,
    _maxListeners: number,
    _connectionQuality: string
  ) {
    this.identity = identity
    this.name = name
    this.isSpeaking = isSpeaking
    this._eventsCount = _eventsCount
    this._maxListeners = _maxListeners
    this._connectionQuality = _connectionQuality
  }
}
