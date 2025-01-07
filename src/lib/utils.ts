import { z } from 'zod';

// copied from https://github.com/JacobWeisenburger/zod_utilz/blob/4093595e5a6d95770872598ba3bc405d4e9c963b/src/json.ts
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const json = () => jsonSchema;

export const stringToJSONSchema = z
  .string()
  .transform((str, ctx): z.infer<ReturnType<typeof json>> => {
    try {
      return JSON.parse(str);
    } catch (_) {
      ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
      return z.NEVER;
    }
  });

// utils for the links which are stored on the users device and are loaded from the local storage
export type StorageLink = {
  link: string;
  id: string;
  slug: string;
};

export const linkSchemaArray = z
  .object({
    link: z.string().url(),
    id: z.string(),
    slug: z.string().min(5),
  })
  .array()
  .min(0);

export const linkSchema = z.object({
  link: z.string().url(),
  id: z.string(),
  slug: z.string().min(5),
});

export function getLinks({
  key,
}: {
  key: string;
}): StorageLink[] {
  // fetch the links from the local storage
  const viewedLinks = stringToJSONSchema.safeParse(localStorage.getItem(key));

  if (!viewedLinks.success) {
    localStorage.setItem(key, '[]');
    return [];
  }

  // parsing the json for the right schema
  const parse = linkSchemaArray.safeParse(viewedLinks.data);

  if (!parse.success) {
    localStorage.setItem(key, '[]');
    return [];
  }

  return parse.data;
}

export function setLink({
  key,
  link,
}: {
  key: string;
  link: StorageLink;
}) {
  // fetch the links from the local storage
  const viewedLinks = stringToJSONSchema.safeParse(localStorage.getItem(key));

  if (!viewedLinks.success) {
    localStorage.setItem(key, JSON.stringify([link]));
    return;
  }

  // parsing the json for the right schema
  const parse = linkSchemaArray.safeParse(viewedLinks.data);

  if (!parse.success) {
    localStorage.setItem(key, JSON.stringify([link]));
    return;
  }

  const element = parse.data.some((item) => item.id === link.id);

  if (element) {
    // element is already existing
    return;
  }

  parse.data.push(link);

  localStorage.setItem(key, JSON.stringify(parse.data));
}
