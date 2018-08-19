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

_public.containsHtml = text => {
  return text.includes('<');
};

export default _public;
