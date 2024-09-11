export const idlFactory = ({ IDL }) => {
  const GuideSection = IDL.Record({ 'title' : IDL.Text, 'content' : IDL.Text });
  const TalentBuild = IDL.Record({
    'treeLink' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const TalentSection = IDL.Record({
    'title' : IDL.Text,
    'builds' : IDL.Vec(TalentBuild),
  });
  return IDL.Service({
    'getCooldowns' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getRotation' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getStatPriority' : IDL.Func([], [IDL.Vec(GuideSection)], ['query']),
    'getTalentSections' : IDL.Func([], [IDL.Vec(TalentSection)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
