const _public = {};

_public.toKebabCase = text => {
  return text.toLowerCase().replace(' ', '-');
};

_public.isEmptyString = string => {
  return string.trim() === '';
};

_public.removeBlankFirstLine = text => {
  const lines = text.split('\n');
  if(lines[0].trim() === '')
    lines.splice(0,1);
  return lines;
};

export default _public;
