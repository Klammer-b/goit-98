const parseIntFilter = (unknown) => {
  if (typeof unknown !== 'string') return;
  const parsedInt = parseInt(unknown);
  if (Number.isNaN(parsedInt)) return;

  return parsedInt;
};

const parseFloatFilter = (unknown) => {
  if (typeof unknown !== 'string') return;
  const parsedFloat = parseFloat(unknown);
  if (Number.isNaN(parsedFloat)) return;

  return parsedFloat;
};

const parseGender = (unknown) => {
  if (['male', 'female', 'other'].includes(unknown)) return unknown;
};

const parseBoolean = (unknown) => {
  if (!['true', 'false'].includes(unknown)) return;

  return unknown === 'true' ? true : false;
};

export const parseFilters = (query) => {
  return {
    minAge: parseIntFilter(query.minAge),
    maxAge: parseIntFilter(query.maxAge),
    minAvgMark: parseFloatFilter(query.minAvgMark),
    maxAverageMark: parseFloatFilter(query.maxAverageMark),
    gender: parseGender(query.gender),
    onDuty: parseBoolean(query.onDuty),
  };
};
