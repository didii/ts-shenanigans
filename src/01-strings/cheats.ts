type PrefixCurrencyTypes = '€' | '¥';
type SuffixCurrencyTypes = '$';
type CurrencyType = PrefixCurrencyTypes | SuffixCurrencyTypes;

type Currency = `${PrefixCurrencyTypes}${number}` | `${number}${SuffixCurrencyTypes}`;

const euro: Currency = '€3684';
const dollar: Currency = '5463587$';

export { };
