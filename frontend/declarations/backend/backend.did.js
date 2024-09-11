export const idlFactory = ({ IDL }) => {
  const GuideSection = IDL.Record({ 'title' : IDL.Text, 'content' : IDL.Text });
  const Talent = IDL.Record({
    'id' : IDL.Text,
    'row' : IDL.Nat,
    'name' : IDL.Text,
    'recommended' : IDL.Bool,
    'description' : IDL.Text,
    'column' : IDL.Nat,
  });
  const TalentTree = IDL.Record({
    'talents' : IDL.Vec(Talent),
    'name' : IDL.Text,
  });
  return IDL.Service({
    'getCooldowns' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getRotation' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getStatPriority' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getTalentTrees' : IDL.Func([], [IDL.Vec(TalentTree)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
