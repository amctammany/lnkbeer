import _slugify from "slugify";
_slugify.extend({ "™": "", "®": "", "/": "-" });
export default function slugify(str: string, opts = {}) {
  return _slugify(str, {
    lower: true,
    remove: /['":@()]/g,
    ...opts,
  });
}
