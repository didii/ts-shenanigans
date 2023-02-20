import * as locales from './locales';

type LocalesInfo = typeof locales;
type Language = keyof LocalesInfo;
type LanguageInfo = LocalesInfo['english'];
type GroupName = keyof LanguageInfo;
type GroupInfo<TGroup extends GroupName> = LanguageInfo[TGroup];
type KeyName<TGroup extends GroupName> = keyof GroupInfo<TGroup>;

function translate<TGroupName extends GroupName>(lang: Language, group: TGroupName, key: KeyName<TGroupName>): string {
  const languageInfo = locales[lang] as LanguageInfo;
  const groupInfo = languageInfo[group] as GroupInfo<TGroupName>;
  const result = groupInfo[key] as string;
  return result;
}

console.log(translate('dutch', 'common', 'submit'));

export { };
