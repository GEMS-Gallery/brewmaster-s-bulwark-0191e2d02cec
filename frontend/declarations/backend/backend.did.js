export const idlFactory = ({ IDL }) => {
  const GuideSection = IDL.Record({ 'title' : IDL.Text, 'content' : IDL.Text });
  return IDL.Service({
    'getCooldowns' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getRotation' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getStatPriority' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getTalentPoints' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
