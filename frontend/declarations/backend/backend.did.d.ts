import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface GuideSection { 'title' : string, 'content' : string }
export interface _SERVICE {
  'getCooldowns' : ActorMethod<[], Array<GuideSection>>,
  'getRotation' : ActorMethod<[], Array<GuideSection>>,
  'getStatPriority' : ActorMethod<[], Array<GuideSection>>,
  'getTalentPoints' : ActorMethod<[], Array<GuideSection>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
