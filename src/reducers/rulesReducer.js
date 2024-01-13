const initialRulesState = {
  en: [
    { name: "comma", active: false, symbol: "," },
    { name: "colon", active: false, symbol: ":" },
    { name: "semicolon", active: false, symbol: ";" },
    { name: "exclamation mark", active: false, symbol: "!" },
    { name: "question mark", active: false, symbol: "?" },
    { name: "ellipsis", active: false, symbol: "..." },
    { name: "period", active: false, symbol: "." },
    { name: "hashtag", active: false, symbol: "#" },
    { name: "percent", active: false, symbol: "%" },
    { name: "at sign", active: false, symbol: "@" },
    { name: "dollar sign", active: false, symbol: "$" },
  ],
  "uk-UA": [
    { name: "кома", active: false, symbol: "," },
    { name: "двокрапка", active: false, symbol: ":" },
    { name: "крапка з комою", active: false, symbol: ";" },
    { name: "знак оклику", active: false, symbol: "!" },
    { name: "знак запитання", active: false, symbol: "?" },
    { name: "три крапки", active: false, symbol: "..." },
    { name: "крапка", active: false, symbol: "." },
    { name: "хештег", active: false, symbol: "#" },
    { name: "відсоток", active: false, symbol: "%" },
    { name: "собачка", active: false, symbol: "@" },
    { name: "знак долара", active: false, symbol: "$" },
  ],
  es: [
    { name: "coma", active: false, symbol: "," },
    { name: "dos puntos", active: false, symbol: ":" },
    { name: "punto y coma", active: false, symbol: ";" },
    { name: "signo de exclamación", active: false, symbol: "!" },
    { name: "signo de interrogación", active: false, symbol: "?" },
    { name: "puntos suspensivos", active: false, symbol: "..." },
    { name: "punto", active: false, symbol: "." },
    { name: "almohadilla", active: false, symbol: "#" },
    { name: "porcentaje", active: false, symbol: "%" },
    { name: "arroba", active: false, symbol: "@" },
    { name: "signo de dólar", active: false, symbol: "$" },
  ],
  fr: [
    { name: "virgule", active: false, symbol: "," },
    { name: "deux-points", active: false, symbol: ":" },
    { name: "point-virgule", active: false, symbol: ";" },
    { name: "point d’exclamation", active: false, symbol: "!" },
    { name: "point d’interrogation", active: false, symbol: "?" },
    { name: "points de suspension", active: false, symbol: "..." },
    { name: "point", active: false, symbol: "." },
    { name: "dièse", active: false, symbol: "#" },
    { name: "pour cent", active: false, symbol: "%" },
    { name: "arobase", active: false, symbol: "@" },
    { name: "signe dollar", active: false, symbol: "$" },
  ],
  de: [
    { name: "Komma", active: false, symbol: "," },
    { name: "Doppelpunkt", active: false, symbol: ":" },
    { name: "Semikolon", active: false, symbol: ";" },
    { name: "Ausrufezeichen", active: false, symbol: "!" },
    { name: "Fragezeichen", active: false, symbol: "?" },
    { name: "Auslassungspunkte", active: false, symbol: "..." },
    { name: "Punkt", active: false, symbol: "." },
    { name: "Hashtag", active: false, symbol: "#" },
    { name: "Prozentzeichen", active: false, symbol: "%" },
    { name: "At-Zeichen", active: false, symbol: "@" },
    { name: "Dollarzeichen", active: false, symbol: "$" },
  ],
  it: [
    { name: "virgola", active: false, symbol: "," },
    { name: "due punti", active: false, symbol: ":" },
    { name: "punto e virgola", active: false, symbol: ";" },
    { name: "punto esclamativo", active: false, symbol: "!" },
    { name: "punto interrogativo", active: false, symbol: "?" },
    { name: "puntini di sospensione", active: false, symbol: "..." },
    { name: "punto", active: false, symbol: "." },
    { name: "cancelletto", active: false, symbol: "#" },
    { name: "percento", active: false, symbol: "%" },
    { name: "chiocciola", active: false, symbol: "@" },
    { name: "simbolo del dollaro", active: false, symbol: "$" },
  ],
  pt: [
    { name: "vírgula", active: false, symbol: "," },
    { name: "dois pontos", active: false, symbol: ":" },
    { name: "ponto e vírgula", active: false, symbol: ";" },
    { name: "ponto de exclamação", active: false, symbol: "!" },
    { name: "ponto de interrogação", active: false, symbol: "?" },
    { name: "reticências", active: false, symbol: "..." },
    { name: "ponto", active: false, symbol: "." },
    { name: "hashtag", active: false, symbol: "#" },
    { name: "porcentagem", active: false, symbol: "%" },
    { name: "arroba", active: false, symbol: "@" },
    { name: "símbolo de dólar", active: false, symbol: "$" },
  ],
  "ru-RU": [
    { name: "запятая", active: false, symbol: "," },
    { name: "двоеточие", active: false, symbol: ":" },
    { name: "точка с запятой", active: false, symbol: ";" },
    { name: "восклицательный знак", active: false, symbol: "!" },
    { name: "вопросительный знак", active: false, symbol: "?" },
    { name: "многоточие", active: false, symbol: "..." },
    { name: "точка", active: false, symbol: "." },
    { name: "хэштег", active: false, symbol: "#" },
    { name: "процент", active: false, symbol: "%" },
    { name: "собачка", active: false, symbol: "@" },
    { name: "знак доллара", active: false, symbol: "$" },
  ],
  "zh-CN": [
    { name: "逗号", active: false, symbol: "，" },
    { name: "冒号", active: false, symbol: "：" },
    { name: "分号", active: false, symbol: "；" },
    { name: "感叹号", active: false, symbol: "！" },
    { name: "问号", active: false, symbol: "？" },
    { name: "省略号", active: false, symbol: "……" },
    { name: "句号", active: false, symbol: "。" },
    { name: "井号", active: false, symbol: "#" },
    { name: "百分号", active: false, symbol: "%" },
    { name: "圆圈A", active: false, symbol: "@" },
    { name: "美元符号", active: false, symbol: "$" },
  ],
  ja: [
    { name: "読点", active: false, symbol: "、" },
    { name: "コロン", active: false, symbol: ":" },
    { name: "セミコロン", active: false, symbol: ";" },
    { name: "感嘆符", active: false, symbol: "！" },
    { name: "疑問符", active: false, symbol: "？" },
    { name: "省略符号", active: false, symbol: "..." },
    { name: "句点", active: false, symbol: "。" },
    { name: "ハッシュタグ", active: false, symbol: "#" },
    { name: "パーセント", active: false, symbol: "%" },
    { name: "アットマーク", active: false, symbol: "@" },
    { name: "ドル記号", active: false, symbol: "$" },
  ],
  ko: [
    { name: "쉼표", active: false, symbol: "," },
    { name: "쌍점", active: false, symbol: ":" },
    { name: "세미콜론", active: false, symbol: ";" },
    { name: "느낌표", active: false, symbol: "!" },
    { name: "물음표", active: false, symbol: "?" },
    { name: "줄임표", active: false, symbol: "..." },
    { name: "마침표", active: false, symbol: "." },
    { name: "해시태그", active: false, symbol: "#" },
    { name: "퍼센트 기호", active: false, symbol: "%" },
    { name: "골뱅이", active: false, symbol: "@" },
    { name: "달러 기호", active: false, symbol: "$" },
  ],
};

const rulesReducer = (state = initialRulesState, action) => {
  switch (action.type) {
    case "TOGGLE_RULE":
      if(action.payload.params === true || action.payload.params === false) {
        return {
          ...state,
          [action.payload.language]: state[action.payload.language].map((rule) =>
            rule.name === action.payload.ruleName
              ? { ...rule, active: action.payload.params }
              : rule
          ),
        };
      }
      return {
        ...state,
        [action.payload.language]: state[action.payload.language].map((rule) =>
          rule.name === action.payload.ruleName
            ? { ...rule, active: !rule.active }
            : rule
        ),
      };
    default:
      return state;
  }
};
export default rulesReducer;
