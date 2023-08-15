import { LocalParticipant } from './LocalParticipantCore'

export class RoomCore {
  /** map of sid: [[RemoteParticipant]] */
  participants: any

  /** the current participant */
  localParticipant: LocalParticipant

  constructor(participants: any, localParticipant: LocalParticipant) {
    this.participants = participants
    this.localParticipant = localParticipant
  }
}
