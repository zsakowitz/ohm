(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ohm = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = \"0\"..\"9\"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | \"a\"..\"f\"\n    | \"A\"..\"F\"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}"},"BuiltInRules",null,null,{"alnum":["define",{"sourceInterval":[18,78]},"an alpha-numeric character",[],["alt",{"sourceInterval":[60,78]},["app",{"sourceInterval":[60,66]},"letter",[]],["app",{"sourceInterval":[73,78]},"digit",[]]]],"letter":["define",{"sourceInterval":[82,142]},"a letter",[],["alt",{"sourceInterval":[107,142]},["app",{"sourceInterval":[107,112]},"lower",[]],["app",{"sourceInterval":[119,124]},"upper",[]],["app",{"sourceInterval":[131,142]},"unicodeLtmo",[]]]],"digit":["define",{"sourceInterval":[146,177]},"a digit",[],["range",{"sourceInterval":[169,177]},"0","9"]],"hexDigit":["define",{"sourceInterval":[181,254]},"a hexadecimal digit",[],["alt",{"sourceInterval":[219,254]},["app",{"sourceInterval":[219,224]},"digit",[]],["range",{"sourceInterval":[231,239]},"a","f"],["range",{"sourceInterval":[246,254]},"A","F"]]],"ListOf":["define",{"sourceInterval":[258,336]},null,["elem","sep"],["alt",{"sourceInterval":[282,336]},["app",{"sourceInterval":[282,307]},"NonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[314,336]},"EmptyListOf",[["param",{},0],["param",{},1]]]]],"NonemptyListOf":["define",{"sourceInterval":[340,388]},null,["elem","sep"],["seq",{"sourceInterval":[372,388]},["param",{},0],["star",{"sourceInterval":[377,388]},["seq",{"sourceInterval":[378,386]},["param",{},1],["param",{},0]]]]],"EmptyListOf":["define",{"sourceInterval":[392,434]},null,["elem","sep"],["seq",{"sourceInterval":[438,438]}]],"listOf":["define",{"sourceInterval":[438,516]},null,["elem","sep"],["alt",{"sourceInterval":[462,516]},["app",{"sourceInterval":[462,487]},"nonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[494,516]},"emptyListOf",[["param",{},0],["param",{},1]]]]],"nonemptyListOf":["define",{"sourceInterval":[520,568]},null,["elem","sep"],["seq",{"sourceInterval":[552,568]},["param",{},0],["star",{"sourceInterval":[557,568]},["seq",{"sourceInterval":[558,566]},["param",{},1],["param",{},0]]]]],"emptyListOf":["define",{"sourceInterval":[572,614]},null,["elem","sep"],["seq",{"sourceInterval":[616,616]}]]}]);

},{"..":41}],2:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? \"{\" Rule* \"}\"\n\n  SuperGrammar\n    = \"<:\" ident\n\n  Rule\n    = ident Formals? ruleDescr? \"=\"  RuleBody  -- define\n    | ident Formals?            \":=\" RuleBody  -- override\n    | ident Formals?            \"+=\" RuleBody  -- extend\n\n  RuleBody\n    = \"|\"? NonemptyListOf<TopLevelTerm, \"|\">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  Formals\n    = \"<\" ListOf<ident, \",\"> \">\"\n\n  Params\n    = \"<\" ListOf<Seq, \",\"> \">\"\n\n  Alt\n    = NonemptyListOf<Seq, \"|\">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred \"*\"  -- star\n    | Pred \"+\"  -- plus\n    | Pred \"?\"  -- opt\n    | Pred\n\n  Pred\n    = \"~\" Lex  -- not\n    | \"&\" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = \"#\" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? \"=\" | \":=\" | \"+=\")  -- application\n    | terminal \"..\" terminal                         -- range\n    | terminal                                       -- terminal\n    | \"(\" Alt \")\"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = \"(\" ruleDescrText \")\"\n\n  ruleDescrText\n    = (~\")\" any)*\n\n  caseName\n    = \"--\" (~\"\\n\" space)* name (~\"\\n\" space)* (\"\\n\" | &\"}\")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = \"\\\"\" terminalChar* \"\\\"\"\n\n  terminalChar\n    = escapeChar\n    | ~\"\\\\\" ~\"\\\"\" ~\"\\n\" any\n\n  escapeChar  (an escape sequence)\n    = \"\\\\\\\\\"                                     -- backslash\n    | \"\\\\\\\"\"                                     -- doubleQuote\n    | \"\\\\\\'\"                                     -- singleQuote\n    | \"\\\\b\"                                      -- backspace\n    | \"\\\\n\"                                      -- lineFeed\n    | \"\\\\r\"                                      -- carriageReturn\n    | \"\\\\t\"                                      -- tab\n    | \"\\\\u\" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | \"\\\\x\" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = \"//\" (~\"\\n\" any)* \"\\n\"  -- singleLine\n    | \"/*\" (~\"*/\" any)* \"*/\"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = \"<:\" | \"=\" | \":=\" | \"+=\" | \"*\" | \"+\" | \"?\" | \"~\" | \"&\"\n\n  punctuation = \"<\" | \">\" | \",\" | \"--\"\n}"},"Ohm",null,"Grammars",{"Grammars":["define",{"sourceInterval":[9,32]},null,[],["star",{"sourceInterval":[24,32]},["app",{"sourceInterval":[24,31]},"Grammar",[]]]],"Grammar":["define",{"sourceInterval":[36,83]},null,[],["seq",{"sourceInterval":[50,83]},["app",{"sourceInterval":[50,55]},"ident",[]],["opt",{"sourceInterval":[56,69]},["app",{"sourceInterval":[56,68]},"SuperGrammar",[]]],["terminal",{"sourceInterval":[70,73]},"{"],["star",{"sourceInterval":[74,79]},["app",{"sourceInterval":[74,78]},"Rule",[]]],["terminal",{"sourceInterval":[80,83]},"}"]]],"SuperGrammar":["define",{"sourceInterval":[87,116]},null,[],["seq",{"sourceInterval":[106,116]},["terminal",{"sourceInterval":[106,110]},"<:"],["app",{"sourceInterval":[111,116]},"ident",[]]]],"Rule_define":["define",{"sourceInterval":[131,181]},null,[],["seq",{"sourceInterval":[131,170]},["app",{"sourceInterval":[131,136]},"ident",[]],["opt",{"sourceInterval":[137,145]},["app",{"sourceInterval":[137,144]},"Formals",[]]],["opt",{"sourceInterval":[146,156]},["app",{"sourceInterval":[146,155]},"ruleDescr",[]]],["terminal",{"sourceInterval":[157,160]},"="],["app",{"sourceInterval":[162,170]},"RuleBody",[]]]],"Rule_override":["define",{"sourceInterval":[188,240]},null,[],["seq",{"sourceInterval":[188,227]},["app",{"sourceInterval":[188,193]},"ident",[]],["opt",{"sourceInterval":[194,202]},["app",{"sourceInterval":[194,201]},"Formals",[]]],["terminal",{"sourceInterval":[214,218]},":="],["app",{"sourceInterval":[219,227]},"RuleBody",[]]]],"Rule_extend":["define",{"sourceInterval":[247,297]},null,[],["seq",{"sourceInterval":[247,286]},["app",{"sourceInterval":[247,252]},"ident",[]],["opt",{"sourceInterval":[253,261]},["app",{"sourceInterval":[253,260]},"Formals",[]]],["terminal",{"sourceInterval":[273,277]},"+="],["app",{"sourceInterval":[278,286]},"RuleBody",[]]]],"Rule":["define",{"sourceInterval":[120,297]},null,[],["alt",{"sourceInterval":[131,297]},["app",{"sourceInterval":[131,170]},"Rule_define",[]],["app",{"sourceInterval":[188,227]},"Rule_override",[]],["app",{"sourceInterval":[247,286]},"Rule_extend",[]]]],"RuleBody":["define",{"sourceInterval":[301,354]},null,[],["seq",{"sourceInterval":[316,354]},["opt",{"sourceInterval":[316,320]},["terminal",{"sourceInterval":[316,319]},"|"]],["app",{"sourceInterval":[321,354]},"NonemptyListOf",[["app",{"sourceInterval":[336,348]},"TopLevelTerm",[]],["terminal",{"sourceInterval":[350,353]},"|"]]]]],"TopLevelTerm_inline":["define",{"sourceInterval":[377,400]},null,[],["seq",{"sourceInterval":[377,389]},["app",{"sourceInterval":[377,380]},"Seq",[]],["app",{"sourceInterval":[381,389]},"caseName",[]]]],"TopLevelTerm":["define",{"sourceInterval":[358,410]},null,[],["alt",{"sourceInterval":[377,410]},["app",{"sourceInterval":[377,389]},"TopLevelTerm_inline",[]],["app",{"sourceInterval":[407,410]},"Seq",[]]]],"Formals":["define",{"sourceInterval":[414,454]},null,[],["seq",{"sourceInterval":[428,454]},["terminal",{"sourceInterval":[428,431]},"<"],["app",{"sourceInterval":[432,450]},"ListOf",[["app",{"sourceInterval":[439,444]},"ident",[]],["terminal",{"sourceInterval":[446,449]},","]]],["terminal",{"sourceInterval":[451,454]},">"]]],"Params":["define",{"sourceInterval":[458,495]},null,[],["seq",{"sourceInterval":[471,495]},["terminal",{"sourceInterval":[471,474]},"<"],["app",{"sourceInterval":[475,491]},"ListOf",[["app",{"sourceInterval":[482,485]},"Seq",[]],["terminal",{"sourceInterval":[487,490]},","]]],["terminal",{"sourceInterval":[492,495]},">"]]],"Alt":["define",{"sourceInterval":[499,533]},null,[],["app",{"sourceInterval":[509,533]},"NonemptyListOf",[["app",{"sourceInterval":[524,527]},"Seq",[]],["terminal",{"sourceInterval":[529,532]},"|"]]]],"Seq":["define",{"sourceInterval":[537,552]},null,[],["star",{"sourceInterval":[547,552]},["app",{"sourceInterval":[547,551]},"Iter",[]]]],"Iter_star":["define",{"sourceInterval":[567,584]},null,[],["seq",{"sourceInterval":[567,575]},["app",{"sourceInterval":[567,571]},"Pred",[]],["terminal",{"sourceInterval":[572,575]},"*"]]],"Iter_plus":["define",{"sourceInterval":[591,608]},null,[],["seq",{"sourceInterval":[591,599]},["app",{"sourceInterval":[591,595]},"Pred",[]],["terminal",{"sourceInterval":[596,599]},"+"]]],"Iter_opt":["define",{"sourceInterval":[615,631]},null,[],["seq",{"sourceInterval":[615,623]},["app",{"sourceInterval":[615,619]},"Pred",[]],["terminal",{"sourceInterval":[620,623]},"?"]]],"Iter":["define",{"sourceInterval":[556,642]},null,[],["alt",{"sourceInterval":[567,642]},["app",{"sourceInterval":[567,575]},"Iter_star",[]],["app",{"sourceInterval":[591,599]},"Iter_plus",[]],["app",{"sourceInterval":[615,623]},"Iter_opt",[]],["app",{"sourceInterval":[638,642]},"Pred",[]]]],"Pred_not":["define",{"sourceInterval":[657,672]},null,[],["seq",{"sourceInterval":[657,664]},["terminal",{"sourceInterval":[657,660]},"~"],["app",{"sourceInterval":[661,664]},"Lex",[]]]],"Pred_lookahead":["define",{"sourceInterval":[679,700]},null,[],["seq",{"sourceInterval":[679,686]},["terminal",{"sourceInterval":[679,682]},"&"],["app",{"sourceInterval":[683,686]},"Lex",[]]]],"Pred":["define",{"sourceInterval":[646,710]},null,[],["alt",{"sourceInterval":[657,710]},["app",{"sourceInterval":[657,664]},"Pred_not",[]],["app",{"sourceInterval":[679,686]},"Pred_lookahead",[]],["app",{"sourceInterval":[707,710]},"Lex",[]]]],"Lex_lex":["define",{"sourceInterval":[724,740]},null,[],["seq",{"sourceInterval":[724,732]},["terminal",{"sourceInterval":[724,727]},"#"],["app",{"sourceInterval":[728,732]},"Base",[]]]],"Lex":["define",{"sourceInterval":[714,751]},null,[],["alt",{"sourceInterval":[724,751]},["app",{"sourceInterval":[724,732]},"Lex_lex",[]],["app",{"sourceInterval":[747,751]},"Base",[]]]],"Base_application":["define",{"sourceInterval":[766,827]},null,[],["seq",{"sourceInterval":[766,811]},["app",{"sourceInterval":[766,771]},"ident",[]],["opt",{"sourceInterval":[772,779]},["app",{"sourceInterval":[772,778]},"Params",[]]],["not",{"sourceInterval":[780,811]},["alt",{"sourceInterval":[782,810]},["seq",{"sourceInterval":[782,796]},["opt",{"sourceInterval":[782,792]},["app",{"sourceInterval":[782,791]},"ruleDescr",[]]],["terminal",{"sourceInterval":[793,796]},"="]],["terminal",{"sourceInterval":[799,803]},":="],["terminal",{"sourceInterval":[806,810]},"+="]]]]],"Base_range":["define",{"sourceInterval":[834,889]},null,[],["seq",{"sourceInterval":[834,856]},["app",{"sourceInterval":[834,842]},"terminal",[]],["terminal",{"sourceInterval":[843,847]},".."],["app",{"sourceInterval":[848,856]},"terminal",[]]]],"Base_terminal":["define",{"sourceInterval":[896,954]},null,[],["app",{"sourceInterval":[896,904]},"terminal",[]]],"Base_paren":["define",{"sourceInterval":[961,1016]},null,[],["seq",{"sourceInterval":[961,972]},["terminal",{"sourceInterval":[961,964]},"("],["app",{"sourceInterval":[965,968]},"Alt",[]],["terminal",{"sourceInterval":[969,972]},")"]]],"Base":["define",{"sourceInterval":[755,1016]},null,[],["alt",{"sourceInterval":[766,1016]},["app",{"sourceInterval":[766,811]},"Base_application",[]],["app",{"sourceInterval":[834,856]},"Base_range",[]],["app",{"sourceInterval":[896,904]},"Base_terminal",[]],["app",{"sourceInterval":[961,972]},"Base_paren",[]]]],"ruleDescr":["define",{"sourceInterval":[1020,1079]},"a rule description",[],["seq",{"sourceInterval":[1058,1079]},["terminal",{"sourceInterval":[1058,1061]},"("],["app",{"sourceInterval":[1062,1075]},"ruleDescrText",[]],["terminal",{"sourceInterval":[1076,1079]},")"]]],"ruleDescrText":["define",{"sourceInterval":[1083,1114]},null,[],["star",{"sourceInterval":[1103,1114]},["seq",{"sourceInterval":[1104,1112]},["not",{"sourceInterval":[1104,1108]},["terminal",{"sourceInterval":[1105,1108]},")"]],["app",{"sourceInterval":[1109,1112]},"any",[]]]]],"caseName":["define",{"sourceInterval":[1118,1186]},null,[],["seq",{"sourceInterval":[1133,1186]},["terminal",{"sourceInterval":[1133,1137]},"--"],["star",{"sourceInterval":[1138,1152]},["seq",{"sourceInterval":[1139,1150]},["not",{"sourceInterval":[1139,1144]},["terminal",{"sourceInterval":[1140,1144]},"\n"]],["app",{"sourceInterval":[1145,1150]},"space",[]]]],["app",{"sourceInterval":[1153,1157]},"name",[]],["star",{"sourceInterval":[1158,1172]},["seq",{"sourceInterval":[1159,1170]},["not",{"sourceInterval":[1159,1164]},["terminal",{"sourceInterval":[1160,1164]},"\n"]],["app",{"sourceInterval":[1165,1170]},"space",[]]]],["alt",{"sourceInterval":[1174,1185]},["terminal",{"sourceInterval":[1174,1178]},"\n"],["lookahead",{"sourceInterval":[1181,1185]},["terminal",{"sourceInterval":[1182,1185]},"}"]]]]],"name":["define",{"sourceInterval":[1190,1230]},"a name",[],["seq",{"sourceInterval":[1211,1230]},["app",{"sourceInterval":[1211,1220]},"nameFirst",[]],["star",{"sourceInterval":[1221,1230]},["app",{"sourceInterval":[1221,1229]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[1234,1266]},null,[],["alt",{"sourceInterval":[1250,1266]},["terminal",{"sourceInterval":[1250,1253]},"_"],["app",{"sourceInterval":[1260,1266]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[1270,1300]},null,[],["alt",{"sourceInterval":[1285,1300]},["terminal",{"sourceInterval":[1285,1288]},"_"],["app",{"sourceInterval":[1295,1300]},"alnum",[]]]],"ident":["define",{"sourceInterval":[1304,1337]},"an identifier",[],["app",{"sourceInterval":[1333,1337]},"name",[]]],"terminal":["define",{"sourceInterval":[1341,1379]},null,[],["seq",{"sourceInterval":[1356,1379]},["terminal",{"sourceInterval":[1356,1360]},"\""],["star",{"sourceInterval":[1361,1374]},["app",{"sourceInterval":[1361,1373]},"terminalChar",[]]],["terminal",{"sourceInterval":[1375,1379]},"\""]]],"terminalChar":["define",{"sourceInterval":[1383,1440]},null,[],["alt",{"sourceInterval":[1402,1440]},["app",{"sourceInterval":[1402,1412]},"escapeChar",[]],["seq",{"sourceInterval":[1419,1440]},["not",{"sourceInterval":[1419,1424]},["terminal",{"sourceInterval":[1420,1424]},"\\"]],["not",{"sourceInterval":[1425,1430]},["terminal",{"sourceInterval":[1426,1430]},"\""]],["not",{"sourceInterval":[1431,1436]},["terminal",{"sourceInterval":[1432,1436]},"\n"]],["app",{"sourceInterval":[1437,1440]},"any",[]]]]],"escapeChar_backslash":["define",{"sourceInterval":[1483,1538]},null,[],["terminal",{"sourceInterval":[1483,1489]},"\\\\"]],"escapeChar_doubleQuote":["define",{"sourceInterval":[1545,1602]},null,[],["terminal",{"sourceInterval":[1545,1551]},"\\\""]],"escapeChar_singleQuote":["define",{"sourceInterval":[1609,1666]},null,[],["terminal",{"sourceInterval":[1609,1615]},"\\'"]],"escapeChar_backspace":["define",{"sourceInterval":[1673,1728]},null,[],["terminal",{"sourceInterval":[1673,1678]},"\\b"]],"escapeChar_lineFeed":["define",{"sourceInterval":[1735,1789]},null,[],["terminal",{"sourceInterval":[1735,1740]},"\\n"]],"escapeChar_carriageReturn":["define",{"sourceInterval":[1796,1856]},null,[],["terminal",{"sourceInterval":[1796,1801]},"\\r"]],"escapeChar_tab":["define",{"sourceInterval":[1863,1912]},null,[],["terminal",{"sourceInterval":[1863,1868]},"\\t"]],"escapeChar_unicodeEscape":["define",{"sourceInterval":[1919,1978]},null,[],["seq",{"sourceInterval":[1919,1960]},["terminal",{"sourceInterval":[1919,1924]},"\\u"],["app",{"sourceInterval":[1925,1933]},"hexDigit",[]],["app",{"sourceInterval":[1934,1942]},"hexDigit",[]],["app",{"sourceInterval":[1943,1951]},"hexDigit",[]],["app",{"sourceInterval":[1952,1960]},"hexDigit",[]]]],"escapeChar_hexEscape":["define",{"sourceInterval":[1985,2040]},null,[],["seq",{"sourceInterval":[1985,2008]},["terminal",{"sourceInterval":[1985,1990]},"\\x"],["app",{"sourceInterval":[1991,1999]},"hexDigit",[]],["app",{"sourceInterval":[2000,2008]},"hexDigit",[]]]],"escapeChar":["define",{"sourceInterval":[1444,2040]},"an escape sequence",[],["alt",{"sourceInterval":[1483,2040]},["app",{"sourceInterval":[1483,1489]},"escapeChar_backslash",[]],["app",{"sourceInterval":[1545,1551]},"escapeChar_doubleQuote",[]],["app",{"sourceInterval":[1609,1615]},"escapeChar_singleQuote",[]],["app",{"sourceInterval":[1673,1678]},"escapeChar_backspace",[]],["app",{"sourceInterval":[1735,1740]},"escapeChar_lineFeed",[]],["app",{"sourceInterval":[1796,1801]},"escapeChar_carriageReturn",[]],["app",{"sourceInterval":[1863,1868]},"escapeChar_tab",[]],["app",{"sourceInterval":[1919,1960]},"escapeChar_unicodeEscape",[]],["app",{"sourceInterval":[1985,2008]},"escapeChar_hexEscape",[]]]],"space":["extend",{"sourceInterval":[2044,2063]},null,[],["app",{"sourceInterval":[2056,2063]},"comment",[]]],"comment_singleLine":["define",{"sourceInterval":[2081,2118]},null,[],["seq",{"sourceInterval":[2081,2103]},["terminal",{"sourceInterval":[2081,2085]},"//"],["star",{"sourceInterval":[2086,2098]},["seq",{"sourceInterval":[2087,2096]},["not",{"sourceInterval":[2087,2092]},["terminal",{"sourceInterval":[2088,2092]},"\n"]],["app",{"sourceInterval":[2093,2096]},"any",[]]]],["terminal",{"sourceInterval":[2099,2103]},"\n"]]],"comment_multiLine":["define",{"sourceInterval":[2125,2161]},null,[],["seq",{"sourceInterval":[2125,2147]},["terminal",{"sourceInterval":[2125,2129]},"/*"],["star",{"sourceInterval":[2130,2142]},["seq",{"sourceInterval":[2131,2140]},["not",{"sourceInterval":[2131,2136]},["terminal",{"sourceInterval":[2132,2136]},"*/"]],["app",{"sourceInterval":[2137,2140]},"any",[]]]],["terminal",{"sourceInterval":[2143,2147]},"*/"]]],"comment":["define",{"sourceInterval":[2067,2161]},null,[],["alt",{"sourceInterval":[2081,2161]},["app",{"sourceInterval":[2081,2103]},"comment_singleLine",[]],["app",{"sourceInterval":[2125,2147]},"comment_multiLine",[]]]],"tokens":["define",{"sourceInterval":[2165,2180]},null,[],["star",{"sourceInterval":[2174,2180]},["app",{"sourceInterval":[2174,2179]},"token",[]]]],"token":["define",{"sourceInterval":[2184,2260]},null,[],["alt",{"sourceInterval":[2192,2260]},["app",{"sourceInterval":[2192,2200]},"caseName",[]],["app",{"sourceInterval":[2203,2210]},"comment",[]],["app",{"sourceInterval":[2213,2218]},"ident",[]],["app",{"sourceInterval":[2221,2229]},"operator",[]],["app",{"sourceInterval":[2232,2243]},"punctuation",[]],["app",{"sourceInterval":[2246,2254]},"terminal",[]],["app",{"sourceInterval":[2257,2260]},"any",[]]]],"operator":["define",{"sourceInterval":[2264,2329]},null,[],["alt",{"sourceInterval":[2275,2329]},["terminal",{"sourceInterval":[2275,2279]},"<:"],["terminal",{"sourceInterval":[2282,2285]},"="],["terminal",{"sourceInterval":[2288,2292]},":="],["terminal",{"sourceInterval":[2295,2299]},"+="],["terminal",{"sourceInterval":[2302,2305]},"*"],["terminal",{"sourceInterval":[2308,2311]},"+"],["terminal",{"sourceInterval":[2314,2317]},"?"],["terminal",{"sourceInterval":[2320,2323]},"~"],["terminal",{"sourceInterval":[2326,2329]},"&"]]],"punctuation":["define",{"sourceInterval":[2333,2369]},null,[],["alt",{"sourceInterval":[2347,2369]},["terminal",{"sourceInterval":[2347,2350]},"<"],["terminal",{"sourceInterval":[2353,2356]},">"],["terminal",{"sourceInterval":[2359,2362]},","],["terminal",{"sourceInterval":[2365,2369]},"--"]]]}]);

},{"..":41}],3:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = \"(\" ListOf<name, \",\"> \")\"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n}"},"OperationsAndAttributes",null,"AttributeSignature",{"AttributeSignature":["define",{"sourceInterval":[29,58]},null,[],["app",{"sourceInterval":[54,58]},"name",[]]],"OperationSignature":["define",{"sourceInterval":[62,100]},null,[],["seq",{"sourceInterval":[87,100]},["app",{"sourceInterval":[87,91]},"name",[]],["opt",{"sourceInterval":[92,100]},["app",{"sourceInterval":[92,99]},"Formals",[]]]]],"Formals":["define",{"sourceInterval":[104,143]},null,[],["seq",{"sourceInterval":[118,143]},["terminal",{"sourceInterval":[118,121]},"("],["app",{"sourceInterval":[122,139]},"ListOf",[["app",{"sourceInterval":[129,133]},"name",[]],["terminal",{"sourceInterval":[135,138]},","]]],["terminal",{"sourceInterval":[140,143]},")"]]],"name":["define",{"sourceInterval":[147,187]},"a name",[],["seq",{"sourceInterval":[168,187]},["app",{"sourceInterval":[168,177]},"nameFirst",[]],["star",{"sourceInterval":[178,187]},["app",{"sourceInterval":[178,186]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[191,223]},null,[],["alt",{"sourceInterval":[207,223]},["terminal",{"sourceInterval":[207,210]},"_"],["app",{"sourceInterval":[217,223]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[227,257]},null,[],["alt",{"sourceInterval":[242,257]},["terminal",{"sourceInterval":[242,245]},"_"],["app",{"sourceInterval":[252,257]},"alnum",[]]]]}]);

},{"..":41}],4:[function(require,module,exports){
'use strict';

module.exports = {
  toAST: require('./semantics-toAST').helper,
  semanticsForToAST: require('./semantics-toAST').semantics
};

},{"./semantics-toAST":5}],5:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = require('../src/pexprs');
var MatchResult = require('../src/MatchResult');
var Grammar = require('../src/Grammar');
var extend = require('util-extend');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var defaultOperation = {
  _terminal: function() {
    return this.primitiveValue;
  },

  _nonterminal: function(children) {
    var ctorName = this._node.ctorName;
    var mapping = this.args.mapping;

    // without customization
    if (!mapping.hasOwnProperty(ctorName)) {
      // intermediate node
      if (this._node instanceof pexprs.Alt || this._node instanceof pexprs.Apply) {
        return children[0].toAST(mapping);
      }

      // lexical rule
      if (this.isLexical()) {
        return this.interval.contents;
      }

      // singular node (e.g. only surrounded by literals or lookaheads)
      var realChildren = children.filter(function(child) {
        return !child.isTerminal();
      });
      if (realChildren.length === 1) {
        return realChildren[0].toAST(mapping);
      }

      // rest: terms with multiple children
    }

    // direct forward
    if (typeof mapping[ctorName] === 'number') {
      return children[mapping[ctorName]].toAST(mapping);
    }

    // named/mapped children or unnamed children ('0', '1', '2', ...)
    var propMap = mapping[ctorName] || children;
    var node = {
      type: ctorName
    };
    for (var prop in propMap) {
      var mappedProp = mapping[ctorName] && mapping[ctorName][prop];
      if (typeof mappedProp === 'number') {
        // direct forward
        node[prop] = children[mappedProp].toAST(mapping);
      } else if ((typeof mappedProp === 'string') || (typeof mappedProp === 'boolean') ||
          (mappedProp === null)) {
        // primitive value
        node[prop] = mappedProp;
      } else if ((typeof mappedProp === 'object') && (mappedProp instanceof Number)) {
        // primitive number (must be unboxed)
        node[prop] = Number(mappedProp);
      } else if (typeof mappedProp === 'function') {
        // computed value
        node[prop] = mappedProp.call(this, children);
      } else if (mappedProp === undefined) {
        if (children[prop] && !children[prop].isTerminal()) {
          node[prop] = children[prop].toAST(mapping);
        } else {
          // delete predefined 'type' properties, like 'type', if explicitely removed
          delete node[prop];
        }
      }
    }
    return node;
  },

  _iter: function(children) {
    if (this._node.isOptional()) {
      if (this.numChildren === 0) {
        return null;
      } else {
        return children[0].toAST(this.args.mapping);
      }
    }

    return children.map(function(child) {
      return child.toAST(this.args.mapping);
    }, this);
  },

  NonemptyListOf: function(first, sep, rest) {
    return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
  },

  EmptyListOf: function() {
    return [];
  }
};

// Returns a plain JavaScript object that includes an abstract syntax tree (AST)
// for the given match result `res` containg a concrete syntax tree (CST) and grammar.
// The optional `mapping` parameter can be used to customize how the nodes of the CST
// are mapped to the AST (see /doc/extras.md#toastmatchresult-mapping).
function toAST(res, mapping) {
  if (!(res instanceof MatchResult) || res.failed()) {
    throw new Error('toAST() expects a succesfull MatchResult as first parameter');
  }

  mapping = extend({}, mapping);
  var operation = extend({}, defaultOperation);
  for (var termName in mapping) {
    if (typeof mapping[termName] === 'function') {
      operation[termName] = mapping[termName];
      delete mapping[termName];
    }
  }
  var g = res._cst.grammar;
  var s = g.semantics().addOperation('toAST(mapping)', operation);
  return s(res).toAST(mapping);
}

// Returns a semantics containg the toAST(mapping) operation for the given grammar g.
function semanticsForToAST(g) {
  if (!(g instanceof Grammar)) {
    throw new Error('semanticsToAST() expects a Grammar as parameter');
  }

  return g.semantics().addOperation('toAST(mapping)', defaultOperation);
}

module.exports = {
  helper: toAST,
  semantics: semanticsForToAST
};

},{"../src/Grammar":29,"../src/MatchResult":33,"../src/pexprs":58,"util-extend":26}],6:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":7,"./polyfill":22}],7:[function(require,module,exports){
'use strict';

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }
	if (typeof Symbol.iterator === 'symbol') return true;

	// Return 'true' for polyfills
	if (typeof Symbol.isConcatSpreadable !== 'object') return false;
	if (typeof Symbol.iterator !== 'object') return false;
	if (typeof Symbol.toPrimitive !== 'object') return false;
	if (typeof Symbol.toStringTag !== 'object') return false;
	if (typeof Symbol.unscopables !== 'object') return false;

	return true;
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	return (x && ((typeof x === 'symbol') || (x['@@toStringTag'] === 'Symbol'))) || false;
};

},{}],9:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":10,"es5-ext/object/is-callable":13,"es5-ext/object/normalize-options":17,"es5-ext/string/#/contains":19}],10:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":11,"./shim":12}],11:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],12:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":14,"../valid-value":18}],13:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],14:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":15,"./shim":16}],15:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],16:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],17:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],18:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":20,"./shim":21}],20:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],21:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],22:[function(require,module,exports){
'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , Symbol, HiddenSymbol, globalSymbols = create(null);

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			defineProperty(this, name, d(value));
		}));
		return name;
	};
}());

HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return Symbol(description);
};
module.exports = Symbol = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(Symbol, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = Symbol(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),
	hasInstance: d('', Symbol('hasInstance')),
	isConcatSpreadable: d('', Symbol('isConcatSpreadable')),
	iterator: d('', Symbol('iterator')),
	match: d('', Symbol('match')),
	replace: d('', Symbol('replace')),
	search: d('', Symbol('search')),
	species: d('', Symbol('species')),
	split: d('', Symbol('split')),
	toPrimitive: d('', Symbol('toPrimitive')),
	toStringTag: d('', Symbol('toStringTag')),
	unscopables: d('', Symbol('unscopables'))
});
defineProperties(HiddenSymbol.prototype, {
	constructor: d(Symbol),
	toString: d('', function () { return this.__name__; })
});

defineProperties(Symbol.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(Symbol.prototype, Symbol.toPrimitive, d('',
	function () { return validateSymbol(this); }));
defineProperty(Symbol.prototype, Symbol.toStringTag, d('c', 'Symbol'));

defineProperty(HiddenSymbol.prototype, Symbol.toPrimitive,
	d('c', Symbol.prototype[Symbol.toPrimitive]));
defineProperty(HiddenSymbol.prototype, Symbol.toStringTag,
	d('c', Symbol.prototype[Symbol.toStringTag]));

},{"./validate-symbol":23,"d":9}],23:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":8}],24:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],25:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(
    obj != null &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

},{}],26:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

},{}],27:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var GrammarDecl = require('./GrammarDecl');
var Interval = require('./Interval');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {}

Builder.prototype = {
  currentDecl: null,

  newGrammar: function(name) {
    return new GrammarDecl(name);
  },

  grammar: function(metaInfo, name, superGrammar, defaultStartRule, rules) {
    var gDecl = new GrammarDecl(name);
    if (superGrammar) {
      gDecl.withSuperGrammar(this.fromRecipe(superGrammar));
    }
    if (defaultStartRule) {
      gDecl.withDefaultStartRule(defaultStartRule);
    }
    if (metaInfo && metaInfo.source) {
      gDecl.withSource(metaInfo.source);
    }

    var self = this;
    this.currentDecl = gDecl;
    Object.keys(rules).forEach(function(ruleName) {
      var ruleRecipe = rules[ruleName];

      var action = ruleRecipe[0]; // define/extend/override
      var metaInfo = ruleRecipe[1];
      var optDescription = ruleRecipe[2];
      var formals = ruleRecipe[3];
      var body = self.fromRecipe(ruleRecipe[4]);
      if (gDecl.interval && metaInfo && metaInfo.sourceInterval) {
        body.definitionInterval = new Interval(gDecl.interval.inputStream,
          metaInfo.sourceInterval[0], metaInfo.sourceInterval[1]);
      }

      gDecl[action](ruleName, formals, body, optDescription);
    });
    this.currentDecl = null;
    return gDecl.build();
  },

  terminal: function(x) {
    return new pexprs.Terminal(x);
  },

  range: function(from, to) {
    return new pexprs.Range(from, to);
  },

  param: function(index) {
    return new pexprs.Param(index);
  },

  alt: function(/* term1, term1, ... */) {
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },

  seq: function(/* factor1, factor2, ... */) {
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },

  star: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Star(expr);
  },

  plus: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Plus(expr);
  },

  opt: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Opt(expr);
  },

  not: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Not(expr);
  },

  la: function(expr) {
    // TODO: temporary to still be able to read old recipes
    return this.lookahead(expr);
  },

  lookahead: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lookahead(expr);
  },

  lex: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lex(expr);
  },

  app: function(ruleName, optParams) {
    if (optParams && optParams.length > 0) {
      optParams = optParams.map(function(param) {
        return param instanceof pexprs.PExpr ? param :
          this.fromRecipe(param);
      }, this);
    }
    return new pexprs.Apply(ruleName, optParams);
  },

  fromRecipe: function(recipe) {
    // the meta-info of 'grammar' is proccessed in Builder.grammar
    var result = this[recipe[0]].apply(this,
      recipe[0] === 'grammar' ? recipe.slice(1) : recipe.slice(2));

    var metaInfo = recipe[1];
    if (metaInfo) {
      if (metaInfo.sourceInterval && this.currentDecl) {
        result.withInterval(
          this.currentDecl.sourceInterval.apply(this.currentDecl, metaInfo.sourceInterval)
        );
      }
    }
    return result;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;

},{"./GrammarDecl":30,"./Interval":32,"./pexprs":58}],28:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

/*
  `Failure`s represent expressions that weren't matched while parsing. They are used to generate
  error messages automatically. The interface of `Failure`s includes the collowing methods:

  - getText() : String
  - getType() : String  (one of {"description", "string", "code"})
  - isDescription() : bool
  - isStringTerminal() : bool
  - isCode() : bool
  - isFluffy() : bool
  - makeFluffy() : void
  - subsumes(Failure) : bool
*/

function isValidType(type) {
  return type === 'description' || type === 'string' || type === 'code';
}

function Failure(pexpr, text, type) {
  if (!isValidType(type)) {
    throw new Error('invalid Failure type: ' + type);
  }
  this.pexpr = pexpr;
  this.text = text;
  this.type = type;
  this.fluffy = false;
}

Failure.prototype.getPExpr = function() {
  return this.pexpr;
};

Failure.prototype.getText = function() {
  return this.text;
};

Failure.prototype.getType = function() {
  return this.type;
};

Failure.prototype.isDescription = function() {
  return this.type === 'description';
};

Failure.prototype.isStringTerminal = function() {
  return this.type === 'string';
};

Failure.prototype.isCode = function() {
  return this.type === 'code';
};

Failure.prototype.isFluffy = function() {
  return this.fluffy;
};

Failure.prototype.makeFluffy = function() {
  this.fluffy = true;
};

Failure.prototype.clearFluffy = function() {
  this.fluffy = false;
};

Failure.prototype.subsumes = function(that) {
  return this.getText() === that.getText() &&
      this.type === that.type &&
      (!this.isFluffy() || this.isFluffy() && that.isFluffy());
};

Failure.prototype.toString = function() {
  return this.type === 'string' ?
    JSON.stringify(this.getText()) :
    this.getText();
};

Failure.prototype.clone = function() {
  var failure = new Failure(this.pexpr, this.text, this.type);
  if (this.isFluffy()) {
    failure.makeFluffy();
  }
  return failure;
};

Failure.prototype.toKey = function() {
  return this.toString() + '#' + this.type;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Failure;

},{}],29:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var MatchResult = require('./MatchResult');
var Semantics = require('./Semantics');
var State = require('./State');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Grammar(
    name,
    superGrammar,
    ruleBodies,
    ruleFormals,
    ruleDescriptions,
    optDefaultStartRule) {
  this.name = name;
  this.superGrammar = superGrammar;
  this.ruleBodies = ruleBodies;
  this.ruleFormals = ruleFormals;
  this.ruleDescriptions = ruleDescriptions;
  if (optDefaultStartRule) {
    if (!(optDefaultStartRule in ruleBodies)) {
      throw new Error("Invalid start rule: '" + optDefaultStartRule +
                      "' is not a rule in grammar '" + name + "'");
    }
    this.defaultStartRule = optDefaultStartRule;
  }
}

var ohmGrammar;
var buildGrammar;

// This method is called from main.js once Ohm has loaded.
Grammar.initApplicationParser = function(grammar, builderFn) {
  ohmGrammar = grammar;
  buildGrammar = builderFn;
};

Grammar.prototype = {
  // Return true if the grammar is a built-in grammar, otherwise false.
  // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
  isBuiltIn: function() {
    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
  },

  _match: function(input, opts) {
    var state = new State(this, input, opts);
    state.evalFromStart();
    return state;
  },

  match: function(input, optStartApplication) {
    var state = this._match(input, {startApplication: optStartApplication});
    return MatchResult.newFor(state);
  },

  trace: function(input, optStartApplication) {
    var state = this._match(input, {startApplication: optStartApplication, trace: true});

    // The trace node for the start rule is always the last entry. If it is a syntactic rule,
    // the first entry is for an application of 'spaces'.
    // TODO(pdubroy): Clean this up by introducing a special `Match<startAppl>` rule, which will
    // ensure that there is always a single root trace node.
    var rootTrace = state.trace[state.trace.length - 1];
    rootTrace.state = state;
    rootTrace.result = MatchResult.newFor(state);
    return rootTrace;
  },

  semantics: function() {
    return Semantics.createSemantics(this);
  },

  extendSemantics: function(superSemantics) {
    return Semantics.createSemantics(this, superSemantics._getSemantics());
  },

  // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
  // a function of the correct arity. If not, throw an exception.
  _checkTopDownActionDict: function(what, name, actionDict) {
    function isSpecialAction(a) {
      return a === '_iter' || a === '_terminal' || a === '_nonterminal' || a === '_default';
    }

    var problems = [];
    for (var k in actionDict) {
      var v = actionDict[k];
      if (!isSpecialAction(k) && !(k in this.ruleBodies)) {
        problems.push("'" + k + "' is not a valid semantic action for '" + this.name + "'");
      } else if (typeof v !== 'function') {
        problems.push(
            "'" + k + "' must be a function in an action dictionary for '" + this.name + "'");
      } else {
        var actual = v.length;
        var expected = this._topDownActionArity(k);
        if (actual !== expected) {
          problems.push(
              "Semantic action '" + k + "' has the wrong arity: " +
              'expected ' + expected + ', got ' + actual);
        }
      }
    }
    if (problems.length > 0) {
      var prettyProblems = problems.map(function(problem) { return '- ' + problem; });
      var error = new Error(
          "Found errors in the action dictionary of the '" + name + "' " + what + ':\n' +
          prettyProblems.join('\n'));
      error.problems = problems;
      throw error;
    }
  },

  // Return the expected arity for a semantic action named `actionName`, which
  // is either a rule name or a special action name like '_nonterminal'.
  _topDownActionArity: function(actionName) {
    if (actionName === '_iter' || actionName === '_nonterminal' || actionName === '_default') {
      return 1;
    } else if (actionName === '_terminal') {
      return 0;
    }
    return this.ruleBodies[actionName].getArity();
  },

  _inheritsFrom: function(grammar) {
    var g = this.superGrammar;
    while (g) {
      if (g === grammar) {
        return true;
      }
      g = g.superGrammar;
    }
    return false;
  },

  toRecipe: function(optVarName) {
    var metaInfo = {};
    // Include the grammar source if it is available.
    if (this.definitionInterval) {
      metaInfo.source = this.definitionInterval.contents;
    }

    var superGrammar = null;
    if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
      superGrammar = JSON.parse(this.superGrammar.toRecipe());
    }

    var startRule = null;
    if (this.defaultStartRule) {
      startRule = this.defaultStartRule;
    }

    var rules = {};
    var self = this;
    Object.keys(this.ruleBodies).forEach(function(ruleName) {
      var body = self.ruleBodies[ruleName];
      var isDefinition = !self.superGrammar || !self.superGrammar.ruleBodies[ruleName];

      var operation;
      if (isDefinition) {
        operation = 'define';
      } else {
        operation = body instanceof pexprs.Extend ? 'extend' : 'override';
      }

      var metaInfo = {};
      if (body.definitionInterval && self.definitionInterval) {
        var adjusted = body.definitionInterval.relativeTo(self.definitionInterval);
        metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
      }

      var description = null;
      if (isDefinition && self.ruleDescriptions[ruleName]) {
        description = self.ruleDescriptions[ruleName];
      }

      var formals = self.ruleFormals[ruleName];
      var ruleBody = body.outputRecipe(formals, self.definitionInterval);

      rules[ruleName] = [
        operation, // "define"/"extend"/"override"
        metaInfo,
        description,
        formals,
        ruleBody
      ];
    });

    return JSON.stringify([
      'grammar',
      metaInfo,
      this.name,
      superGrammar,
      startRule,
      rules
    ]);
  },

  // TODO: Come up with better names for these methods.
  // TODO: Write the analog of these methods for inherited attributes.
  toOperationActionDictionaryTemplate: function() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },
  toAttributeActionDictionaryTemplate: function() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },

  _toOperationOrAttributeActionDictionaryTemplate: function() {
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
    // should appear next to other cases of AddExpr.

    var sb = new common.StringBuffer();
    sb.append('{');

    var first = true;
    for (var ruleName in this.ruleBodies) {
      var body = this.ruleBodies[ruleName];
      if (first) {
        first = false;
      } else {
        sb.append(',');
      }
      sb.append('\n');
      sb.append('  ');
      this.addSemanticActionTemplate(ruleName, body, sb);
    }

    sb.append('\n}');
    return sb.contents();
  },

  addSemanticActionTemplate: function(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(': function(');
    var arity = this._topDownActionArity(ruleName);
    sb.append(common.repeat('_', arity).join(', '));
    sb.append(') {\n');
    sb.append('  }');
  },

  // Parse a string which expresses a rule application in this grammar, and return the
  // resulting Apply node.
  parseApplication: function(str) {
    var app;
    if (str.indexOf('<') === -1) {
      // simple application
      app = new pexprs.Apply(str);
    } else {
      // parameterized application
      var cst = ohmGrammar.match(str, 'Base_application');
      app = buildGrammar(cst, {});
    }

    // Ensure that the application is valid.
    if (!(app.ruleName in this.ruleBodies)) {
      throw errors.undeclaredRule(app.ruleName, this.name);
    } else if (this.ruleFormals[app.ruleName].length !== app.args.length) {
      throw errors.wrongNumberOfParameters(
          app.ruleName, this.ruleFormals[app.ruleName].length, app.args.length);
    }
    return app;
  }
};

// The following grammar contains a few rules that couldn't be written  in "userland".
// At the bottom of src/main.js, we create a sub-grammar of this grammar that's called
// `BuiltInRules`. That grammar contains several convenience rules, e.g., `letter` and
// `digit`, and is implicitly the super-grammar of any grammar whose super-grammar
// isn't specified.
Grammar.ProtoBuiltInRules = new Grammar(
    'ProtoBuiltInRules',  // name
    undefined,  // supergrammar

    // rule bodies
    {
      // The following rules can't be written in userland because they reference
      // `any` and `end` directly.
      any: pexprs.any,
      end: pexprs.end,

      // The following rule is invoked implicitly by syntactic rules to skip spaces.
      spaces: new pexprs.Star(new pexprs.Apply('space')),

      // The `space` rule must be defined here because it's referenced by `spaces`.
      space: new pexprs.Range('\x00', ' '),

      // These rules are implemented natively because they use UnicodeChar directly, which is
      // not part of the Ohm grammar.
      lower: new pexprs.UnicodeChar('Ll'),
      upper: new pexprs.UnicodeChar('Lu'),

      // The union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not
      // in Ll or Lu.
      unicodeLtmo: new pexprs.UnicodeChar('Ltmo')
    },

    // rule formal arguments
    {
      any: [],
      end: [],
      spaces: [],
      space: [],
      lower: [],
      upper: [],
      unicodeLtmo: []
    },

    // rule descriptions
    {
      any: 'any object',
      end: 'end of input',
      space: 'a space',
      lower: 'a lowercase letter',
      upper: 'an uppercase letter'
    }
);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;

},{"./MatchResult":33,"./Semantics":36,"./State":37,"./common":39,"./errors":40,"./pexprs":58}],30:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = require('./Grammar');
var InputStream = require('./InputStream');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Constructors

function GrammarDecl(name) {
  this.name = name;
}

// Helpers

GrammarDecl.prototype.sourceInterval = function(startIdx, endIdx) {
  var inputStream = this.interval.inputStream;
  return inputStream.interval(startIdx, endIdx);
};

GrammarDecl.prototype.ensureSuperGrammar = function() {
  if (!this.superGrammar) {
    this.withSuperGrammar(
        // TODO: The conditional expression below is an ugly hack. It's kind of ok because
        // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
        // we should try to find a better way to do this.
        this.name === 'BuiltInRules' ?
            Grammar.ProtoBuiltInRules :
            Grammar.BuiltInRules);
  }
  return this.superGrammar;
};

GrammarDecl.prototype.installOverriddenOrExtendedRule = function(name, formals, body) {
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, body);
  }
  var expectedFormals = this.ensureSuperGrammar().ruleFormals[name];
  var expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
  if (formals.length !== expectedNumFormals) {
    throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, body);
  }
  return this.install(name, formals, body);
};

GrammarDecl.prototype.install = function(name, formals, body, optDescription) {
  body = body.introduceParams(formals);
  this.ruleFormals[name] = formals;
  if (optDescription) {
    this.ruleDescriptions[name] = optDescription;
  }
  this.ruleBodies[name] = body;
  return this;
};

// Stuff that you should only do once

GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
  if (this.superGrammar) {
    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
  }
  this.superGrammar = superGrammar;
  this.ruleBodies = Object.create(superGrammar.ruleBodies);
  this.ruleFormals = Object.create(superGrammar.ruleFormals);
  this.ruleDescriptions = Object.create(superGrammar.ruleDescriptions);

  // Grammars with an explicit supergrammar inherit a default start rule.
  if (!superGrammar.isBuiltIn()) {
    this.defaultStartRule = superGrammar.defaultStartRule;
  }
  return this;
};

GrammarDecl.prototype.withDefaultStartRule = function(ruleName) {
  this.defaultStartRule = ruleName;
  return this;
};

GrammarDecl.prototype.withSource = function(source) {
  this.interval = new InputStream(source).interval(0, source.length);
  return this;
};

// Creates a Grammar instance, and if it passes the sanity checks, returns it.
GrammarDecl.prototype.build = function() {
  var grammar = new Grammar(
      this.name,
      this.ensureSuperGrammar(),
      this.ruleBodies,
      this.ruleFormals,
      this.ruleDescriptions,
      this.defaultStartRule);
  // TODO: change the pexpr.prototype.assert... methods to make them add
  // exceptions to an array that's provided as an arg. Then we'll be able to
  // show more than one error of the same type at a time.
  // TODO: include the offending pexpr in the errors, that way we can show
  // the part of the source that caused it.
  var grammarErrors = [];
  var grammarHasInvalidApplications = false;
  Object.keys(grammar.ruleBodies).forEach(function(ruleName) {
    var body = grammar.ruleBodies[ruleName];
    try {
      body.assertChoicesHaveUniformArity(ruleName);
    } catch (e) {
      grammarErrors.push(e);
    }
    try {
      body.assertAllApplicationsAreValid(ruleName, grammar);
    } catch (e) {
      grammarErrors.push(e);
      grammarHasInvalidApplications = true;
    }
  });
  if (!grammarHasInvalidApplications) {
    // The following check can only be done if the grammar has no invalid applications.
    Object.keys(grammar.ruleBodies).forEach(function(ruleName) {
      var body = grammar.ruleBodies[ruleName];
      try {
        body.assertIteratedExprsAreNotNullable(grammar, ruleName);
      } catch (e) {
        grammarErrors.push(e);
      }
    });
  }
  if (grammarErrors.length > 0) {
    errors.throwErrors(grammarErrors);
  }
  if (this.interval) {
    grammar.definitionInterval = this.interval;
  }

  return grammar;
};

// Rule declarations

GrammarDecl.prototype.define = function(name, formals, body, optDescr) {
  this.ensureSuperGrammar();
  if (this.superGrammar.ruleBodies[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, body);
  } else if (this.ruleBodies[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.name, body);
  }
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, body);
  }
  return this.install(name, formals, body, optDescr);
};

GrammarDecl.prototype.override = function(name, formals, body) {
  var baseRule = this.ensureSuperGrammar().ruleBodies[name];
  if (!baseRule) {
    throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, body);
  }
  this.installOverriddenOrExtendedRule(name, formals, body);
  return this;
};

GrammarDecl.prototype.extend = function(name, formals, fragment) {
  var baseRule = this.ensureSuperGrammar().ruleBodies[name];
  if (!baseRule) {
    throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, fragment);
  }
  var body = new pexprs.Extend(this.superGrammar, name, fragment);
  body.interval = fragment.interval;
  body.definitionInterval = fragment.definitionInterval;
  this.installOverriddenOrExtendedRule(name, formals, body);
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = GrammarDecl;

},{"./Grammar":29,"./InputStream":31,"./common":39,"./errors":40,"./pexprs":58}],31:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream(source) {
  this.source = source;
  this.pos = 0;
  this.posInfos = [];
}

InputStream.prototype = {
  atEnd: function() {
    return this.pos === this.source.length;
  },

  next: function() {
    return this.source[this.pos++];
  },

  matchString: function(s) {
    for (var idx = 0; idx < s.length; idx++) {
      if (this.next() !== s[idx]) {
        return false;
      }
    }
    return true;
  },

  sourceSlice: function(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  interval: function(startIdx, optEndIdx) {
    return new Interval(this, startIdx, optEndIdx ? optEndIdx : this.pos);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;

},{"./Interval":32}],32:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var assert = require('./common').assert;
var errors = require('./errors');
var util = require('./util');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(inputStream, startIdx, endIdx) {
  this.inputStream = inputStream;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Interval.coverage = function(/* interval1, interval2, ... */) {
  var inputStream = arguments[0].inputStream;
  var startIdx = arguments[0].startIdx;
  var endIdx = arguments[0].endIdx;
  for (var idx = 1; idx < arguments.length; idx++) {
    var interval = arguments[idx];
    if (interval.inputStream !== inputStream) {
      throw errors.intervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, arguments[idx].startIdx);
      endIdx = Math.max(endIdx, arguments[idx].endIdx);
    }
  }
  return new Interval(inputStream, startIdx, endIdx);
};

Interval.prototype = {
  coverageWith: function(/* interval1, interval2, ... */) {
    var intervals = Array.prototype.slice.call(arguments);
    intervals.push(this);
    return Interval.coverage.apply(undefined, intervals);
  },

  collapsedLeft: function() {
    return new Interval(this.inputStream, this.startIdx, this.startIdx);
  },

  collapsedRight: function() {
    return new Interval(this.inputStream, this.endIdx, this.endIdx);
  },

  getLineAndColumnMessage: function() {
    var range = [this.startIdx, this.endIdx];
    return util.getLineAndColumnMessage(this.inputStream.source, this.startIdx, range);
  },

  // Returns an array of 0, 1, or 2 intervals that represents the result of the
  // interval difference operation.
  minus: function(that) {
    if (this.inputStream !== that.inputStream) {
      throw errors.intervalSourcesDontMatch();
    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
      // `this` and `that` are the same interval!
      return [
      ];
    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
      // `that` splits `this` into two intervals
      return [
        new Interval(this.inputStream, this.startIdx, that.startIdx),
        new Interval(this.inputStream, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
      // `that` contains a prefix of `this`
      return [
        new Interval(this.inputStream, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
      // `that` contains a suffix of `this`
      return [
        new Interval(this.inputStream, this.startIdx, that.startIdx)
      ];
    } else {
      // `that` and `this` do not overlap
      return [
        this
      ];
    }
  },

  // Returns a new Interval that has the same extent as this one, but which is relative
  // to `that`, an Interval that fully covers this one.
  relativeTo: function(that, newInputStream) {
    if (this.inputStream !== that.inputStream) {
      throw errors.intervalSourcesDontMatch();
    }
    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx,
           'other interval does not cover this one');
    return new Interval(newInputStream,
                        this.startIdx - that.startIdx,
                        this.endIdx - that.startIdx);
  },

  // Returns a new Interval which contains the same contents as this one,
  // but with whitespace trimmed from both ends. (This only makes sense when
  // the input stream is a string.)
  trimmed: function() {
    var contents = this.contents;
    var startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    var endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.inputStream, startIdx, endIdx);
  }
};

Object.defineProperties(Interval.prototype, {
  contents: {
    get: function() {
      if (this._contents === undefined) {
        this._contents = this.inputStream.sourceSlice(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;


},{"./common":39,"./errors":40,"./util":59}],33:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var inherits = require('inherits');

var common = require('./common');
var nodes = require('./nodes');
var util = require('./util');
var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Create a short error message for an error that occurred during matching.
function getShortMatchErrorMessage(pos, source, detail) {
  var errorInfo = util.getLineAndColumn(source, pos);
  return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
}

// ----------------- MatchFailure -----------------

function MatchResult(state) {
  this.state = state;
  this._cst = state.bindings[0];
}

MatchResult.newFor = function(state) {
  var succeeded = state.bindings.length > 0;
  return succeeded ? new MatchResult(state) : new MatchFailure(state);
};

MatchResult.prototype.failed = function() {
  return false;
};

MatchResult.prototype.succeeded = function() {
  return !this.failed();
};

// Returns a `MatchResult` that can be fed into operations or attributes that care
// about the whitespace that was implicitly skipped over by syntactic rules. This
// is useful for doing things with comments, e.g., syntax highlighting.
MatchResult.prototype.getDiscardedSpaces = function() {
  if (this.failed()) {
    return [];
  }

  var state = this.state;
  var grammar = state.grammar;
  var inputStream = state.inputStream;

  var intervals = [new Interval(inputStream, 0, inputStream.source.length)];

  // Subtract the interval of each terminal from the set of intervals above.
  var s = grammar.semantics().addOperation('subtractTerminals', {
    _nonterminal: function(children) {
      children.forEach(function(child) {
        child.subtractTerminals();
      });
    },
    _terminal: function() {
      var t = this;
      intervals = intervals.
          map(function(interval) { return interval.minus(t.interval); }).
          reduce(function(xs, ys) { return xs.concat(ys); }, []);
    }
  });
  s(this).subtractTerminals();

  // Now `intervals` holds the intervals of the input stream that were skipped over by syntactic
  // rules, because they contained spaces.

  // Next, we want to match the contents of each of those intervals with the grammar's `spaces`
  // rule, to reconstruct the CST nodes that were discarded by syntactic rules. But if we simply
  // pass each interval's `contents` to the grammar's `match` method, the resulting nodes and
  // their children will have intervals that are associated with a different input, i.e., a
  // substring of the original input. The following operation will fix this problem for us.
  s.addOperation('fixIntervals(idxOffset)', {
    _default: function(children) {
      var idxOffset = this.args.idxOffset;
      this.interval.inputStream = inputStream;
      this.interval.startIdx += idxOffset;
      this.interval.endIdx += idxOffset;
      if (!this.isTerminal()) {
        children.forEach(function(child) {
          child.fixIntervals(idxOffset);
        });
      }
    }
  });

  // Now we're finally ready to reconstruct the discarded CST nodes.
  var discardedNodes = intervals.map(function(interval) {
    var r = grammar.match(interval.contents, 'spaces');
    s(r).fixIntervals(interval.startIdx);
    return r._cst;
  });

  // Rather than return a bunch of CST nodes and make the caller of this method loop over them,
  // we can construct a single CST node that is the parent of all of the discarded nodes. An
  // `IterationNode` is the obvious choice for this.
  discardedNodes = new nodes.IterationNode(
      grammar,
      discardedNodes,
      discardedNodes.length === 0 ?
          new Interval(inputStream, 0, 0) :
          new Interval(
              inputStream,
              discardedNodes[0].interval.startIdx,
              discardedNodes[discardedNodes.length - 1].interval.endIdx));

  // But remember that a CST node can't be used directly by clients. What we really need to return
  // from this method is a successful `MatchResult` that can be used with the clients' semantics.
  // We already have one -- `this` -- but it's got a different CST node inside. So we create a new
  // object that delegates to `this`, and override its `_cst` property.
  var r = Object.create(this);
  r._cst = discardedNodes;

  // We also override its `getDiscardedSpaces` method, in case someone decides to call it.
  r.getDiscardedSpaces = function() { return r; };

  return r;
};

// ----------------- MatchFailure -----------------

function MatchFailure(state) {
  this.state = state;
  common.defineLazyProperty(this, '_failures', function() {
    return this.state.getFailures();
  });
  common.defineLazyProperty(this, 'message', function() {
    var source = this.state.inputStream.source;
    if (typeof source !== 'string') {
      return 'match failed at position ' + this.getRightmostFailurePosition();
    }

    var detail = 'Expected ' + this.getExpectedText();
    return util.getLineAndColumnMessage(source, this.getRightmostFailurePosition()) + detail;
  });
  common.defineLazyProperty(this, 'shortMessage', function() {
    if (typeof this.state.inputStream.source !== 'string') {
      return 'match failed at position ' + this.getRightmostFailurePosition();
    }
    var detail = 'expected ' + this.getExpectedText();
    return getShortMatchErrorMessage(
        this.getRightmostFailurePosition(),
        this.state.inputStream.source,
        detail);
  });
}
inherits(MatchFailure, MatchResult);

MatchFailure.prototype.toString = function() {
  return '[MatchFailure at position ' + this.getRightmostFailurePosition() + ']';
};

MatchFailure.prototype.failed = function() {
  return true;
};

MatchFailure.prototype.getRightmostFailurePosition = function() {
  return this.state.getRightmostFailurePosition();
};

MatchFailure.prototype.getRightmostFailures = function() {
  return this._failures;
};

// Return a string summarizing the expected contents of the input stream when
// the match failure occurred.
MatchFailure.prototype.getExpectedText = function() {
  var sb = new common.StringBuffer();
  var failures = this.getRightmostFailures();

  // Filter out the fluffy failures to make the default error messages more useful
  failures = failures.filter(function(failure) {
    return !failure.isFluffy();
  });

  for (var idx = 0; idx < failures.length; idx++) {
    if (idx > 0) {
      if (idx === failures.length - 1) {
        sb.append((failures.length > 2 ? ', or ' : ' or '));
      } else {
        sb.append(', ');
      }
    }
    sb.append(failures[idx].toString());
  }
  return sb.contents();
};

MatchFailure.prototype.getInterval = function() {
  var pos = this.state.getRightmostFailurePosition();
  return new Interval(this.state.inputStream, pos, pos);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchResult;

},{"./Interval":32,"./common":39,"./nodes":42,"./util":59,"inherits":24}],34:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Namespace() {
}
Namespace.prototype = Object.create(null);

Namespace.asNamespace = function(objOrNamespace) {
  if (objOrNamespace instanceof Namespace) {
    return objOrNamespace;
  }
  return Namespace.createNamespace(objOrNamespace);
};

// Create a new namespace. If `optProps` is specified, all of its properties
// will be copied to the new namespace.
Namespace.createNamespace = function(optProps) {
  return Namespace.extend(Namespace.prototype, optProps);
};

// Create a new namespace which extends another namespace. If `optProps` is
// specified, all of its properties will be copied to the new namespace.
Namespace.extend = function(namespace, optProps) {
  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
    throw new TypeError('not a Namespace object: ' + namespace);
  }
  var ns = Object.create(namespace, {
    constructor: {
      value: Namespace,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return extend(ns, optProps);
};

// TODO: Should this be a regular method?
Namespace.toString = function(ns) {
  return Object.prototype.toString.call(ns);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;

},{"util-extend":26}],35:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo(state) {
  this.state = state;
  this.applicationMemoKeyStack = [];  // a stack of "memo keys" of the active applications
  this.memo = {};
  this.currentLeftRecursion = undefined;
}

PosInfo.prototype = {
  isActive: function(application) {
    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
  },

  enter: function(application) {
    this.state.enter(application);
    this.applicationMemoKeyStack.push(application.toMemoKey());
  },

  exit: function() {
    this.state.exit();
    this.applicationMemoKeyStack.pop();
  },

  startLeftRecursion: function(headApplication, memoRec) {
    memoRec.isLeftRecursion = true;
    memoRec.headApplication = headApplication;
    memoRec.nextLeftRecursion = this.currentLeftRecursion;
    this.currentLeftRecursion = memoRec;

    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    var indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
    var involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);

    memoRec.isInvolved = function(applicationMemoKey) {
      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
    };

    memoRec.updateInvolvedApplicationMemoKeys = function() {
      for (var idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
        var applicationMemoKey = applicationMemoKeyStack[idx];
        if (!this.isInvolved(applicationMemoKey)) {
          involvedApplicationMemoKeys.push(applicationMemoKey);
        }
      }
    };
  },

  endLeftRecursion: function() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  },

  // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
  // the memoized result (which starts out being a failure) is always used.
  shouldUseMemoizedResult: function(memoRec) {
    if (!memoRec.isLeftRecursion) {
      return true;
    }
    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    for (var idx = 0; idx < applicationMemoKeyStack.length; idx++) {
      var applicationMemoKey = applicationMemoKeyStack[idx];
      if (memoRec.isInvolved(applicationMemoKey)) {
        return false;
      }
    }
    return true;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;

},{}],36:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Symbol = require('es6-symbol');  // eslint-disable-line no-undef
var inherits = require('inherits');

var MatchResult = require('./MatchResult');
var IterationNode = require('./nodes').IterationNode;
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// ----------------- Wrappers -----------------

// Wrappers decorate CST nodes with all of the functionality (i.e., operations and attributes)
// provided by a Semantics (see below). `Wrapper` is the abstract superclass of all wrappers. A
// `Wrapper` must have `_node` and `_semantics` instance variables, which refer to the CST node and
// Semantics (resp.) for which it was created, and a `_childWrappers` instance variable which is
// used to cache the wrapper instances that are created for its child nodes. Setting these instance
// variables is the responsibility of the constructor of each Semantics-specific subclass of
// `Wrapper`.
function Wrapper() {}

Wrapper.prototype.toString = function() {
  return '[semantics wrapper for ' + this._node.grammar.name + ']';
};

Wrapper.prototype._forgetMemoizedResultFor = function(attributeName) {
  // Remove the memoized attribute from the cstNode and all its children.
  delete this._node[this._semantics.attributeKeys[attributeName]];
  this.children.forEach(function(child) {
    child._forgetMemoizedResultFor(attributeName);
  });
};

// Returns the wrapper of the specified child node. Child wrappers are created lazily and cached in
// the parent wrapper's `_childWrappers` instance variable.
Wrapper.prototype.child = function(idx) {
  if (!(0 <= idx && idx < this._node.numChildren())) {
    // TODO: Consider throwing an exception here.
    return undefined;
  }
  var childWrapper = this._childWrappers[idx];
  if (!childWrapper) {
    childWrapper = this._childWrappers[idx] = this._semantics.wrap(this._node.childAt(idx));
  }
  return childWrapper;
};

// Returns an array containing the wrappers of all of the children of the node associated with this
// wrapper.
Wrapper.prototype._children = function() {
  // Force the creation of all child wrappers
  for (var idx = 0; idx < this._node.numChildren(); idx++) {
    this.child(idx);
  }
  return this._childWrappers;
};

// Returns `true` if the CST node associated with this wrapper corresponds to an iteration
// expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
Wrapper.prototype.isIteration = function() {
  return this._node.isIteration();
};

// Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
// otherwise.
Wrapper.prototype.isTerminal = function() {
  return this._node.isTerminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
// otherwise.
Wrapper.prototype.isNonterminal = function() {
  return this._node.isNonterminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a syntactic rule, `false` otherwise.
Wrapper.prototype.isSyntactic = function() {
  return this.isNonterminal() && this._node.isSyntactic();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a lexical rule, `false` otherwise.
Wrapper.prototype.isLexical = function() {
  return this.isNonterminal() && this._node.isLexical();
};

// Returns `true` if the CST node associated with this wrapper is an iterator node
// having either one or no child (? operator), `false` otherwise.
// Otherwise, throws an exception.
Wrapper.prototype.isOptional = function() {
  return this._node.isOptional();
};

// Create a new IterationNode in the same semantics as this wrapper.
Wrapper.prototype.iteration = function(optElements) {
  var iter = new IterationNode(this._node.grammar, optElements || [], this.interval, false);
  return this._semantics.wrap(iter);
};

Object.defineProperties(Wrapper.prototype, {
  // Returns an array containing the children of this CST node.
  children: {get: function() { return this._children(); }},

  // Returns the name of grammar rule that created this CST node.
  ctorName: {get: function() { return this._node.ctorName; }},

  // Returns the interval consumed by the CST node associated with this wrapper.
  interval: {get: function() { return this._node.interval; }},

  // Returns the number of children of this CST node.
  numChildren: {get: function() { return this._node.numChildren(); }},

  // Returns the primitive value of this CST node, if it's a terminal node. Otherwise,
  // throws an exception.
  primitiveValue: {
    get: function() {
      if (this.isTerminal()) {
        return this._node.primitiveValue;
      }
      throw new TypeError(
          "tried to access the 'primitiveValue' attribute of a non-terminal CST node");
    }
  }
});

// ----------------- Semantics -----------------

// A Semantics is a container for a family of Operations and Attributes for a given grammar.
// Semantics enable modularity (different clients of a grammar can create their set of operations
// and attributes in isolation) and extensibility even when operations and attributes are mutually-
// recursive. This constructor should not be called directly except from
// `Semantics.createSemantics`. The normal ways to create a Semantics, given a grammar 'g', are
// `g.semantics()` and `g.extendSemantics(parentSemantics)`.
function Semantics(grammar, superSemantics) {
  var self = this;
  this.grammar = grammar;
  this.checkedActionDicts = false;

  // Constructor for wrapper instances, which are passed as the arguments to the semantic actions
  // of an operation or attribute. Operations and attributes require double dispatch: the semantic
  // action is chosen based on both the node's type and the semantics. Wrappers ensure that
  // the `execute` method is called with the correct (most specific) semantics object as an
  // argument.
  this.Wrapper = function(node) {
    self.checkActionDictsIfHaventAlready();
    this._semantics = self;
    this._node = node;
    this._childWrappers = [];
  };

  this.super = superSemantics;
  if (superSemantics) {
    if (grammar !== this.super.grammar && !grammar._inheritsFrom(this.super.grammar)) {
      throw new Error(
          "Cannot extend a semantics for grammar '" + this.super.grammar.name +
          "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
    }
    inherits(this.Wrapper, this.super.Wrapper);
    this.operations = Object.create(this.super.operations);
    this.attributes = Object.create(this.super.attributes);
    this.attributeKeys = Object.create(null);

    // Assign unique symbols for each of the attributes inherited from the super-semantics so that
    // they are memoized independently.
    for (var attributeName in this.attributes) {
      this.attributeKeys[attributeName] = Symbol();
    }
  } else {
    inherits(this.Wrapper, Wrapper);
    this.operations = Object.create(null);
    this.attributes = Object.create(null);
    this.attributeKeys = Object.create(null);
  }
}

Semantics.prototype.toString = function() {
  return '[semantics for ' + this.grammar.name + ']';
};

Semantics.prototype.checkActionDictsIfHaventAlready = function() {
  if (!this.checkedActionDicts) {
    this.checkActionDicts();
    this.checkedActionDicts = true;
  }
};

// Checks that the action dictionaries for all operations and attributes in this semantics,
// including the ones that were inherited from the super-semantics, agree with the grammar.
// Throws an exception if one or more of them doesn't.
Semantics.prototype.checkActionDicts = function() {
  for (var name in this.operations) {
    this.operations[name].checkActionDict(this.grammar);
  }
  for (name in this.attributes) {
    this.attributes[name].checkActionDict(this.grammar);
  }
};

Semantics.prototype.toRecipe = function(semanticsOnly) {
  function hasSuperSemantics(s) {
    return s.super !== Semantics.BuiltInSemantics._getSemantics();
  }

  var str = '(function(g) {\n';
  if (hasSuperSemantics(this)) {
    str += '  var semantics = ' + this.super.toRecipe(true) + '(g';

    var superSemanticsGrammar = this.super.grammar;
    var relatedGrammar = this.grammar;
    while (relatedGrammar !== superSemanticsGrammar) {
      str += '.superGrammar';
      relatedGrammar = relatedGrammar.superGrammar;
    }

    str += ');\n';
    str += '  return g.extendSemantics(semantics)';
  } else {
    str += '  return g.semantics()';
  }
  ['Operation', 'Attribute'].forEach(function(type) {
    var semanticOperations = this[type.toLowerCase() + 's'];
    Object.keys(semanticOperations).forEach(function(name) {
      var signature = name;
      if (semanticOperations[name].formals.length > 0) {
        signature += '(' + semanticOperations[name].formals.join(', ') + ')';
      }

      var method;
      if (hasSuperSemantics(this) && this.super[type.toLowerCase() + 's'][name]) {
        method = 'extend' + type;
      } else {
        method = 'add' + type;
      }
      str += '\n    .' + method + '(' + JSON.stringify(signature) + ', {';

      var actions = semanticOperations[name].actionDict;
      var srcArray = [];
      Object.keys(actions).forEach(function(actionName) {
        if (semanticOperations[name].builtInDefault !== actions[actionName]) {
          srcArray.push('\n      ' + JSON.stringify(actionName) + ': ' +
            actions[actionName].toString());
        }
      });
      str += srcArray.join(',');

      str += '\n    })';
    }, this);
  }, this);
  str += ';\n  })';

  if (!semanticsOnly) {
    str =
      '(function() {\n' +
      '  var grammar = this.fromRecipe(' + this.grammar.toRecipe() + ');\n' +
      '  var semantics = ' + str + '(grammar);\n' +
      '  return semantics;\n' +
      '});\n';
  }

  return str;
};

var prototypeGrammar;
var prototypeGrammarSemantics;

// This method is called from main.js once Ohm has loaded.
Semantics.initPrototypeParser = function(grammar) {
  prototypeGrammarSemantics = grammar.semantics().addOperation('parse', {
    AttributeSignature: function(name) {
      return {
        name: name.parse(),
        formals: []
      };
    },
    OperationSignature: function(name, optFormals) {
      return {
        name: name.parse(),
        formals: optFormals.parse()[0] || []
      };
    },
    Formals: function(oparen, fs, cparen) {
      return fs.asIteration().parse();
    },
    name: function(first, rest) {
      return this.interval.contents;
    }
  });
  prototypeGrammar = grammar;
};

function parseSignature(signature, type) {
  if (!prototypeGrammar) {
    // The Operations and Attributes grammar won't be available while Ohm is loading,
    // but we can get away the following simplification b/c none of the operations
    // that are used while loading take arguments.
    common.assert(signature.indexOf('(') === -1);
    return {
      name: signature,
      formals: []
    };
  }

  var r = prototypeGrammar.match(
      signature,
      type === 'operation' ? 'OperationSignature' : 'AttributeSignature');
  if (r.failed()) {
    throw new Error(r.message);
  }

  return prototypeGrammarSemantics(r).parse();
}

function newDefaultAction(type, name, doIt) {
  return function(children) {
    var self = this;
    var thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
    var args = thisThing.formals.map(function(formal) {
      return self.args[formal];
    });

    if (this.isIteration()) {
      // This CST node corresponds to an iteration expression in the grammar (*, +, or ?). The
      // default behavior is to map this operation or attribute over all of its child nodes.
      return children.map(function(child) { return doIt.apply(child, args); });
    }

    // This CST node corresponds to a non-terminal in the grammar (e.g., AddExpr). The fact that
    // we got here means that this action dictionary doesn't have an action for this particular
    // non-terminal or a generic `_nonterminal` action.
    if (children.length === 1) {
      // As a convenience, if this node only has one child, we just return the result of
      // applying this operation / attribute to the child node.
      return doIt.apply(children[0], args);
    } else {
      // Otherwise, we throw an exception to let the programmer know that we don't know what
      // to do with this node.
      throw new Error(
          'Missing semantic action for ' + this.ctorName + ' in ' + name + ' ' + type);
    }
  };
}

Semantics.prototype.addOperationOrAttribute = function(type, signature, actionDict) {
  var typePlural = type + 's';

  var parsedNameAndFormalArgs = parseSignature(signature, type);
  var name = parsedNameAndFormalArgs.name;
  var formals = parsedNameAndFormalArgs.formals;

  // TODO: check that there are no duplicate formal arguments

  this.assertNewName(name, type);

  // Create the action dictionary for this operation / attribute that contains a `_default` action
  // which defines the default behavior of iteration, terminal, and non-terminal nodes...
  var builtInDefault = newDefaultAction(type, name, doIt);
  var realActionDict = {_default: builtInDefault};
  // ... and add in the actions supplied by the programmer, which may override some or all of the
  // default ones.
  Object.keys(actionDict).forEach(function(name) {
    realActionDict[name] = actionDict[name];
  });

  var entry = type === 'operation' ?
      new Operation(name, formals, realActionDict, builtInDefault) :
      new Attribute(name, realActionDict, builtInDefault);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  entry.checkActionDict(this.grammar);

  this[typePlural][name] = entry;

  function doIt() {
    // Dispatch to most specific version of this operation / attribute -- it may have been
    // overridden by a sub-semantics.
    var thisThing = this._semantics[typePlural][name];

    // Check that the caller passed the correct number of arguments.
    if (arguments.length !== thisThing.formals.length) {
      throw new Error(
          'Invalid number of arguments passed to ' + name + ' ' + type + ' (expected ' +
          thisThing.formals.length + ', got ' + arguments.length + ')');
    }

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    var args = Object.create(null);
    for (var idx = 0; idx < arguments.length; idx++) {
      var formal = thisThing.formals[idx];
      args[formal] = arguments[idx];
    }

    var oldArgs = this.args;
    this.args = args;
    var ans = thisThing.execute(this._semantics, this);
    this.args = oldArgs;
    return ans;
  }

  if (type === 'operation') {
    this.Wrapper.prototype[name] = doIt;
    this.Wrapper.prototype[name].toString = function() {
      return '[' + name + ' operation]';
    };
  } else {
    Object.defineProperty(this.Wrapper.prototype, name, {
        get: doIt,
        configurable: true  // So the property can be deleted.
      });
    this.attributeKeys[name] = Symbol();
  }
};

Semantics.prototype.extendOperationOrAttribute = function(type, name, actionDict) {
  var typePlural = type + 's';

  // Make sure that `name` really is just a name, i.e., that it doesn't also contain formals.
  parseSignature(name, 'attribute');

  if (!(this.super && name in this.super[typePlural])) {
    throw new Error('Cannot extend ' + type + " '" + name +
        "': did not inherit an " + type + ' with that name');
  }
  if (Object.prototype.hasOwnProperty.call(this[typePlural], name)) {
    throw new Error('Cannot extend ' + type + " '" + name + "' again");
  }

  // Create a new operation / attribute whose actionDict delegates to the super operation /
  // attribute's actionDict, and which has all the keys from `inheritedActionDict`.
  var inheritedFormals = this[typePlural][name].formals;
  var inheritedActionDict = this[typePlural][name].actionDict;
  var newActionDict = Object.create(inheritedActionDict);
  Object.keys(actionDict).forEach(function(name) {
    newActionDict[name] = actionDict[name];
  });

  this[typePlural][name] = type === 'operation' ?
      new Operation(name, inheritedFormals, newActionDict) :
      new Attribute(name, newActionDict);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  this[typePlural][name].checkActionDict(this.grammar);
};

Semantics.prototype.assertNewName = function(name, type) {
  if (Wrapper.prototype.hasOwnProperty(name)) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': that's a reserved name");
  }
  if (name in this.operations) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an operation with that name already exists");
  }
  if (name in this.attributes) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an attribute with that name already exists");
  }
};

// Returns a wrapper for the given CST `node` in this semantics.
// If `node` is already a wrapper, returns `node` itself.  // TODO: why is this needed?
Semantics.prototype.wrap = function(node) {
  return node instanceof this.Wrapper ? node : new this.Wrapper(node);
};

// Creates a new Semantics instance for `grammar`, inheriting operations and attributes from
// `optSuperSemantics`, if it is specified. Returns a function that acts as a proxy for the new
// Semantics instance. When that function is invoked with a CST node as an argument, it returns
// a wrapper for that node which gives access to the operations and attributes provided by this
// semantics.
Semantics.createSemantics = function(grammar, optSuperSemantics) {
  var s = new Semantics(
      grammar,
      optSuperSemantics !== undefined ?
          optSuperSemantics :
          Semantics.BuiltInSemantics._getSemantics());

  // To enable clients to invoke a semantics like a function, return a function that acts as a proxy
  // for `s`, which is the real `Semantics` instance.
  var proxy = function ASemantics(matchResult) {
    if (!(matchResult instanceof MatchResult)) {
      throw new TypeError(
          'Semantics expected a MatchResult, but got ' + common.unexpectedObjToString(matchResult));
    }
    if (!matchResult.succeeded()) {
      throw new TypeError(
          'cannot apply Semantics to ' + matchResult.toString());
    }

    var cst = matchResult._cst;
    if (cst.grammar !== grammar) {
      throw new Error(
          "Cannot use a MatchResult from grammar '" + cst.grammar.name +
          "' with a semantics for '" + grammar.name + "'");
    }
    return s.wrap(cst);
  };

  // Forward public methods from the proxy to the semantics instance.
  proxy.addOperation = function(signature, actionDict) {
    s.addOperationOrAttribute.call(s, 'operation', signature, actionDict);
    return proxy;
  };
  proxy.extendOperation = function(name, actionDict) {
    s.extendOperationOrAttribute.call(s, 'operation', name, actionDict);
    return proxy;
  };
  proxy.addAttribute = function(name, actionDict) {
    s.addOperationOrAttribute.call(s, 'attribute', name, actionDict);
    return proxy;
  };
  proxy.extendAttribute = function(name, actionDict) {
    s.extendOperationOrAttribute.call(s, 'attribute', name, actionDict);
    return proxy;
  };
  proxy._getActionDict = function(operationOrAttributeName) {
    var action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
    if (!action) {
      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' +
        'name in this semantics for "' + grammar.name + '"');
    }
    return action.actionDict;
  };
  proxy._remove = function(operationOrAttributeName) {
    var semantic;
    if (operationOrAttributeName in s.operations) {
      semantic = s.operations[operationOrAttributeName];
      delete s.operations[operationOrAttributeName];
    } else if (operationOrAttributeName in s.attributes) {
      semantic = s.attributes[operationOrAttributeName];
      delete s.attributes[operationOrAttributeName];
    }
    delete s.Wrapper.prototype[operationOrAttributeName];
    return semantic;
  };
  proxy.getOperationNames = function() {
    return Object.keys(s.operations);
  };
  proxy.getAttributeNames = function() {
    return Object.keys(s.attributes);
  };
  proxy.getGrammar = function() {
    return s.grammar;
  };
  proxy.toRecipe = function(semanticsOnly) {
    return s.toRecipe(semanticsOnly);
  };

  // Make the proxy's toString() work.
  proxy.toString = s.toString.bind(s);

  // Returns the semantics for the proxy.
  proxy._getSemantics = function() {
    return s;
  };

  return proxy;
};

Semantics.initBuiltInSemantics = function(builtInRules) {
  var actions = {
    empty: function() {
      return this.iteration();
    },
    nonEmpty: function(first, _, rest) {
      return this.iteration([first].concat(rest.children));
    }
  };

  Semantics.BuiltInSemantics = Semantics
      .createSemantics(builtInRules, null)
      .addOperation('asIteration', {
        emptyListOf: actions.empty,
        nonemptyListOf: actions.nonEmpty,
        EmptyListOf: actions.empty,
        NonemptyListOf: actions.nonEmpty
      });
};

// ----------------- Operation -----------------

// An Operation represents a function to be applied to a concrete syntax tree (CST) -- it's very
// similar to a Visitor (http://en.wikipedia.org/wiki/Visitor_pattern). An operation is executed by
// recursively walking the CST, and at each node, invoking the matching semantic action from
// `actionDict`. See `Operation.prototype.execute` for details of how a CST node's matching semantic
// action is found.
function Operation(name, formals, actionDict, builtInDefault) {
  this.name = name;
  this.formals = formals;
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}

Operation.prototype.typeName = 'operation';

Operation.prototype.checkActionDict = function(grammar) {
  grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
};

// Execute this operation on the CST node associated with `nodeWrapper` in the context of the given
// Semantics instance.
Operation.prototype.execute = function(semantics, nodeWrapper) {
  // Look for a semantic action whose name matches the node's constructor name, which is either the
  // name of a rule in the grammar, or '_terminal' (for a terminal node), or '_iter' (for an
  // iteration node). In the latter case, the action function receives a single argument, which is
  // an array containing all of the children of the CST node.
  var actionFn = this.actionDict[nodeWrapper._node.ctorName];
  if (actionFn) {
    return this.doAction(semantics, nodeWrapper, actionFn, nodeWrapper.isIteration());
  }

  // The action dictionary does not contain a semantic action for this specific type of node.
  // If this is a nonterminal node and the programmer has provided a `_nonterminal` semantic
  // action, we invoke it:
  if (nodeWrapper.isNonterminal()) {
    actionFn = this.actionDict._nonterminal;
    if (actionFn) {
      return this.doAction(semantics, nodeWrapper, actionFn, true);
    }
  }

  // Otherwise, we invoke the '_default' semantic action.
  return this.doAction(semantics, nodeWrapper, this.actionDict._default, true);
};

// Invoke `actionFn` on the CST node that corresponds to `nodeWrapper`, in the context of
// `semantics`. If `optPassChildrenAsArray` is truthy, `actionFn` will be called with a single
// argument, which is an array of wrappers. Otherwise, the number of arguments to `actionFn` will
// be equal to the number of children in the CST node.
Operation.prototype.doAction = function(semantics, nodeWrapper, actionFn, optPassChildrenAsArray) {
  return optPassChildrenAsArray ?
      actionFn.call(nodeWrapper, nodeWrapper._children()) :
      actionFn.apply(nodeWrapper, nodeWrapper._children());
};

// ----------------- Attribute -----------------

// Attributes are Operations whose results are memoized. This means that, for any given semantics,
// the semantic action for a CST node will be invoked no more than once.
function Attribute(name, actionDict, builtInDefault) {
  this.name = name;
  this.formals = [];
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}
inherits(Attribute, Operation);

Attribute.prototype.typeName = 'attribute';

Attribute.prototype.execute = function(semantics, nodeWrapper) {
  var node = nodeWrapper._node;
  var key = semantics.attributeKeys[this.name];
  if (!node.hasOwnProperty(key)) {
    // The following is a super-send -- isn't JS beautiful? :/
    node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
  }
  return node[key];
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Semantics;

},{"./MatchResult":33,"./common":39,"./nodes":42,"es6-symbol":6,"inherits":24}],37:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = require('./InputStream');
var PosInfo = require('./PosInfo');
var Trace = require('./Trace');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

var RM_RIGHTMOST_FAILURE_POSITION = 0;
var RM_RIGHTMOST_FAILURES = 1;

var applySpaces = new pexprs.Apply('spaces');

function State(grammar, input, opts) {
  this.grammar = grammar;
  this.startExpr = this._getStartExpr(grammar, opts.startApplication);
  this.inputStream = new InputStream(input);
  this.tracingEnabled = opts.trace || false;
  this.matchNodes = opts.matchNodes || false;
  this.init(RM_RIGHTMOST_FAILURE_POSITION);
}

State.prototype = {
  init: function(recordingMode) {
    this.posInfos = [];
    this.bindings = [];
    this.applicationStack = [];
    this.inLexifiedContextStack = [false];

    this.recordingMode = recordingMode;
    if (recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      this.rightmostFailurePosition = -1;
    } else if (recordingMode === RM_RIGHTMOST_FAILURES) {
      // We always run in *rightmost failure position* recording mode before running in
      // *rightmost failures* recording mode. And since the traces generated by each of
      // these passes would be identical, there's no need to record it now if we have
      // already recorded it in the first pass.
      this.tracingEnabled = false;
    } else {
      throw new Error('invalid recording mode: ' + recordingMode);
    }

    if (this.isTracing()) {
      this.trace = [];
    }
  },

  enter: function(app) {
    this.applicationStack.push(app);
    this.inLexifiedContextStack.push(false);
  },

  exit: function() {
    this.applicationStack.pop();
    this.inLexifiedContextStack.pop();
  },

  enterLexifiedContext: function() {
    this.inLexifiedContextStack.push(true);
  },

  exitLexifiedContext: function() {
    this.inLexifiedContextStack.pop();
  },

  currentApplication: function() {
    return this.applicationStack[this.applicationStack.length - 1];
  },

  inSyntacticContext: function() {
    if (typeof this.inputStream.source !== 'string') {
      return false;
    }
    var currentApplication = this.currentApplication();
    if (currentApplication) {
      return currentApplication.isSyntactic() && !this.inLexifiedContext();
    } else {
      // The top-level context is syntactic if the start application is.
      return this.startExpr.factors[0].isSyntactic();
    }
  },

  inLexifiedContext: function() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  },

  skipSpaces: function() {
    var origFailuresInfo = this.getFailuresInfo();
    this.eval(applySpaces);
    this.bindings.pop();
    this.restoreFailuresInfo(origFailuresInfo);
    return this.inputStream.pos;
  },

  skipSpacesIfInSyntacticContext: function() {
    return this.inSyntacticContext() ?
        this.skipSpaces() :
        this.inputStream.pos;
  },

  maybeSkipSpacesBefore: function(expr) {
    if (expr instanceof pexprs.Apply && expr.isSyntactic()) {
      return this.skipSpaces();
    } else if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
      return this.skipSpacesIfInSyntacticContext();
    } else {
      return this.inputStream.pos;
    }
  },

  truncateBindings: function(newLength) {
    // Yes, this is this really faster than setting the `length` property (tested with
    // bin/es5bench on Node v6.1.0).
    while (this.bindings.length > newLength) {
      this.bindings.pop();
    }
  },

  getCurrentPosInfo: function() {
    return this.getPosInfo(this.inputStream.pos);
  },

  getPosInfo: function(pos) {
    var posInfo = this.posInfos[pos];
    return posInfo || (this.posInfos[pos] = new PosInfo(this));
  },

  processFailure: function(pos, expr) {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      if (pos > this.rightmostFailurePosition) {
        this.rightmostFailurePosition = pos;
      }
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */
        if (pos === this.rightmostFailurePosition) {
          // We're only interested in failures at the rightmost failure position that haven't
          // already been recorded.

          this.addRightmostFailure(expr.toFailure(this.grammar), false);
        }
  },

  ensureRightmostFailures: function() {
    if (!this.rightmostFailures) {
      this.rightmostFailures = Object.create(null);
    }
  },

  addRightmostFailure: function(failure, shouldCloneIfNew) {
    this.ensureRightmostFailures();
    var key = failure.toKey();
    if (!this.rightmostFailures[key]) {
      this.rightmostFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
    } else if (this.rightmostFailures[key].isFluffy() && !failure.isFluffy()) {
      this.rightmostFailures[key].clearFluffy();
    }
  },

  addRightmostFailures: function(failures, shouldCloneIfNew) {
    var self = this;
    Object.keys(failures).forEach(function(key) {
      self.addRightmostFailure(failures[key], shouldCloneIfNew);
    });
  },

  cloneRightmostFailures: function() {
    if (!this.rightmostFailures) {
      return undefined;
    }

    var ans = Object.create(null);
    var self = this;
    Object.keys(this.rightmostFailures).forEach(function(key) {
      ans[key] = self.rightmostFailures[key].clone();
    });
    return ans;
  },

  getRightmostFailurePosition: function() {
    return this.rightmostFailurePosition;
  },

  getFailures: function() {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      // Rewind, then try to match the input again, recording failures.
      this.init(RM_RIGHTMOST_FAILURES);
      this.evalFromStart();
    }

    this.ensureRightmostFailures();
    var self = this;
    return Object.keys(this.rightmostFailures).map(function(key) {
      return self.rightmostFailures[key];
    });
  },

  // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
  getMemoizedTraceEntry: function(pos, expr) {
    var posInfo = this.posInfos[pos];
    if (posInfo && expr.ruleName) {
      var memoRec = posInfo.memo[expr.toMemoKey()];
      if (memoRec) {
        return memoRec.traceEntry;
      }
    }
    return null;
  },

  // Returns a new trace entry, with the currently active trace array as its children.
  getTraceEntry: function(pos, expr, succeeded, bindings) {
    var memoEntry = this.getMemoizedTraceEntry(pos, expr);
    return memoEntry ? memoEntry.cloneWithExpr(expr)
                     : new Trace(this.inputStream, pos, expr, succeeded, bindings, this.trace);
  },

  isTracing: function() {
    return this.tracingEnabled;
  },

  useMemoizedResult: function(memoRec) {
    if (this.isTracing()) {
      this.trace.push(memoRec.traceEntry);
    }

    if (this.recordingMode === RM_RIGHTMOST_FAILURES && memoRec.failuresAtRightmostPosition) {
      this.addRightmostFailures(memoRec.failuresAtRightmostPosition, true);
    }

    if (memoRec.value) {
      this.inputStream.pos = memoRec.pos;
      this.bindings.push(memoRec.value);
      return true;
    }
    return false;
  },

  // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
  // will have `expr.getArity()` more elements than before, and the input stream's position may
  // have increased. On failure, `bindings` and position will be unchanged.
  eval: function(expr) {
    var inputStream = this.inputStream;
    var origNumBindings = this.bindings.length;

    if (this.recordingMode === RM_RIGHTMOST_FAILURES) {
      var origFailures = this.rightmostFailures;
      this.rightmostFailures = undefined;
    }

    var origPos = inputStream.pos;
    var memoPos = this.maybeSkipSpacesBefore(expr);

    if (this.isTracing()) {
      var origTrace = this.trace;
      this.trace = [];
    }

    // Do the actual evaluation.
    var ans = expr.eval(this);

    if (this.isTracing()) {
      var bindings = this.bindings.slice(origNumBindings);
      var traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
      traceEntry.isImplicitSpaces = expr === applySpaces;
      traceEntry.isRootNode = expr === this.startExpr;
      origTrace.push(traceEntry);
      this.trace = origTrace;
    }

    if (ans) {
      if (this.rightmostFailures &&
        (inputStream.pos === this.rightmostFailurePosition ||
         this.skipSpacesIfInSyntacticContext() === this.rightmostFailurePosition)) {
        var self = this;
        Object.keys(this.rightmostFailures).forEach(function(key) {
          self.rightmostFailures[key].makeFluffy();
        });
      }
    } else {
      // Reset the position and the bindings.
      inputStream.pos = origPos;
      this.truncateBindings(origNumBindings);
    }

    if (this.recordingMode === RM_RIGHTMOST_FAILURES && origFailures) {
      this.addRightmostFailures(origFailures, false);
    }

    return ans;
  },

  // Return the starting expression for this grammar. If `optStartApplication` is specified, it
  // is a string expressing a rule application in the grammar. If not specified, the grammar's
  // default start rule will be used.
  _getStartExpr: function(grammar, optStartApplication) {
    var applicationStr = optStartApplication || grammar.defaultStartRule;
    if (!applicationStr) {
      throw new Error('Missing start rule argument -- the grammar has no default start rule.');
    }

    var startApp = grammar.parseApplication(applicationStr);
    return new pexprs.Seq([startApp, pexprs.end]);
  },

  evalFromStart: function() {
    this.eval(this.startExpr);
  },

  getFailuresInfo: function() {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      return this.rightmostFailurePosition;
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */ {
      return this.rightmostFailures;
    }
  },

  restoreFailuresInfo: function(failuresInfo) {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      this.rightmostFailurePosition = failuresInfo;
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */ {
      this.rightmostFailures = failuresInfo;
    }
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = State;

},{"./InputStream":31,"./PosInfo":35,"./Trace":38,"./pexprs":58}],38:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Unicode characters that are used in the `toString` output.
var BALLOT_X = '\u2717';
var CHECK_MARK = '\u2713';
var DOT_OPERATOR = '\u22C5';
var RIGHTWARDS_DOUBLE_ARROW = '\u21D2';
var SYMBOL_FOR_HORIZONTAL_TABULATION = '\u2409';
var SYMBOL_FOR_LINE_FEED = '\u240A';
var SYMBOL_FOR_CARRIAGE_RETURN = '\u240D';

function spaces(n) {
  return common.repeat(' ', n).join('');
}

// Return a string representation of a portion of `inputStream` at offset `pos`.
// The result will contain exactly `len` characters.
function getInputExcerpt(inputStream, pos, len) {
  var excerpt = asEscapedString(inputStream.sourceSlice(pos, pos + len));

  // Pad the output if necessary.
  if (excerpt.length < len) {
    return excerpt + common.repeat(' ', len - excerpt.length).join('');
  }
  return excerpt;
}

function asEscapedString(obj) {
  if (typeof obj === 'string') {
    // Replace non-printable characters with visible symbols.
    return obj
        .replace(/ /g, DOT_OPERATOR)
        .replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION)
        .replace(/\n/g, SYMBOL_FOR_LINE_FEED)
        .replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
  }
  return String(obj);
}

// ----------------- Trace -----------------

function Trace(inputStream, pos, expr, succeeded, bindings, optChildren) {
  this.inputStream = inputStream;
  this.pos = pos;
  this.interval = new Interval(inputStream, pos, inputStream.pos);
  this.expr = expr;
  this.succeeded = succeeded;
  this.bindings = bindings;
  this.children = optChildren || [];

  this.isImplicitSpaces = false;
  this.isLeftRecursive = false;
  this.isMemoized = false;
  this.isRootNode = false;
}

// A value that can be returned from visitor functions to indicate that a
// node should not be recursed into.
Trace.prototype.SKIP = {};

Object.defineProperty(Trace.prototype, 'displayString', {
  get: function() { return this.expr.toDisplayString(); }
});

Trace.prototype.cloneWithExpr = function(expr) {
  var ans = new Trace(
      this.inputStream, this.pos, expr, this.succeeded, this.bindings, this.children);
  ans.isLeftRecursive = this.isLeftRecursive;
  ans.isRootNode = this.isRootNode;
  ans.isMemoized = true;
  return ans;
};

// Recursively traverse this trace node and all its descendents, calling a visitor function
// for each node that is visited. If `vistorObjOrFn` is an object, then its 'enter' property
// is a function to call before visiting the children of a node, and its 'exit' property is
// a function to call afterwards. If `visitorObjOrFn` is a function, it represents the 'enter'
// function.
//
// The functions are called with three arguments: the Trace node, its parent Trace, and a number
// representing the depth of the node in the tree. (The root node has depth 0.) `optThisArg`, if
// specified, is the value to use for `this` when executing the visitor functions.
Trace.prototype.walk = function(visitorObjOrFn, optThisArg) {
  var visitor = visitorObjOrFn;
  if (typeof visitor === 'function') {
    visitor = {enter: visitor};
  }

  function _walk(node, parent, depth) {
    var recurse = true;
    if (visitor.enter) {
      if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
        recurse = false;
      }
    }
    if (recurse) {
      node.children.forEach(function(child, i) {
        var nextChild = node.children[i + 1];
        if (nextChild && nextChild.expr === child.expr && nextChild.pos === child.pos) {
          // Skip this child -- it is an intermediate left-recursive result.
          common.assert(node.isLeftRecursive);
        } else {
          _walk(child, node, depth + 1);
        }
      });
      if (visitor.exit) {
        visitor.exit.call(optThisArg, node, parent, depth);
      }
    }
  }
  if (this.isRootNode) {
    // Don't visit the root node itself, only its children.
    this.children.forEach(function(c) { _walk(c, null, 0); });
  } else {
    _walk(this, null, 0);
  }
};

// Return a string representation of the trace.
// Sample:
//     12⋅+⋅2⋅*⋅3 ✓ exp ⇒  "12"
//     12⋅+⋅2⋅*⋅3   ✓ addExp (LR) ⇒  "12"
//     12⋅+⋅2⋅*⋅3       ✗ addExp_plus
Trace.prototype.toString = function() {
  var sb = new common.StringBuffer();
  this.walk(function(node, parent, depth) {
    if (!node) {
      return this.SKIP;
    }
    var ctorName = node.expr.constructor.name;
    // Don't print anything for Alt nodes.
    if (ctorName === 'Alt') {
      return;  // eslint-disable-line consistent-return
    }
    sb.append(getInputExcerpt(node.inputStream, node.pos, 10) + spaces(depth * 2 + 1));
    sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + ' ' + node.displayString);
    if (node.isLeftRecursive) {
      sb.append(' (LR)');
    }
    if (node.succeeded) {
      var contents = asEscapedString(node.interval.contents);
      sb.append(' ' + RIGHTWARDS_DOUBLE_ARROW + '  ');
      sb.append(typeof contents === 'string' ? '"' + contents + '"' : contents);
    }
    sb.append('\n');
  }.bind(this));
  return sb.contents();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Trace;

},{"./Interval":32,"./common":39}],39:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Helpers

var escapeStringFor = {};
for (var c = 0; c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor["'".charCodeAt(0)]  = "\\'";
escapeStringFor['"'.charCodeAt(0)]  = '\\"';
escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
escapeStringFor['\b'.charCodeAt(0)] = '\\b';
escapeStringFor['\f'.charCodeAt(0)] = '\\f';
escapeStringFor['\n'.charCodeAt(0)] = '\\n';
escapeStringFor['\r'.charCodeAt(0)] = '\\r';
escapeStringFor['\t'.charCodeAt(0)] = '\\t';
escapeStringFor['\u000b'.charCodeAt(0)] = '\\v';

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function(optMethodName) {
  var methodName = optMethodName || '';
  return function() {
    throw new Error(
      'this method ' + methodName + ' is abstract! ' +
      '(it has no implementation in class ' + this.constructor.name + ')');
  };
};

exports.assert = function(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
};

// Define a lazily-computed, non-enumerable property named `propName`
// on the object `obj`. `getterFn` will be called to compute the value the
// first time the property is accessed.
exports.defineLazyProperty = function(obj, propName, getterFn) {
  var memo;
  Object.defineProperty(obj, propName, {
    get: function() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
};

exports.clone = function(obj) {
  if (obj) {
    return extend({}, obj);
  }
  return obj;
};

exports.extend = extend;

exports.repeatFn = function(fn, n) {
  var arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
};

exports.repeatStr = function(str, n) {
  return new Array(n + 1).join(str);
};

exports.repeat = function(x, n) {
  return exports.repeatFn(function() { return x; }, n);
};

exports.getDuplicates = function(array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.copyWithoutDuplicates = function(array) {
  var noDuplicates = [];
  array.forEach(function(entry) {
    if (noDuplicates.indexOf(entry) < 0) {
      noDuplicates.push(entry);
    }
  });
  return noDuplicates;
};

exports.isSyntactic = function(ruleName) {
  var firstChar = ruleName[0];
  return firstChar === firstChar.toUpperCase();
};

exports.isLexical = function(ruleName) {
  return !exports.isSyntactic(ruleName);
};

exports.padLeft = function(str, len, optChar) {
  var ch = optChar || ' ';
  if (str.length < len) {
    return exports.repeatStr(ch, len - str.length) + str;
  }
  return str;
};

// StringBuffer

exports.StringBuffer = function() {
  this.strings = [];
};

exports.StringBuffer.prototype.append = function(str) {
  this.strings.push(str);
};

exports.StringBuffer.prototype.contents = function() {
  return this.strings.join('');
};

// Character escaping and unescaping

exports.escapeChar = function(c, optDelim) {
  var charCode = c.charCodeAt(0);
  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
    return c;
  } else if (charCode < 128) {
    return escapeStringFor[charCode];
  } else if (128 <= charCode && charCode < 256) {
    return '\\x' + exports.padLeft(charCode.toString(16), 2, '0');
  } else {
    return '\\u' + exports.padLeft(charCode.toString(16), 4, '0');
  }
};

exports.unescapeChar = function(s) {
  if (s.charAt(0) === '\\') {
    switch (s.charAt(1)) {
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
      case 'v': return '\v';
      case 'x': return String.fromCharCode(parseInt(s.substring(2, 4), 16));
      case 'u': return String.fromCharCode(parseInt(s.substring(2, 6), 16));
      default:   return s.charAt(1);
    }
  } else {
    return s;
  }
};

// Helper for producing a description of an unknown object in a safe way.
// Especially useful for error messages where an unexpected type of object was encountered.
exports.unexpectedObjToString = function(obj) {
  if (obj == null) {
    return String(obj);
  }
  var baseToString = Object.prototype.toString.call(obj);
  try {
    var typeName;
    if (obj.constructor && obj.constructor.name) {
      typeName = obj.constructor.name;
    } else if (baseToString.indexOf('[object ') === 0) {
      typeName = baseToString.slice(8, -1);  // Extract e.g. "Array" from "[object Array]".
    } else {
      typeName = typeof obj;
    }
    return typeName + ': ' + JSON.stringify(String(obj));
  } catch (e) {
    return baseToString;
  }
};

},{"util-extend":26}],40:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Namespace = require('./Namespace');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function createError(message, optInterval) {
  var e;
  if (optInterval) {
    e = new Error(optInterval.getLineAndColumnMessage() + message);
    e.shortMessage = message;
    e.interval = optInterval;
  } else {
    e = new Error(message);
  }
  return e;
}

// ----------------- errors about intervals -----------------

function intervalSourcesDontMatch() {
  return createError("Interval sources don't match");
}

// ----------------- errors about grammars -----------------

// Grammar syntax error

function grammarSyntaxError(matchFailure) {
  var e = new Error();
  Object.defineProperty(e, 'message', {get: function() { return matchFailure.message; }});
  Object.defineProperty(e, 'shortMessage', {get: function() {
    return 'Expected ' + matchFailure.getExpectedText();
  }});
  e.interval = matchFailure.getInterval();
  return e;
}

// Undeclared grammar

function undeclaredGrammar(grammarName, namespace, interval) {
  var message = namespace ?
      'Grammar ' + grammarName + ' is not declared in namespace ' + Namespace.toString(namespace) :
      'Undeclared grammar ' + grammarName;
  return createError(message, interval);
}

// Duplicate grammar declaration

function duplicateGrammarDeclaration(grammar, namespace) {
  return createError('Grammar ' + grammar.name + ' is already declared in this namespace');
}

// ----------------- rules -----------------

// Undeclared rule

function undeclaredRule(ruleName, grammarName, optInterval) {
  return createError(
      'Rule ' + ruleName + ' is not declared in grammar ' + grammarName,
      optInterval);
}

// Cannot override undeclared rule

function cannotOverrideUndeclaredRule(ruleName, grammarName, body) {
  return createError(
      'Cannot override rule ' + ruleName + ' because it is not declared in ' + grammarName,
      body.definitionInterval);
}

// Cannot extend undeclared rule

function cannotExtendUndeclaredRule(ruleName, grammarName, body) {
  return createError(
      'Cannot extend rule ' + ruleName + ' because it is not declared in ' + grammarName,
      body.definitionInterval);
}

// Duplicate rule declaration

function duplicateRuleDeclaration(ruleName, offendingGrammarName, declGrammarName, body) {
  var message = "Duplicate declaration for rule '" + ruleName +
      "' in grammar '" + offendingGrammarName + "'";
  if (offendingGrammarName !== declGrammarName) {
    message += " (originally declared in '" + declGrammarName + "')";
  }
  return createError(message, body.definitionInterval);
}

// Wrong number of parameters

function wrongNumberOfParameters(ruleName, expected, actual, body) {
  return createError(
      'Wrong number of parameters for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      body && body.definitionInterval);
}

// Wrong number of arguments

function wrongNumberOfArguments(ruleName, expected, actual, expr) {
  return createError(
      'Wrong number of arguments for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      expr.interval);
}

// Duplicate parameter names

function duplicateParameterNames(ruleName, duplicates, body) {
  return createError(
      'Duplicate parameter names in rule ' + ruleName + ': ' + duplicates.join(','),
      body.definitionInterval);
}

// Invalid parameter expression

function invalidParameter(ruleName, expr) {
  return createError(
      'Invalid parameter to rule ' + ruleName + ': ' + expr + ' has arity ' + expr.getArity() +
          ', but parameter expressions ' + 'must have arity 1',
      expr.interval);
}

// Application of syntactic rule from lexical rule

function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
  return createError(
      'Cannot apply syntactic rule ' + ruleName + ' from here (inside a lexical context)',
      applyExpr.interval);
}

// ----------------- Kleene operators -----------------

function kleeneExprHasNullableOperand(kleeneExpr) {
  return createError(
      'Nullable expression ' + kleeneExpr.expr.interval.contents + " is not allowed inside '" +
          kleeneExpr.operator + "' (possible infinite loop)",
      kleeneExpr.expr.interval);
}

// ----------------- arity -----------------

function inconsistentArity(ruleName, expected, actual, expr) {
  return createError(
      'Rule ' + ruleName + ' involves an alternation which has inconsistent arity ' +
          '(expected ' + expected + ', got ' + actual + ')',
      expr.interval);
}

// ----------------- properties -----------------

function duplicatePropertyNames(duplicates) {
  return createError('Object pattern has duplicate property names: ' + duplicates.join(', '));
}

// ----------------- constructors -----------------

function invalidConstructorCall(grammar, ctorName, children) {
  return createError(
      'Attempt to invoke constructor ' + ctorName + ' with invalid or unexpected arguments');
}

// ----------------- convenience -----------------

function multipleErrors(errors) {
  var messages = errors.map(function(e) { return e.message; });
  return createError(
      ['Errors:'].concat(messages).join('\n- '),
      errors[0].interval);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  applicationOfSyntacticRuleFromLexicalContext: applicationOfSyntacticRuleFromLexicalContext,
  cannotExtendUndeclaredRule: cannotExtendUndeclaredRule,
  cannotOverrideUndeclaredRule: cannotOverrideUndeclaredRule,
  duplicateGrammarDeclaration: duplicateGrammarDeclaration,
  duplicateParameterNames: duplicateParameterNames,
  duplicatePropertyNames: duplicatePropertyNames,
  duplicateRuleDeclaration: duplicateRuleDeclaration,
  inconsistentArity: inconsistentArity,
  intervalSourcesDontMatch: intervalSourcesDontMatch,
  invalidConstructorCall: invalidConstructorCall,
  invalidParameter: invalidParameter,
  grammarSyntaxError: grammarSyntaxError,
  kleeneExprHasNullableOperand: kleeneExprHasNullableOperand,
  undeclaredGrammar: undeclaredGrammar,
  undeclaredRule: undeclaredRule,
  wrongNumberOfArguments: wrongNumberOfArguments,
  wrongNumberOfParameters: wrongNumberOfParameters,

  throwErrors: function(errors) {
    if (errors.length === 1) {
      throw errors[0];
    }
    if (errors.length > 1) {
      throw multipleErrors(errors);
    }
  }
};

},{"./Namespace":34}],41:[function(require,module,exports){
/* global document, XMLHttpRequest */

'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Builder = require('./Builder');
var Grammar = require('./Grammar');
var Namespace = require('./Namespace');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');
var util = require('./util');

var isBuffer = require('is-buffer');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
// bottom of this file because loading the grammar requires Ohm itself.
var ohmGrammar;

// An object which makes it possible to stub out the document API for testing.
var documentInterface = {
  querySelector: function(sel) { return document.querySelector(sel); },
  querySelectorAll: function(sel) { return document.querySelectorAll(sel); }
};

// Check if `obj` is a DOM element.
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function isUndefined(obj) {
  return obj === void 0;
}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(obj) {
  if (obj == null) {
    return false;
  }
  var length = obj.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

// TODO: just use the jQuery thing
function load(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  try {
    req.send();
    if (req.status === 0 || req.status === 200) {
      return req.responseText;
    }
  } catch (e) {}
  throw new Error('unable to load url ' + url);
}

// Returns a Grammar instance (i.e., an object with a `match` method) for
// `tree`, which is the concrete syntax tree of a user-written grammar.
// The grammar will be assigned into `namespace` under the name of the grammar
// as specified in the source.
function buildGrammar(match, namespace, optOhmGrammarForTesting) {
  var builder = new Builder();
  var decl;
  var currentRuleName;
  var currentRuleFormals;
  var overriding = false;
  var metaGrammar = optOhmGrammarForTesting || ohmGrammar;

  // A visitor that produces a Grammar instance from the CST.
  var helpers = metaGrammar.semantics().addOperation('visit', {
    Grammar: function(n, s, open, rs, close) {
      var grammarName = n.visit();
      decl = builder.newGrammar(grammarName, namespace);
      s.visit();
      rs.visit();
      var g = decl.build();
      g.definitionInterval = this.interval.trimmed();
      if (grammarName in namespace) {
        throw errors.duplicateGrammarDeclaration(g, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },

    SuperGrammar: function(_, n) {
      var superGrammarName = n.visit();
      if (superGrammarName === 'null') {
        decl.withSuperGrammar(null);
      } else {
        if (!namespace || !(superGrammarName in namespace)) {
          throw errors.undeclaredGrammar(superGrammarName, namespace, n.interval);
        }
        decl.withSuperGrammar(namespace[superGrammarName]);
      }
    },

    Rule_define: function(n, fs, d, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      // If there is no default start rule yet, set it now. This must be done before visiting
      // the body, because it might contain an inline rule definition.
      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
        decl.withDefaultStartRule(currentRuleName);
      }
      var body = b.visit();
      body.definitionInterval = this.interval.trimmed();
      var description = d.visit()[0];
      return decl.define(currentRuleName, currentRuleFormals, body, description);
    },
    Rule_override: function(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      overriding = true;
      var body = b.visit();
      body.definitionInterval = this.interval.trimmed();
      var ans = decl.override(currentRuleName, currentRuleFormals, body);
      overriding = false;
      return ans;
    },
    Rule_extend: function(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      var body = b.visit();
      var ans = decl.extend(currentRuleName, currentRuleFormals, body);
      decl.ruleBodies[currentRuleName].definitionInterval = this.interval.trimmed();
      return ans;
    },
    RuleBody: function(_, terms) {
      var args = terms.visit();
      return builder.alt.apply(builder, args).withInterval(this.interval);
    },

    Formals: function(opointy, fs, cpointy) {
      return fs.visit();
    },

    Params: function(opointy, ps, cpointy) {
      return ps.visit();
    },

    Alt: function(seqs) {
      var args = seqs.visit();
      return builder.alt.apply(builder, args).withInterval(this.interval);
    },

    TopLevelTerm_inline: function(b, n) {
      var inlineRuleName = currentRuleName + '_' + n.visit();
      var body = b.visit();
      body.definitionInterval = this.interval.trimmed();
      var isNewRuleDeclaration =
          !(decl.superGrammar && decl.superGrammar.ruleBodies[inlineRuleName]);
      if (overriding && !isNewRuleDeclaration) {
        decl.override(inlineRuleName, currentRuleFormals, body);
      } else {
        decl.define(inlineRuleName, currentRuleFormals, body);
      }
      var params = currentRuleFormals.map(function(formal) { return builder.app(formal); });
      return builder.app(inlineRuleName, params).withInterval(body.interval);
    },

    Seq: function(expr) {
      return builder.seq.apply(builder, expr.visit()).withInterval(this.interval);
    },

    Iter_star: function(x, _) {
      return builder.star(x.visit()).withInterval(this.interval);
    },
    Iter_plus: function(x, _) {
      return builder.plus(x.visit()).withInterval(this.interval);
    },
    Iter_opt: function(x, _) {
      return builder.opt(x.visit()).withInterval(this.interval);
    },

    Pred_not: function(_, x) {
      return builder.not(x.visit()).withInterval(this.interval);
    },
    Pred_lookahead: function(_, x) {
      return builder.lookahead(x.visit()).withInterval(this.interval);
    },

    Lex_lex: function(_, x) {
      return builder.lex(x.visit()).withInterval(this.interval);
    },

    Base_application: function(rule, ps) {
      return builder.app(rule.visit(), ps.visit()[0] || []).withInterval(this.interval);
    },
    Base_range: function(from, _, to) {
      return builder.range(from.visit(), to.visit()).withInterval(this.interval);
    },
    Base_terminal: function(expr) {
      return builder.terminal(expr.visit()).withInterval(this.interval);
    },
    Base_paren: function(open, x, close) {
      return x.visit();
    },

    ruleDescr: function(open, t, close) {
      return t.visit();
    },
    ruleDescrText: function(_) {
      return this.interval.contents.trim();
    },

    caseName: function(_, space1, n, space2, end) {
      return n.visit();
    },

    name: function(first, rest) {
      return this.interval.contents;
    },
    nameFirst: function(expr) {},
    nameRest: function(expr) {},

    terminal: function(open, cs, close) {
      return cs.visit().map(function(c) { return common.unescapeChar(c); }).join('');
    },

    terminalChar: function(_) {
      return this.interval.contents;
    },

    escapeChar: function(_) {
      return this.interval.contents;
    },

    NonemptyListOf: function(x, _, xs) {
      return [x.visit()].concat(xs.visit());
    },
    EmptyListOf: function() {
      return [];
    },

    _terminal: function() {
      return this.primitiveValue;
    }
  });
  return helpers(match).visit();
}

function compileAndLoad(source, namespace) {
  var m = ohmGrammar.match(source, 'Grammars');
  if (m.failed()) {
    throw errors.grammarSyntaxError(m);
  }
  return buildGrammar(m, namespace);
}

// Return the contents of a script element, fetching it via XHR if necessary.
function getScriptElementContents(el) {
  if (!isElement(el)) {
    throw new TypeError('Expected a DOM Node, got ' + common.unexpectedObjToString(el));
  }
  if (el.type !== 'text/ohm-js') {
    throw new Error('Expected a script tag with type="text/ohm-js", got ' + el);
  }
  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
}

function grammar(source, optNamespace) {
  var ns = grammars(source, optNamespace);

  // Ensure that the source contained no more than one grammar definition.
  var grammarNames = Object.keys(ns);
  if (grammarNames.length === 0) {
    throw new Error('Missing grammar definition');
  } else if (grammarNames.length > 1) {
    var secondGrammar = ns[grammarNames[1]];
    var interval = secondGrammar.definitionInterval;
    throw new Error(
        util.getLineAndColumnMessage(interval.inputStream.source, interval.startIdx) +
        'Found more than one grammar definition -- use ohm.grammars() instead.');
  }
  return ns[grammarNames[0]];  // Return the one and only grammar.
}

function grammars(source, optNamespace) {
  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  if (typeof source !== 'string') {
    // For convenience, detect Node.js Buffer objects and automatically call toString().
    if (isBuffer(source)) {
      source = source.toString();
    } else {
      throw new TypeError(
          'Expected string as first argument, got ' + common.unexpectedObjToString(source));
    }
  }
  compileAndLoad(source, ns);
  return ns;
}

function grammarFromScriptElement(optNode) {
  var node = optNode;
  if (isUndefined(node)) {
    var nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
    if (nodeList.length !== 1) {
      throw new Error(
          'Expected exactly one script tag with type="text/ohm-js", found ' + nodeList.length);
    }
    node = nodeList[0];
  }
  return grammar(getScriptElementContents(node));
}

function grammarsFromScriptElements(optNodeOrNodeList) {
  // Simple case: the argument is a DOM node.
  if (isElement(optNodeOrNodeList)) {
    return grammars(optNodeOrNodeList);
  }
  // Otherwise, it must be either undefined or a NodeList.
  var nodeList = optNodeOrNodeList;
  if (isUndefined(nodeList)) {
    // Find all script elements with type="text/ohm-js".
    nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
  } else if (typeof nodeList === 'string' || (!isElement(nodeList) && !isArrayLike(nodeList))) {
    throw new TypeError('Expected a Node, NodeList, or Array, but got ' + nodeList);
  }
  var ns = Namespace.createNamespace();
  for (var i = 0; i < nodeList.length; ++i) {
    // Copy the new grammars into `ns` to keep the namespace flat.
    common.extend(ns, grammars(getScriptElementContents(nodeList[i]), ns));
  }
  return ns;
}

function makeRecipe(recipe) {
  if (typeof recipe === 'function') {
    return recipe.call(new Builder());
  } else {
    if (typeof recipe === 'string') {
      // stringified JSON recipe
      recipe = JSON.parse(recipe);
    }
    return (new Builder()).fromRecipe(recipe);
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about
module.exports = {
  createNamespace: Namespace.createNamespace,
  grammar: grammar,
  grammars: grammars,
  grammarFromScriptElement: grammarFromScriptElement,
  grammarsFromScriptElements: grammarsFromScriptElements,
  makeRecipe: makeRecipe,
  ohmGrammar: null,  // Initialized below, after Grammar.BuiltInRules.
  pexprs: pexprs,
  util: util,
  extras: require('../extras')
};

// Stuff for testing, etc.
module.exports._buildGrammar = buildGrammar;
module.exports._setDocumentInterfaceForTesting = function(doc) { documentInterface = doc; };

// Late initialization for stuff that is bootstrapped.

Grammar.BuiltInRules = require('../dist/built-in-rules');

var Semantics = require('./Semantics');
var operationsAndAttributesGrammar = require('../dist/operations-and-attributes');
Semantics.initBuiltInSemantics(Grammar.BuiltInRules);
Semantics.initPrototypeParser(operationsAndAttributesGrammar);  // requires BuiltInSemantics

module.exports.ohmGrammar = ohmGrammar = require('../dist/ohm-grammar');
Grammar.initApplicationParser(ohmGrammar, buildGrammar);

},{"../dist/built-in-rules":1,"../dist/ohm-grammar":2,"../dist/operations-and-attributes":3,"../extras":4,"./Builder":27,"./Grammar":29,"./Namespace":34,"./Semantics":36,"./common":39,"./errors":40,"./pexprs":58,"./util":59,"is-buffer":25}],42:[function(require,module,exports){
'use strict';

var inherits = require('inherits');

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Node(grammar, ctorName, children, interval) {
  this.grammar = grammar;
  this.ctorName = ctorName;
  this.children = children;
  this.interval = interval;
}

Node.prototype.numChildren = function() {
  return this.children.length;
};

Node.prototype.childAt = function(idx) {
  return this.children[idx];
};

Node.prototype.indexOfChild = function(arg) {
  return this.children.indexOf(arg);
};

Node.prototype.hasChildren = function() {
  return this.children.length > 0;
};

Node.prototype.hasNoChildren = function() {
  return !this.hasChildren();
};

Node.prototype.onlyChild = function() {
  if (this.children.length !== 1) {
    throw new Error(
        'cannot get only child of a node of type ' + this.ctorName +
        ' (it has ' + this.numChildren() + ' children)');
  } else {
    return this.firstChild();
  }
};

Node.prototype.firstChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get first child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(0);
  }
};

Node.prototype.lastChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get last child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(this.numChildren() - 1);
  }
};

Node.prototype.childBefore = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childBefore() called w/ an argument that is not a child');
  } else if (childIdx === 0) {
    throw new Error('cannot get child before first child');
  } else {
    return this.childAt(childIdx - 1);
  }
};

Node.prototype.childAfter = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childAfter() called w/ an argument that is not a child');
  } else if (childIdx === this.numChildren() - 1) {
    throw new Error('cannot get child after last child');
  } else {
    return this.childAt(childIdx + 1);
  }
};

Node.prototype.isTerminal = function() {
  return false;
};

Node.prototype.isNonterminal = function() {
  return false;
};

Node.prototype.isIteration = function() {
  return false;
};

Node.prototype.isOptional = function() {
  return false;
};

Node.prototype.toJSON = function() {
  var r = {};
  r[this.ctorName] = this.children;
  return r;
};

// Terminals

function TerminalNode(grammar, value, interval) {
  Node.call(this, grammar, '_terminal', [], interval);
  this.primitiveValue = value;
}
inherits(TerminalNode, Node);

TerminalNode.prototype.isTerminal = function() {
  return true;
};

// Nonterminals

function NonterminalNode(grammar, ruleName, children, interval) {
  Node.call(this, grammar, ruleName, children, interval);
}
inherits(NonterminalNode, Node);

NonterminalNode.prototype.isNonterminal = function() {
  return true;
};

NonterminalNode.prototype.isLexical = function() {
  return common.isLexical(this.ctorName);
};

NonterminalNode.prototype.isSyntactic = function() {
  return common.isSyntactic(this.ctorName);
};

// Iterations

function IterationNode(grammar, children, interval, optional) {
  Node.call(this, grammar, '_iter', children, interval);
  this.optional = optional;
}
inherits(IterationNode, Node);

IterationNode.prototype.isIteration = function() {
  return true;
};

IterationNode.prototype.isOptional = function() {
  return this.optional;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  Node: Node,
  TerminalNode: TerminalNode,
  NonterminalNode: NonterminalNode,
  IterationNode: IterationNode
};

},{"./common":39,"inherits":24}],43:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Return true if we should skip spaces preceding this expression in a syntactic context.
*/
pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract(
  'allowsSkippingPrecedingSpace'
);

/*
  Generally, these are all first-order expressions that operate on strings and (with the
  exception of Apply) directly read from the input stream.
*/
pexprs.any.allowsSkippingPrecedingSpace =
pexprs.end.allowsSkippingPrecedingSpace =
pexprs.Apply.prototype.allowsSkippingPrecedingSpace =
pexprs.Terminal.prototype.allowsSkippingPrecedingSpace =
pexprs.Range.prototype.allowsSkippingPrecedingSpace =
pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
  return true;
};

/*
  Higher-order expressions that don't directly consume input, and expressions that
  don't operate on string input streams (e.g. Obj and Arr).
*/
pexprs.Alt.prototype.allowsSkippingPrecedingSpace =
pexprs.Iter.prototype.allowsSkippingPrecedingSpace =
pexprs.Lex.prototype.allowsSkippingPrecedingSpace =
pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace =
pexprs.Not.prototype.allowsSkippingPrecedingSpace =
pexprs.Param.prototype.allowsSkippingPrecedingSpace =
pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function() {
  return false;
};

},{"./common":39,"./pexprs":58}],44:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var lexifyCount;

pexprs.PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount = 0;
  this._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.PExpr.prototype._assertAllApplicationsAreValid = common.abstract(
  '_assertAllApplicationsAreValid'
);

pexprs.any._assertAllApplicationsAreValid =
pexprs.end._assertAllApplicationsAreValid =
pexprs.Terminal.prototype._assertAllApplicationsAreValid =
pexprs.Range.prototype._assertAllApplicationsAreValid =
pexprs.Param.prototype._assertAllApplicationsAreValid =
pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  // no-op
};

pexprs.Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount++;
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
  lexifyCount--;
};

pexprs.Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Iter.prototype._assertAllApplicationsAreValid =
pexprs.Not.prototype._assertAllApplicationsAreValid =
pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  var body = grammar.ruleBodies[this.ruleName];

  // Make sure that the rule exists...
  if (!body) {
    throw errors.undeclaredRule(this.ruleName, grammar.name, this.interval);
  }

  // ...and that this application is allowed
  if (common.isSyntactic(this.ruleName) && (!common.isSyntactic(ruleName) || lexifyCount > 0)) {
    throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
  }

  // ...and that this application has the correct number of arguments
  var actual = this.args.length;
  var expected = grammar.ruleFormals[this.ruleName].length;
  if (actual !== expected) {
    throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this);
  }

  // ...and that all of the argument expressions only have valid applications and have arity 1.
  var self = this;
  this.args.forEach(function(arg) {
    arg._assertAllApplicationsAreValid(ruleName, grammar);
    if (arg.getArity() !== 1) {
      throw errors.invalidParameter(self.ruleName, arg);
    }
  });
};

},{"./common":39,"./errors":40,"./pexprs":58}],45:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract(
  'assertChoicesHaveUniformArity'
);

pexprs.any.assertChoicesHaveUniformArity =
pexprs.end.assertChoicesHaveUniformArity =
pexprs.Terminal.prototype.assertChoicesHaveUniformArity =
pexprs.Range.prototype.assertChoicesHaveUniformArity =
pexprs.Param.prototype.assertChoicesHaveUniformArity =
pexprs.Lex.prototype.assertChoicesHaveUniformArity =
pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var arity = this.terms[0].getArity();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    var otherArity = term.getArity();
    if (arity !== otherArity) {
      throw errors.inconsistentArity(ruleName, arity, otherArity, term);
    }
  }
};

pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // Extend is a special case of Alt that's guaranteed to have exactly two
  // cases: [extensions, origBody].
  var actualArity = this.terms[0].getArity();
  var expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op (not required b/c the nested expr doesn't show up in the CST)
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // The arities of the parameter expressions is required to be 1 by
  // `assertAllApplicationsAreValid()`.
};

},{"./common":39,"./errors":40,"./pexprs":58}],46:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract(
  'assertIteratedExprsAreNotNullable'
);

pexprs.any.assertIteratedExprsAreNotNullable =
pexprs.end.assertIteratedExprsAreNotNullable =
pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable =
pexprs.Range.prototype.assertIteratedExprsAreNotNullable =
pexprs.Param.prototype.assertIteratedExprsAreNotNullable =
pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
  }
};

pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
  }
};

pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  // Note: this is the implementation of this method for `Star` and `Plus` expressions.
  // It is overridden for `Opt` below.
  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
  if (this.expr.isNullable(grammar)) {
    throw errors.kleeneExprHasNullableOperand(this, ruleName);
  }
};

pexprs.Opt.prototype.assertIteratedExprsAreNotNullable =
pexprs.Not.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
};

pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  this.args.forEach(function(arg) {
    arg.assertIteratedExprsAreNotNullable(grammar, ruleName);
  });
};

},{"./common":39,"./errors":40,"./pexprs":58}],47:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.check = common.abstract('check');

pexprs.any.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.end.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === undefined;
};

pexprs.Terminal.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === this.obj;
};

pexprs.Range.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === typeof this.from;
};

pexprs.Param.prototype.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.Alt.prototype.check = function(grammar, vals) {
  for (var i = 0; i < this.terms.length; i++) {
    var term = this.terms[i];
    if (term.check(grammar, vals)) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.check = function(grammar, vals) {
  var pos = 0;
  for (var i = 0; i < this.factors.length; i++) {
    var factor = this.factors[i];
    if (factor.check(grammar, vals.slice(pos))) {
      pos += factor.getArity();
    } else {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.check = function(grammar, vals) {
  var arity = this.getArity();
  var columns = vals.slice(0, arity);
  if (columns.length !== arity) {
    return false;
  }
  var rowCount = columns[0].length;
  var i;
  for (i = 1; i < arity; i++) {
    if (columns[i].length !== rowCount) {
      return false;
    }
  }

  for (i = 0; i < rowCount; i++) {
    var row = [];
    for (var j = 0; j < arity; j++) {
      row.push(columns[j][i]);
    }
    if (!this.expr.check(grammar, row)) {
      return false;
    }
  }

  return true;
};

pexprs.Not.prototype.check = function(grammar, vals) {
  return true;
};

pexprs.Lookahead.prototype.check =
pexprs.Lex.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Apply.prototype.check = function(grammar, vals) {
  if (!(vals[0] instanceof nodes.Node &&
        vals[0].grammar === grammar &&
        vals[0].ctorName === this.ruleName)) {
    return false;
  }

  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
  // was correctly constructed.
  var ruleNode = vals[0];
  var body = grammar.ruleBodies[this.ruleName];
  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
};

pexprs.UnicodeChar.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === 'string';
};

},{"./common":39,"./nodes":42,"./pexprs":58}],48:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Trace = require('./Trace');
var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

var TerminalNode = nodes.TerminalNode;
var NonterminalNode = nodes.NonterminalNode;
var IterationNode = nodes.IterationNode;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Evaluate the expression and return `true` if it succeeds, `false` otherwise. This method should
  only be called directly by `State.prototype.eval(expr)`, which also updates the data structures
  that are used for tracing. (Making those updates in a method of `State` enables the trace-specific
  data structures to be "secrets" of that class, which is good for modularity.)

  The contract of this method is as follows:
  * When the return value is `true`,
    - the state object will have `expr.getArity()` more bindings than it did before the call.
  * When the return value is `false`,
    - the state object may have more bindings than it did before the call, and
    - its input stream's position may be anywhere.

  Note that `State.prototype.eval(expr)`, unlike this method, guarantees that neither the state
  object's bindings nor its input stream's position will change if the expression fails to match.
*/
pexprs.PExpr.prototype.eval = common.abstract('eval');  // function(state) { ... }

pexprs.any.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch) {
    var interval = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, interval));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.end.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (inputStream.atEnd()) {
    var interval = inputStream.interval(inputStream.pos);
    state.bindings.push(new TerminalNode(state.grammar, undefined, interval));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Terminal.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (!inputStream.matchString(this.obj)) {
    state.processFailure(origPos, this);
    return false;
  } else {
    var interval = inputStream.interval(origPos);
    var primitiveValue = this.obj;
    state.bindings.push(new TerminalNode(state.grammar, primitiveValue, interval));
    return true;
  }
};

pexprs.Range.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.from <= ch && ch <= this.to) {
    var interval = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, interval));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Param.prototype.eval = function(state) {
  return state.eval(state.currentApplication().args[this.index]);
};

pexprs.Lex.prototype.eval = function(state) {
  state.enterLexifiedContext();
  var ans = state.eval(this.expr);
  state.exitLexifiedContext();
  return ans;
};

pexprs.Alt.prototype.eval = function(state) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (state.eval(this.terms[idx])) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.eval = function(state) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    if (!state.eval(factor)) {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var arity = this.getArity();
  var cols = [];
  while (cols.length < arity) {
    cols.push([]);
  }
  var numMatches = 0;
  var idx;
  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
    numMatches++;
    var row = state.bindings.splice(state.bindings.length - arity, arity);
    for (idx = 0; idx < row.length; idx++) {
      cols[idx].push(row[idx]);
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  }
  var interval;
  if (numMatches === 0) {
    interval = inputStream.interval(origPos, origPos);
  } else {
    var firstCol = cols[0];
    var lastCol = cols[cols.length - 1];
    interval = inputStream.interval(
        firstCol[0].interval.startIdx,
        lastCol[lastCol.length - 1].interval.endIdx);
  }
  for (idx = 0; idx < cols.length; idx++) {
    state.bindings.push(new IterationNode(state.grammar, cols[idx], interval,
      this instanceof pexprs.Opt));
  }
  return true;
};

pexprs.Not.prototype.eval = function(state) {
  /*
    TODO:
    - Right now we're just throwing away all of the failures that happen inside a `not`, and
      recording `this` as a failed expression.
    - Double negation should be equivalent to lookahead, but that's not the case right now wrt
      failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
      a failure for 'foo' instead.
  */

  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var failuresInfo = state.getFailuresInfo();

  var ans = state.eval(this.expr);

  state.restoreFailuresInfo(failuresInfo);
  if (ans) {
    state.processFailure(origPos, this);
    return false;
  }

  inputStream.pos = origPos;
  return true;
};

pexprs.Lookahead.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (state.eval(this.expr)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.eval = function(state) {
  var caller = state.currentApplication();
  var actuals = caller ? caller.args : [];
  var app = this.substituteParams(actuals);

  var posInfo = state.getCurrentPosInfo();
  if (posInfo.isActive(app)) {
    // This rule is already active at this position, i.e., it is left-recursive.
    return app.handleCycle(state);
  }

  var memoKey = app.toMemoKey();
  var memoRec = posInfo.memo[memoKey];
  return memoRec && posInfo.shouldUseMemoizedResult(memoRec) ?
      state.useMemoizedResult(memoRec) :
      app.reallyEval(state);
};

pexprs.Apply.prototype.handleCycle = function(state) {
  var posInfo = state.getCurrentPosInfo();
  var currentLeftRecursion = posInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var memoRec = posInfo.memo[memoKey];

  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
    // We already know about this left recursion, but it's possible there are "involved
    // applications" that we don't already know about, so...
    memoRec.updateInvolvedApplicationMemoKeys();
  } else if (!memoRec) {
    // New left recursion detected! Memoize a failure to try to get a seed parse.
    memoRec = posInfo.memo[memoKey] = {pos: -1, value: false};
    posInfo.startLeftRecursion(this, memoRec);
  }
  return state.useMemoizedResult(memoRec);
};

pexprs.Apply.prototype.reallyEval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var origPosInfo = state.getCurrentPosInfo();
  var body = state.grammar.ruleBodies[this.ruleName];
  var description = state.grammar.ruleDescriptions[this.ruleName];

  origPosInfo.enter(this);

  if (description) {
    var origFailuresInfo = state.getFailuresInfo();
  }

  var value = this.evalOnce(body, state);
  var currentLR = origPosInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var isHeadOfLeftRecursion = currentLR && currentLR.headApplication.toMemoKey() === memoKey;
  var memoized = true;

  if (isHeadOfLeftRecursion) {
    value = this.growSeedResult(body, state, origPos, currentLR, value);
    origPosInfo.endLeftRecursion();
  } else if (currentLR && currentLR.isInvolved(memoKey)) {
    // Don't memoize the result
    memoized = false;
  } else {
    origPosInfo.memo[memoKey] = {
      pos: inputStream.pos,
      value: value,
      failuresAtRightmostPosition: state.cloneRightmostFailures()
    };
  }

  if (description) {
    state.restoreFailuresInfo(origFailuresInfo);
    if (!value) {
      state.processFailure(origPos, this);
    }

    if (memoized) {
      origPosInfo.memo[memoKey].failuresAtRightmostPosition = state.cloneRightmostFailures();
    }
  }

  // Record trace information in the memo table, so that it is available if the memoized result
  // is used later.
  if (state.isTracing() && origPosInfo.memo[memoKey]) {
    var succeeded = !!value;
    var entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
    entry.isLeftRecursive = isHeadOfLeftRecursion;
    origPosInfo.memo[memoKey].traceEntry = entry;
  }

  origPosInfo.exit();

  if (value) {
    state.bindings.push(value);
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.evalOnce = function(expr, state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;

  if (state.eval(expr)) {
    var arity = expr.getArity();
    var bindings = state.bindings.splice(state.bindings.length - arity, arity);
    var ans =
        new NonterminalNode(state.grammar, this.ruleName, bindings, inputStream.interval(origPos));
    return ans;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
  if (!newValue) {
    return false;
  }

  var inputStream = state.inputStream;

  while (true) {
    lrMemoRec.pos = inputStream.pos;
    lrMemoRec.value = newValue;
    lrMemoRec.failuresAtRightmostPosition = state.cloneRightmostFailures();

    if (state.isTracing()) {
      // Before evaluating the body again, add a trace node for this application to the memo entry.
      // Its only child is the trace node from `newValue`, which will always be the last element
      // in `state.trace`.
      var children = state.trace.slice(-1);
      lrMemoRec.traceEntry = new Trace(
          state.inputStream, origPos, this, true, [newValue], children);
    }
    inputStream.pos = origPos;
    newValue = this.evalOnce(body, state);
    if (inputStream.pos <= lrMemoRec.pos) {
      break;
    }
  }
  if (state.isTracing()) {
    state.trace.pop();  // Drop last trace entry since `value` was unused.
    lrMemoRec.traceEntry = null;
  }
  inputStream.pos = lrMemoRec.pos;
  return lrMemoRec.value;
};

pexprs.UnicodeChar.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.pattern.test(ch)) {
    var interval = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, interval));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

},{"./Trace":38,"./common":39,"./nodes":42,"./pexprs":58}],49:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getArity = common.abstract('getArity');

pexprs.any.getArity =
pexprs.end.getArity =
pexprs.Terminal.prototype.getArity =
pexprs.Range.prototype.getArity =
pexprs.Param.prototype.getArity =
pexprs.Apply.prototype.getArity =
pexprs.UnicodeChar.prototype.getArity = function() {
  return 1;
};

pexprs.Alt.prototype.getArity = function() {
  // This is ok b/c all terms must have the same arity -- this property is
  // checked by the Grammar constructor.
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};

pexprs.Seq.prototype.getArity = function() {
  var arity = 0;
  for (var idx = 0; idx < this.factors.length; idx++) {
    arity += this.factors[idx].getArity();
  }
  return arity;
};

pexprs.Iter.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Not.prototype.getArity = function() {
  return 0;
};

pexprs.Lookahead.prototype.getArity =
pexprs.Lex.prototype.getArity = function() {
  return this.expr.getArity();
};

},{"./common":39,"./pexprs":58}],50:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Called at grammar creation time to rewrite a rule body, replacing each reference to a formal
  parameter with a `Param` node. Returns a PExpr -- either a new one, or the original one if
  it was modified in place.
*/
pexprs.PExpr.prototype.introduceParams = common.abstract('introduceParams');

pexprs.any.introduceParams =
pexprs.end.introduceParams =
pexprs.Terminal.prototype.introduceParams =
pexprs.Range.prototype.introduceParams =
pexprs.Param.prototype.introduceParams =
pexprs.UnicodeChar.prototype.introduceParams = function(formals) {
  return this;
};

pexprs.Alt.prototype.introduceParams = function(formals) {
  this.terms.forEach(function(term, idx, terms) {
    terms[idx] = term.introduceParams(formals);
  });
  return this;
};

pexprs.Seq.prototype.introduceParams = function(formals) {
  this.factors.forEach(function(factor, idx, factors) {
    factors[idx] = factor.introduceParams(formals);
  });
  return this;
};

pexprs.Iter.prototype.introduceParams =
pexprs.Not.prototype.introduceParams =
pexprs.Lookahead.prototype.introduceParams =
pexprs.Lex.prototype.introduceParams = function(formals) {
  this.expr = this.expr.introduceParams(formals);
  return this;
};

pexprs.Apply.prototype.introduceParams = function(formals) {
  var index = formals.indexOf(this.ruleName);
  if (index >= 0) {
    if (this.args.length > 0) {
      // TODO: Should this be supported? See issue #64.
      throw new Error('Parameterized rules cannot be passed as arguments to another rule.');
    }
    return new pexprs.Param(index);
  } else {
    this.args.forEach(function(arg, idx, args) {
      args[idx] = arg.introduceParams(formals);
    });
    return this;
  }
};

},{"./common":39,"./pexprs":58}],51:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns `true` if this parsing expression may accept without consuming any input.
pexprs.PExpr.prototype.isNullable = function(grammar) {
  return this._isNullable(grammar, Object.create(null));
};

pexprs.PExpr.prototype._isNullable = common.abstract('_isNullable');

pexprs.any._isNullable =
pexprs.Range.prototype._isNullable =
pexprs.Param.prototype._isNullable =
pexprs.Plus.prototype._isNullable =
pexprs.UnicodeChar.prototype._isNullable = function(grammar, memo) {
  return false;
};

pexprs.end._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Terminal.prototype._isNullable = function(grammar, memo) {
  if (typeof this.obj === 'string') {
    // This is an over-simplification: it's only correct if the input is a string. If it's an array
    // or an object, then the empty string parsing expression is not nullable.
    return this.obj === '';
  } else {
    return false;
  }
};

pexprs.Alt.prototype._isNullable = function(grammar, memo) {
  return this.terms.length === 0 ||
      this.terms.some(function(term) { return term._isNullable(grammar, memo); });
};

pexprs.Seq.prototype._isNullable = function(grammar, memo) {
  return this.factors.every(function(factor) { return factor._isNullable(grammar, memo); });
};

pexprs.Star.prototype._isNullable =
pexprs.Opt.prototype._isNullable =
pexprs.Not.prototype._isNullable =
pexprs.Lookahead.prototype._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Lex.prototype._isNullable = function(grammar, memo) {
  return this.expr._isNullable(grammar, memo);
};

pexprs.Apply.prototype._isNullable = function(grammar, memo) {
  var key = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
    var body = grammar.ruleBodies[this.ruleName];
    var inlined = body.substituteParams(this.args);
    memo[key] = false;  // Prevent infinite recursion for recursive rules.
    memo[key] = inlined._isNullable(grammar, memo);
  }
  return memo[key];
};

},{"./common":39,"./pexprs":58}],52:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getMetaInfo(expr, grammarInterval) {
  var metaInfo = {};
  if (expr.interval && grammarInterval) {
    var adjusted = expr.interval.relativeTo(grammarInterval);
    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
  }
  return metaInfo;
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract('outputRecipe');

pexprs.any.outputRecipe = function(formals, grammarInterval) {
  return ['any', getMetaInfo(this, grammarInterval)];
};

pexprs.end.outputRecipe = function(formals, grammarInterval) {
  return ['end', getMetaInfo(this, grammarInterval)];
};

pexprs.Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'terminal',
    getMetaInfo(this, grammarInterval),
    this.obj
  ];
};

pexprs.Range.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'range',
    getMetaInfo(this, grammarInterval),
    this.from,
    this.to
  ];
};

pexprs.Param.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'param',
    getMetaInfo(this, grammarInterval),
    this.index
  ];
};

pexprs.Alt.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'alt',
    getMetaInfo(this, grammarInterval)
  ].concat(this.terms.map(function(term) {
    return term.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Extend.prototype.outputRecipe = function(formals, grammarInterval) {
  var extension = this.terms[0]; // [extension, orginal]
  return extension.outputRecipe(formals, grammarInterval);
};

pexprs.Seq.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'seq',
    getMetaInfo(this, grammarInterval)
  ].concat(this.factors.map(function(factor) {
    return factor.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Star.prototype.outputRecipe =
pexprs.Plus.prototype.outputRecipe =
pexprs.Opt.prototype.outputRecipe =
pexprs.Not.prototype.outputRecipe =
pexprs.Lookahead.prototype.outputRecipe =
pexprs.Lex.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    this.constructor.name.toLowerCase(),
    getMetaInfo(this, grammarInterval),
    this.expr.outputRecipe(formals, grammarInterval)
  ];
};

pexprs.Apply.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'app',
    getMetaInfo(this, grammarInterval),
    this.ruleName,
    this.args.map(function(arg) {
      return arg.outputRecipe(formals, grammarInterval);
    })
  ];
};

pexprs.UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'unicodeChar',
    getMetaInfo(this, grammarInterval),
    this.category
  ];
};

},{"./common":39,"./pexprs":58}],53:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a PExpr that results from recursively replacing every formal parameter (i.e., instance
  of `Param`) inside this PExpr with its actual value from `actuals` (an Array).

  The receiver must not be modified; a new PExpr must be returned if any replacement is necessary.
*/
// function(actuals) { ... }
pexprs.PExpr.prototype.substituteParams = common.abstract('substituteParams');

pexprs.any.substituteParams =
pexprs.end.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.Range.prototype.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.UnicodeChar.prototype.substituteParams = function(actuals) {
  return this;
};

pexprs.Param.prototype.substituteParams = function(actuals) {
  return actuals[this.index];
};

pexprs.Alt.prototype.substituteParams = function(actuals) {
  return new pexprs.Alt(
      this.terms.map(function(term) { return term.substituteParams(actuals); }));
};

pexprs.Seq.prototype.substituteParams = function(actuals) {
  return new pexprs.Seq(
      this.factors.map(function(factor) { return factor.substituteParams(actuals); }));
};

pexprs.Iter.prototype.substituteParams =
pexprs.Not.prototype.substituteParams =
pexprs.Lookahead.prototype.substituteParams =
pexprs.Lex.prototype.substituteParams = function(actuals) {
  return new this.constructor(this.expr.substituteParams(actuals));
};

pexprs.Apply.prototype.substituteParams = function(actuals) {
  if (this.args.length === 0) {
    // Avoid making a copy of this application, as an optimization
    return this;
  } else {
    var args = this.args.map(function(arg) { return arg.substituteParams(actuals); });
    return new pexprs.Apply(this.ruleName, args);
  }
};

},{"./common":39,"./pexprs":58}],54:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

var copyWithoutDuplicates = common.copyWithoutDuplicates;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function isRestrictedJSIdentifier(str) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a list of strings that will be used as the default argument names for its receiver
  (a pexpr) in a semantic action. This is used exclusively by the Semantics Editor.

  `firstArgIndex` is the 1-based index of the first argument name that will be generated for this
  pexpr. It enables us to name arguments positionally, e.g., if the second argument is a
  non-alphanumeric terminal like "+", it will be named '$2'.

  Here is a more elaborate example that illustrates how this method works:
  `(a "+" b).toArgumentNameList(1)` evaluates to `['a', '$2', 'b']` with the following recursive
  calls:

    (a).toArgumentNameList(1) -> ['a'],
    ("+").toArgumentNameList(2) -> ['$2'],
    (b).toArgumentNameList(3) -> ['b']

  Notes:
  * This method must only be called on well-formed expressions, e.g., the receiver must
    not have any Alt sub-expressions with inconsistent arities.
  * e.getArity() === e.toArgumentNameList(1).length
*/
// function(firstArgIndex) { ... }
pexprs.PExpr.prototype.toArgumentNameList = common.abstract('toArgumentNameList');

pexprs.any.toArgumentNameList = function(firstArgIndex) {
  return ['any'];
};

pexprs.end.toArgumentNameList = function(firstArgIndex) {
  return ['end'];
};

pexprs.Terminal.prototype.toArgumentNameList = function(firstArgIndex) {
  if (typeof this.obj === 'string' && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
    // If this terminal is a valid suffix for a JS identifier, just prepend it with '_'
    return ['_' + this.obj];
  } else {
    // Otherwise, name it positionally.
    return ['$' + firstArgIndex];
  }
};

pexprs.Range.prototype.toArgumentNameList = function(firstArgIndex) {
  var argName = this.from + '_to_' + this.to;
  // If the `argName` is not valid then try to prepend a `_`.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '_' + argName;
  }
  // If the `argName` still not valid after prepending a `_`, then name it positionally.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '$' + firstArgIndex;
  }
  return [argName];
};

pexprs.Alt.prototype.toArgumentNameList = function(firstArgIndex) {
  // `termArgNameLists` is an array of arrays where each row is the
  // argument name list that corresponds to a term in this alternation.
  var termArgNameLists = this.terms.map(function(term) {
    return term.toArgumentNameList(firstArgIndex);
  });

  var argumentNameList = [];
  var numArgs = termArgNameLists[0].length;
  for (var colIdx = 0; colIdx < numArgs; colIdx++) {
    var col = [];
    for (var rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
      col.push(termArgNameLists[rowIdx][colIdx]);
    }
    var uniqueNames = copyWithoutDuplicates(col);
    argumentNameList.push(uniqueNames.join('_or_'));
  }

  return argumentNameList;
};

pexprs.Seq.prototype.toArgumentNameList = function(firstArgIndex) {
  // Generate the argument name list, without worrying about duplicates.
  var argumentNameList = [];
  this.factors.forEach(function(factor) {
    var factorArgumentNameList = factor.toArgumentNameList(firstArgIndex);
    argumentNameList = argumentNameList.concat(factorArgumentNameList);

    // Shift the firstArgIndex to take this factor's argument names into account.
    firstArgIndex += factorArgumentNameList.length;
  });

  // `count` is used to record the number of times each argument name occurs in the list,
  // this is useful for checking duplicated argument name. It maps argument names to ints.
  var count = Object.create(null);
  argumentNameList.forEach(function(argName) {
    count[argName] = (count[argName] || 0) + 1;
  });

  // Append subscripts ('_1', '_2', ...) to duplicate argument names.
  Object.keys(count).forEach(function(dupArgName) {
    if (count[dupArgName] <= 1) {
      return;
    }

    // This name shows up more than once, so add subscripts.
    var subscript = 1;
    argumentNameList.forEach(function(argName, idx) {
      if (argName === dupArgName) {
        argumentNameList[idx] = argName + '_' + subscript++;
      }
    });
  });

  return argumentNameList;
};

pexprs.Iter.prototype.toArgumentNameList = function(firstArgIndex) {
  return this.expr.toArgumentNameList(firstArgIndex).map(function(exprArgumentString) {
    return exprArgumentString[exprArgumentString.length - 1] === 's' ?
        exprArgumentString + 'es' :
        exprArgumentString + 's';
  });
};

pexprs.Opt.prototype.toArgumentNameList = function(firstArgIndex) {
  return this.expr.toArgumentNameList(firstArgIndex).map(function(argName) {
    return 'opt' + argName[0].toUpperCase() + argName.slice(1);
  });
};

pexprs.Not.prototype.toArgumentNameList = function(firstArgIndex) {
  return [];
};

pexprs.Lookahead.prototype.toArgumentNameList =
pexprs.Lex.prototype.toArgumentNameList = function(firstArgIndex) {
  return this.expr.toArgumentNameList(firstArgIndex);
};

pexprs.Apply.prototype.toArgumentNameList = function(firstArgIndex) {
  return [this.ruleName];
};

pexprs.UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex) {
  return '$' + firstArgIndex;
};

// "Value pexprs" (Value, Str, Arr, Obj) are going away soon, so we don't worry about them here.

},{"./common":39,"./pexprs":58}],55:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns a string representing the PExpr, for use as a UI label, etc.
pexprs.PExpr.prototype.toDisplayString = common.abstract('toDisplayString');

pexprs.Alt.prototype.toDisplayString =
pexprs.Seq.prototype.toDisplayString =
pexprs.Iter.prototype.toDisplayString =
pexprs.Not.prototype.toDisplayString =
pexprs.Lookahead.prototype.toDisplayString =
pexprs.Lex.prototype.toDisplayString = function() {
  if (this.interval) {
    return this.interval.trimmed().contents;
  }
  return '[' + this.constructor.name + ']';
};

pexprs.any.toDisplayString = function() {
  return 'any';
};

pexprs.end.toDisplayString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toDisplayString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toDisplayString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toDisplayString = function() {
  return '#' + this.index;
};

pexprs.Apply.prototype.toDisplayString = function() {
  return this.toString();
};

pexprs.UnicodeChar.prototype.toDisplayString = function() {
  return 'Unicode {' + this.category + '} character';
};

},{"./common":39,"./pexprs":58}],56:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Failure = require('./Failure');
var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toFailure = common.abstract('toFailure');

pexprs.any.toFailure = function(grammar) {
  return new Failure(this, 'any object', 'description');
};

pexprs.end.toFailure = function(grammar) {
  return new Failure(this, 'end of input', 'description');
};

pexprs.Terminal.prototype.toFailure = function(grammar) {
  return new Failure(this, this.obj, 'string');
};

pexprs.Range.prototype.toFailure = function(grammar) {
  // TODO: come up with something better
  return new Failure(this, JSON.stringify(this.from) + '..' + JSON.stringify(this.to), 'code');
};

pexprs.Not.prototype.toFailure = function(grammar) {
  var description = this.expr === pexprs.any ?
      'nothing' :
      'not ' + this.expr.toFailure(grammar);
  return new Failure(this, description, 'description');
};

pexprs.Apply.prototype.toFailure = function(grammar) {
  var description = grammar.ruleDescriptions[this.ruleName];
  if (!description) {
    var article = (/^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a');
    description = article + ' ' + this.ruleName;
  }
  return new Failure(this, description, 'description');
};

pexprs.UnicodeChar.prototype.toFailure = function(grammar) {
  return new Failure(this, this.toDisplayString(), 'description');
};

},{"./Failure":28,"./common":39,"./pexprs":58}],57:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
  Note that this is not an iff (<==>): e.g.,
  (~"b" "a").toString() !== ("a").toString(), even though
  ~"b" "a" and "a" are interchangeable in any grammar,
  both in terms of the languages they accept and their arities.
*/
pexprs.PExpr.prototype.toString = common.abstract('toString');

pexprs.any.toString = function() {
  return 'any';
};

pexprs.end.toString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toString = function() {
  return '$' + this.index;
};

pexprs.Lex.prototype.toString = function() {
  return '#(' + this.expr.toString() + ')';
};

pexprs.Alt.prototype.toString = function() {
  return this.terms.length === 1 ?
    this.terms[0].toString() :
    '(' + this.terms.map(function(term) { return term.toString(); }).join(' | ') + ')';
};

pexprs.Seq.prototype.toString = function() {
  return this.factors.length === 1 ?
    this.factors[0].toString() :
    '(' + this.factors.map(function(factor) { return factor.toString(); }).join(' ') + ')';
};

pexprs.Iter.prototype.toString = function() {
  return this.expr + this.operator;
};

pexprs.Not.prototype.toString = function() {
  return '~' + this.expr;
};

pexprs.Lookahead.prototype.toString = function() {
  return '&' + this.expr;
};

pexprs.Apply.prototype.toString = function() {
  if (this.args.length > 0) {
    var ps = this.args.map(function(arg) { return arg.toString(); });
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toString = function() {
  return '\\p{' + this.category + '}';
};

},{"./common":39,"./pexprs":58}],58:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var UnicodeCategories = require('../third_party/UnicodeCategories');
var common = require('./common');
var errors = require('./errors');
var inherits = require('inherits');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw new Error("PExpr cannot be instantiated -- it's abstract");
}

// Set the `interval` property to the interval containing the source for this expression.
PExpr.prototype.withInterval = function(interval) {
  if (interval) {
    this.interval = interval.trimmed();
  }
  return this;
};

// Any

var any = Object.create(PExpr.prototype);

// End

var end = Object.create(PExpr.prototype);

// Terminals

function Terminal(obj) {
  this.obj = obj;
}
inherits(Terminal, PExpr);

// Ranges

function Range(from, to) {
  this.from = from;
  this.to = to;
}
inherits(Range, PExpr);

// Parameters

function Param(index) {
  this.index = index;
}
inherits(Param, PExpr);

// Alternation

function Alt(terms) {
  this.terms = terms;
}
inherits(Alt, PExpr);

// Extend is an implementation detail of rule extension

function Extend(superGrammar, name, body) {
  this.superGrammar = superGrammar;
  this.name = name;
  this.body = body;
  var origBody = superGrammar.ruleBodies[name];
  this.terms = [body, origBody];
}
inherits(Extend, Alt);

// Sequences

function Seq(factors) {
  this.factors = factors;
}
inherits(Seq, PExpr);

// Iterators and optionals

function Iter(expr) {
  this.expr = expr;
}
inherits(Iter, PExpr);

function Star(expr) {
  this.expr = expr;
}
inherits(Star, Iter);

function Plus(expr) {
  this.expr = expr;
}
inherits(Plus, Iter);

function Opt(expr) {
  this.expr = expr;
}
inherits(Opt, Iter);

Star.prototype.operator = '*';
Plus.prototype.operator = '+';
Opt.prototype.operator = '?';

Star.prototype.minNumMatches = 0;
Plus.prototype.minNumMatches = 1;
Opt.prototype.minNumMatches = 0;

Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Opt.prototype.maxNumMatches = 1;

// Predicates

function Not(expr) {
  this.expr = expr;
}
inherits(Not, PExpr);

function Lookahead(expr) {
  this.expr = expr;
}
inherits(Lookahead, PExpr);

// "Lexification"

function Lex(expr) {
  this.expr = expr;
}
inherits(Lex, PExpr);

// Array decomposition

function Arr(expr) {
  this.expr = expr;
}
inherits(Arr, PExpr);

// String decomposition

function Str(expr) {
  this.expr = expr;
}
inherits(Str, PExpr);

// Object decomposition

function Obj(properties, isLenient) {
  var names = properties.map(function(property) { return property.name; });
  var duplicates = common.getDuplicates(names);
  if (duplicates.length > 0) {
    throw errors.duplicatePropertyNames(duplicates);
  } else {
    this.properties = properties;
    this.isLenient = isLenient;
  }
}
inherits(Obj, PExpr);

// Rule application

function Apply(ruleName, optArgs) {
  this.ruleName = ruleName;
  this.args = optArgs || [];
}
inherits(Apply, PExpr);

Apply.prototype.isSyntactic = function() {
  return common.isSyntactic(this.ruleName);
};

// This method just caches the result of `this.toString()` in a non-enumerable property.
Apply.prototype.toMemoKey = function() {
  if (!this._memoKey) {
    Object.defineProperty(this, '_memoKey', {value: this.toString()});
  }
  return this._memoKey;
};

// Unicode character

function UnicodeChar(category) {
  this.category = category;
  this.pattern = UnicodeCategories[category];
}
inherits(UnicodeChar, PExpr);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.PExpr = PExpr;
exports.any = any;
exports.end = end;
exports.Terminal = Terminal;
exports.Range = Range;
exports.Param = Param;
exports.Alt = Alt;
exports.Extend = Extend;
exports.Seq = Seq;
exports.Iter = Iter;
exports.Star = Star;
exports.Plus = Plus;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Lex = Lex;
exports.Arr = Arr;
exports.Str = Str;
exports.Obj = Obj;
exports.Apply = Apply;
exports.UnicodeChar = UnicodeChar;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

require('./pexprs-allowsSkippingPrecedingSpace');
require('./pexprs-assertAllApplicationsAreValid');
require('./pexprs-assertChoicesHaveUniformArity');
require('./pexprs-assertIteratedExprsAreNotNullable');
require('./pexprs-check');
require('./pexprs-eval');
require('./pexprs-getArity');
require('./pexprs-outputRecipe');
require('./pexprs-introduceParams');
require('./pexprs-isNullable');
require('./pexprs-substituteParams');
require('./pexprs-toDisplayString');
require('./pexprs-toArgumentNameList');
require('./pexprs-toFailure');
require('./pexprs-toString');

},{"../third_party/UnicodeCategories":60,"./common":39,"./errors":40,"./pexprs-allowsSkippingPrecedingSpace":43,"./pexprs-assertAllApplicationsAreValid":44,"./pexprs-assertChoicesHaveUniformArity":45,"./pexprs-assertIteratedExprsAreNotNullable":46,"./pexprs-check":47,"./pexprs-eval":48,"./pexprs-getArity":49,"./pexprs-introduceParams":50,"./pexprs-isNullable":51,"./pexprs-outputRecipe":52,"./pexprs-substituteParams":53,"./pexprs-toArgumentNameList":54,"./pexprs-toDisplayString":55,"./pexprs-toFailure":56,"./pexprs-toString":57,"inherits":24}],59:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Given an array of numbers `arr`, return an array of the numbers as strings,
// right-justified and padded to the same length.
function padNumbersToEqualLength(arr) {
  var maxLen = 0;
  var strings = arr.map(function(n) {
    var str = n.toString();
    maxLen = Math.max(maxLen, str.length);
    return str;
  });
  return strings.map(function(s) { return common.padLeft(s, maxLen); });
}

// Produce a new string that would be the result of copying the contents
// of the string `src` onto `dest` at offset `offest`.
function strcpy(dest, src, offset) {
  var origDestLen = dest.length;
  var start = dest.slice(0, offset);
  var end = dest.slice(offset + src.length);
  return (start + src + end).substr(0, origDestLen);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Return an object with the line and column information for the given
// offset in `str`.
exports.getLineAndColumn = function(str, offset) {
  var lineNum = 1;
  var colNum = 1;

  var currOffset = 0;
  var lineStartOffset = 0;

  var nextLine = null;
  var prevLine = null;
  var prevLineStartOffset = -1;

  while (currOffset < offset) {
    var c = str.charAt(currOffset++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      prevLineStartOffset = lineStartOffset;
      lineStartOffset = currOffset;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  // Find the end of the target line.
  var lineEndOffset = str.indexOf('\n', lineStartOffset);
  if (lineEndOffset === -1) {
    lineEndOffset = str.length;
  } else {
    // Get the next line.
    var nextLineEndOffset = str.indexOf('\n', lineEndOffset + 1);
    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset)
                                        : str.slice(lineEndOffset, nextLineEndOffset);
    // Strip leading and trailing EOL char(s).
    nextLine = nextLine.replace(/^\r?\n/, '').replace(/\r$/, '');
  }

  // Get the previous line.
  if (prevLineStartOffset >= 0) {
    prevLine = str.slice(prevLineStartOffset, lineStartOffset)
                  .replace(/\r?\n$/, '');  // Strip trailing EOL char(s).
  }

  // Get the target line, stripping a trailing carriage return if necessary.
  var line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, '');

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: line,
    prevLine: prevLine,
    nextLine: nextLine
  };
};

// Return a nicely-formatted string describing the line and column for the
// given offset in `str`.
exports.getLineAndColumnMessage = function(str, offset /* ...ranges */) {
  var repeatStr = common.repeatStr;

  var lineAndCol = exports.getLineAndColumn(str, offset);
  var sb = new common.StringBuffer();
  sb.append('Line ' + lineAndCol.lineNum + ', col ' + lineAndCol.colNum + ':\n');

  // An array of the previous, current, and next line numbers as strings of equal length.
  var lineNumbers = padNumbersToEqualLength([
      lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
      lineAndCol.lineNum,
      lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
  ]);

  // Helper for appending formatting input lines to the buffer.
  function appendLine(num, content, prefix) {
    sb.append(prefix + lineNumbers[num] + ' | ' + content + '\n');
  }

  // Include the previous line for context if possible.
  if (lineAndCol.prevLine != null) {
    appendLine(0, lineAndCol.prevLine, '  ');
  }
  // Line that the error occurred on.
  appendLine(1, lineAndCol.line, '> ');

  // Build up the line that points to the offset and possible indicates one or more ranges.
  // Start with a blank line, and indicate each range by overlaying a string of `~` chars.
  var lineLen = lineAndCol.line.length;
  var indicationLine = repeatStr(' ', lineLen + 1);
  var ranges = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < ranges.length; ++i) {
    var startIdx = ranges[i][0];
    var endIdx = ranges[i][1];
    common.assert(startIdx >= 0 && startIdx <= endIdx, 'range start must be >= 0 and <= end');

    var lineStartOffset = offset - lineAndCol.colNum + 1;
    startIdx = Math.max(0, startIdx - lineStartOffset);
    endIdx = Math.min(endIdx - lineStartOffset, lineLen);

    indicationLine = strcpy(indicationLine, repeatStr('~', endIdx - startIdx), startIdx);
  }
  var gutterWidth = 2 + lineNumbers[1].length + 3;
  sb.append(repeatStr(' ', gutterWidth));
  indicationLine = strcpy(indicationLine, '^', lineAndCol.colNum - 1);
  sb.append(indicationLine.replace(/ +$/, '') + '\n');

  // Include the next line for context if possible.
  if (lineAndCol.nextLine != null) {
    appendLine(2, lineAndCol.nextLine, '  ');
  }
  return sb.contents();
};

},{"./common":39}],60:[function(require,module,exports){
// Based on https://github.com/tvcutsem/es-lab/blob/master/src/parser/unicode.js.
// These are just categories that are used in ES5.
// The full list of Unicode categories is here: http://www.fileformat.info/info/unicode/category/index.htm.
module.exports = {
  // Letters
  Lu: /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]/,
  Ll: /[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]/,
  Lt: /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]/,
  Lm: /[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]/,
  Lo: /[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,

  // Numbers
  Nl: /[\u2160-\u2182]|[\u3007-\u3007]|[\u3021-\u3029]/,
  Nd: /[\u0030-\u0039]|[\u0660-\u0669]|[\u06F0-\u06F9]|[\u0966-\u096F]|[\u09E6-\u09EF]|[\u0A66-\u0A6F]|[\u0AE6-\u0AEF]|[\u0B66-\u0B6F]|[\u0BE7-\u0BEF]|[\u0C66-\u0C6F]|[\u0CE6-\u0CEF]|[\u0D66-\u0D6F]|[\u0E50-\u0E59]|[\u0ED0-\u0ED9]|[\u0F20-\u0F29]|[\uFF10-\uFF19]/,

  // Marks
  Mn: /[\u0300-\u0345]|[\u0360-\u0361]|[\u0483-\u0486]|[\u0591-\u05A1]|[\u05A3-\u05B9]|[\u05BB-\u05BD]|[\u05BF-\u05BF]|[\u05C1-\u05C2]|[\u05C4-\u05C4]|[\u064B-\u0652]|[\u0670-\u0670]|[\u06D6-\u06DC]|[\u06DF-\u06E4]|[\u06E7-\u06E8]|[\u06EA-\u06ED]|[\u0901-\u0902]|[\u093C-\u093C]|[\u0941-\u0948]|[\u094D-\u094D]|[\u0951-\u0954]|[\u0962-\u0963]|[\u0981-\u0981]|[\u09BC-\u09BC]|[\u09C1-\u09C4]|[\u09CD-\u09CD]|[\u09E2-\u09E3]|[\u0A02-\u0A02]|[\u0A3C-\u0A3C]|[\u0A41-\u0A42]|[\u0A47-\u0A48]|[\u0A4B-\u0A4D]|[\u0A70-\u0A71]|[\u0A81-\u0A82]|[\u0ABC-\u0ABC]|[\u0AC1-\u0AC5]|[\u0AC7-\u0AC8]|[\u0ACD-\u0ACD]|[\u0B01-\u0B01]|[\u0B3C-\u0B3C]|[\u0B3F-\u0B3F]|[\u0B41-\u0B43]|[\u0B4D-\u0B4D]|[\u0B56-\u0B56]|[\u0B82-\u0B82]|[\u0BC0-\u0BC0]|[\u0BCD-\u0BCD]|[\u0C3E-\u0C40]|[\u0C46-\u0C48]|[\u0C4A-\u0C4D]|[\u0C55-\u0C56]|[\u0CBF-\u0CBF]|[\u0CC6-\u0CC6]|[\u0CCC-\u0CCD]|[\u0D41-\u0D43]|[\u0D4D-\u0D4D]|[\u0E31-\u0E31]|[\u0E34-\u0E3A]|[\u0E47-\u0E4E]|[\u0EB1-\u0EB1]|[\u0EB4-\u0EB9]|[\u0EBB-\u0EBC]|[\u0EC8-\u0ECD]|[\u0F18-\u0F19]|[\u0F35-\u0F35]|[\u0F37-\u0F37]|[\u0F39-\u0F39]|[\u0F71-\u0F7E]|[\u0F80-\u0F84]|[\u0F86-\u0F87]|[\u0F90-\u0F95]|[\u0F97-\u0F97]|[\u0F99-\u0FAD]|[\u0FB1-\u0FB7]|[\u0FB9-\u0FB9]|[\u20D0-\u20DC]|[\u20E1-\u20E1]|[\u302A-\u302F]|[\u3099-\u309A]|[\uFB1E-\uFB1E]|[\uFE20-\uFE23]/,
  Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,

  // Punctuation, Connector
  Pc: /[\u005F-\u005F]|[\u203F-\u2040]|[\u30FB-\u30FB]|[\uFE33-\uFE34]|[\uFE4D-\uFE4F]|[\uFF3F-\uFF3F]|[\uFF65-\uFF65]/,

  // Separator, Space
  Zs: /[\u2000-\u200B]|[\u3000-\u3000]/,

  // These two are not real Unicode categories, but our useful for Ohm.
  // L is a combination of all the letter categories.
  // Ltmo is a combination of Lt, Lm, and Lo.
  L: /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]|[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]|[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]|[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]|[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,
  Ltmo: /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2][\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F][\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/
};

},{}]},{},[41])(41)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2J1aWx0LWluLXJ1bGVzLmpzIiwiZGlzdC9vaG0tZ3JhbW1hci5qcyIsImRpc3Qvb3BlcmF0aW9ucy1hbmQtYXR0cmlidXRlcy5qcyIsImV4dHJhcy9pbmRleC5qcyIsImV4dHJhcy9zZW1hbnRpY3MtdG9BU1QuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvaXMtc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pcy1pbXBsZW1lbnRlZC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvaXMtaW1wbGVtZW50ZWQuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pcy1pbXBsZW1lbnRlZC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL25vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL3NoaW0uanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL3ZhbGlkYXRlLXN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91dGlsLWV4dGVuZC9leHRlbmQuanMiLCJzcmMvQnVpbGRlci5qcyIsInNyYy9GYWlsdXJlLmpzIiwic3JjL0dyYW1tYXIuanMiLCJzcmMvR3JhbW1hckRlY2wuanMiLCJzcmMvSW5wdXRTdHJlYW0uanMiLCJzcmMvSW50ZXJ2YWwuanMiLCJzcmMvTWF0Y2hSZXN1bHQuanMiLCJzcmMvTmFtZXNwYWNlLmpzIiwic3JjL1Bvc0luZm8uanMiLCJzcmMvU2VtYW50aWNzLmpzIiwic3JjL1N0YXRlLmpzIiwic3JjL1RyYWNlLmpzIiwic3JjL2NvbW1vbi5qcyIsInNyYy9lcnJvcnMuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9ub2Rlcy5qcyIsInNyYy9wZXhwcnMtYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZS5qcyIsInNyYy9wZXhwcnMtYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQuanMiLCJzcmMvcGV4cHJzLWFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5LmpzIiwic3JjL3BleHBycy1hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUuanMiLCJzcmMvcGV4cHJzLWNoZWNrLmpzIiwic3JjL3BleHBycy1ldmFsLmpzIiwic3JjL3BleHBycy1nZXRBcml0eS5qcyIsInNyYy9wZXhwcnMtaW50cm9kdWNlUGFyYW1zLmpzIiwic3JjL3BleHBycy1pc051bGxhYmxlLmpzIiwic3JjL3BleHBycy1vdXRwdXRSZWNpcGUuanMiLCJzcmMvcGV4cHJzLXN1YnN0aXR1dGVQYXJhbXMuanMiLCJzcmMvcGV4cHJzLXRvQXJndW1lbnROYW1lTGlzdC5qcyIsInNyYy9wZXhwcnMtdG9EaXNwbGF5U3RyaW5nLmpzIiwic3JjL3BleHBycy10b0ZhaWx1cmUuanMiLCJzcmMvcGV4cHJzLXRvU3RyaW5nLmpzIiwic3JjL3BleHBycy5qcyIsInNyYy91dGlsLmpzIiwidGhpcmRfcGFydHkvVW5pY29kZUNhdGVnb3JpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbHFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgb2htID0gcmVxdWlyZSgnLi4nKTtcbm1vZHVsZS5leHBvcnRzID0gb2htLm1ha2VSZWNpcGUoW1wiZ3JhbW1hclwiLHtcInNvdXJjZVwiOlwiQnVpbHRJblJ1bGVzIHtcXG5cXG4gIGFsbnVtICAoYW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXIpXFxuICAgID0gbGV0dGVyXFxuICAgIHwgZGlnaXRcXG5cXG4gIGxldHRlciAgKGEgbGV0dGVyKVxcbiAgICA9IGxvd2VyXFxuICAgIHwgdXBwZXJcXG4gICAgfCB1bmljb2RlTHRtb1xcblxcbiAgZGlnaXQgIChhIGRpZ2l0KVxcbiAgICA9IFxcXCIwXFxcIi4uXFxcIjlcXFwiXFxuXFxuICBoZXhEaWdpdCAgKGEgaGV4YWRlY2ltYWwgZGlnaXQpXFxuICAgID0gZGlnaXRcXG4gICAgfCBcXFwiYVxcXCIuLlxcXCJmXFxcIlxcbiAgICB8IFxcXCJBXFxcIi4uXFxcIkZcXFwiXFxuXFxuICBMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IE5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgfCBFbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuXFxuICBOb25lbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gZWxlbSAoc2VwIGVsZW0pKlxcblxcbiAgRW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IC8qIG5vdGhpbmcgKi9cXG5cXG4gIGxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gbm9uZW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICB8IGVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG5cXG4gIG5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgPSBlbGVtIChzZXAgZWxlbSkqXFxuXFxuICBlbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gLyogbm90aGluZyAqL1xcblxcbn1cIn0sXCJCdWlsdEluUnVsZXNcIixudWxsLG51bGwse1wiYWxudW1cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOCw3OF19LFwiYW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MCw3OF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYwLDY2XX0sXCJsZXR0ZXJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzMsNzhdfSxcImRpZ2l0XCIsW11dXV0sXCJsZXR0ZXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MiwxNDJdfSxcImEgbGV0dGVyXCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA3LDE0Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNywxMTJdfSxcImxvd2VyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOSwxMjRdfSxcInVwcGVyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxNDJdfSxcInVuaWNvZGVMdG1vXCIsW11dXV0sXCJkaWdpdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0NiwxNzddfSxcImEgZGlnaXRcIixbXSxbXCJyYW5nZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2OSwxNzddfSxcIjBcIixcIjlcIl1dLFwiaGV4RGlnaXRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODEsMjU0XX0sXCJhIGhleGFkZWNpbWFsIGRpZ2l0XCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5LDI1NF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxOSwyMjRdfSxcImRpZ2l0XCIsW11dLFtcInJhbmdlXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMxLDIzOV19LFwiYVwiLFwiZlwiXSxbXCJyYW5nZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0NiwyNTRdfSxcIkFcIixcIkZcIl1dXSxcIkxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1OCwzMzZdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyODIsMzM2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjgyLDMwN119LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE0LDMzNl19LFwiRW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV1dXSxcIk5vbmVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzQwLDM4OF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3MiwzODhdfSxbXCJwYXJhbVwiLHt9LDBdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzg4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc4LDM4Nl19LFtcInBhcmFtXCIse30sMV0sW1wicGFyYW1cIix7fSwwXV1dXV0sXCJFbXB0eUxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM5Miw0MzRdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0MzgsNDM4XX1dXSxcImxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQzOCw1MTZdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NjIsNTE2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDYyLDQ4N119LFwibm9uZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDk0LDUxNl19LFwiZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV1dXSxcIm5vbmVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTIwLDU2OF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU1Miw1NjhdfSxbXCJwYXJhbVwiLHt9LDBdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NTcsNTY4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTU4LDU2Nl19LFtcInBhcmFtXCIse30sMV0sW1wicGFyYW1cIix7fSwwXV1dXV0sXCJlbXB0eUxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU3Miw2MTRdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTYsNjE2XX1dXX1dKTtcbiIsInZhciBvaG0gPSByZXF1aXJlKCcuLicpO1xubW9kdWxlLmV4cG9ydHMgPSBvaG0ubWFrZVJlY2lwZShbXCJncmFtbWFyXCIse1wic291cmNlXCI6XCJPaG0ge1xcblxcbiAgR3JhbW1hcnNcXG4gICAgPSBHcmFtbWFyKlxcblxcbiAgR3JhbW1hclxcbiAgICA9IGlkZW50IFN1cGVyR3JhbW1hcj8gXFxcIntcXFwiIFJ1bGUqIFxcXCJ9XFxcIlxcblxcbiAgU3VwZXJHcmFtbWFyXFxuICAgID0gXFxcIjw6XFxcIiBpZGVudFxcblxcbiAgUnVsZVxcbiAgICA9IGlkZW50IEZvcm1hbHM/IHJ1bGVEZXNjcj8gXFxcIj1cXFwiICBSdWxlQm9keSAgLS0gZGVmaW5lXFxuICAgIHwgaWRlbnQgRm9ybWFscz8gICAgICAgICAgICBcXFwiOj1cXFwiIFJ1bGVCb2R5ICAtLSBvdmVycmlkZVxcbiAgICB8IGlkZW50IEZvcm1hbHM/ICAgICAgICAgICAgXFxcIis9XFxcIiBSdWxlQm9keSAgLS0gZXh0ZW5kXFxuXFxuICBSdWxlQm9keVxcbiAgICA9IFxcXCJ8XFxcIj8gTm9uZW1wdHlMaXN0T2Y8VG9wTGV2ZWxUZXJtLCBcXFwifFxcXCI+XFxuXFxuICBUb3BMZXZlbFRlcm1cXG4gICAgPSBTZXEgY2FzZU5hbWUgIC0tIGlubGluZVxcbiAgICB8IFNlcVxcblxcbiAgRm9ybWFsc1xcbiAgICA9IFxcXCI8XFxcIiBMaXN0T2Y8aWRlbnQsIFxcXCIsXFxcIj4gXFxcIj5cXFwiXFxuXFxuICBQYXJhbXNcXG4gICAgPSBcXFwiPFxcXCIgTGlzdE9mPFNlcSwgXFxcIixcXFwiPiBcXFwiPlxcXCJcXG5cXG4gIEFsdFxcbiAgICA9IE5vbmVtcHR5TGlzdE9mPFNlcSwgXFxcInxcXFwiPlxcblxcbiAgU2VxXFxuICAgID0gSXRlcipcXG5cXG4gIEl0ZXJcXG4gICAgPSBQcmVkIFxcXCIqXFxcIiAgLS0gc3RhclxcbiAgICB8IFByZWQgXFxcIitcXFwiICAtLSBwbHVzXFxuICAgIHwgUHJlZCBcXFwiP1xcXCIgIC0tIG9wdFxcbiAgICB8IFByZWRcXG5cXG4gIFByZWRcXG4gICAgPSBcXFwiflxcXCIgTGV4ICAtLSBub3RcXG4gICAgfCBcXFwiJlxcXCIgTGV4ICAtLSBsb29rYWhlYWRcXG4gICAgfCBMZXhcXG5cXG4gIExleFxcbiAgICA9IFxcXCIjXFxcIiBCYXNlICAtLSBsZXhcXG4gICAgfCBCYXNlXFxuXFxuICBCYXNlXFxuICAgID0gaWRlbnQgUGFyYW1zPyB+KHJ1bGVEZXNjcj8gXFxcIj1cXFwiIHwgXFxcIjo9XFxcIiB8IFxcXCIrPVxcXCIpICAtLSBhcHBsaWNhdGlvblxcbiAgICB8IHRlcm1pbmFsIFxcXCIuLlxcXCIgdGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgLS0gcmFuZ2VcXG4gICAgfCB0ZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHRlcm1pbmFsXFxuICAgIHwgXFxcIihcXFwiIEFsdCBcXFwiKVxcXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBwYXJlblxcblxcbiAgcnVsZURlc2NyICAoYSBydWxlIGRlc2NyaXB0aW9uKVxcbiAgICA9IFxcXCIoXFxcIiBydWxlRGVzY3JUZXh0IFxcXCIpXFxcIlxcblxcbiAgcnVsZURlc2NyVGV4dFxcbiAgICA9ICh+XFxcIilcXFwiIGFueSkqXFxuXFxuICBjYXNlTmFtZVxcbiAgICA9IFxcXCItLVxcXCIgKH5cXFwiXFxcXG5cXFwiIHNwYWNlKSogbmFtZSAoflxcXCJcXFxcblxcXCIgc3BhY2UpKiAoXFxcIlxcXFxuXFxcIiB8ICZcXFwifVxcXCIpXFxuXFxuICBuYW1lICAoYSBuYW1lKVxcbiAgICA9IG5hbWVGaXJzdCBuYW1lUmVzdCpcXG5cXG4gIG5hbWVGaXJzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGxldHRlclxcblxcbiAgbmFtZVJlc3RcXG4gICAgPSBcXFwiX1xcXCJcXG4gICAgfCBhbG51bVxcblxcbiAgaWRlbnQgIChhbiBpZGVudGlmaWVyKVxcbiAgICA9IG5hbWVcXG5cXG4gIHRlcm1pbmFsXFxuICAgID0gXFxcIlxcXFxcXFwiXFxcIiB0ZXJtaW5hbENoYXIqIFxcXCJcXFxcXFxcIlxcXCJcXG5cXG4gIHRlcm1pbmFsQ2hhclxcbiAgICA9IGVzY2FwZUNoYXJcXG4gICAgfCB+XFxcIlxcXFxcXFxcXFxcIiB+XFxcIlxcXFxcXFwiXFxcIiB+XFxcIlxcXFxuXFxcIiBhbnlcXG5cXG4gIGVzY2FwZUNoYXIgIChhbiBlc2NhcGUgc2VxdWVuY2UpXFxuICAgID0gXFxcIlxcXFxcXFxcXFxcXFxcXFxcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIGJhY2tzbGFzaFxcbiAgICB8IFxcXCJcXFxcXFxcXFxcXFxcXFwiXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBkb3VibGVRdW90ZVxcbiAgICB8IFxcXCJcXFxcXFxcXFxcXFwnXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBzaW5nbGVRdW90ZVxcbiAgICB8IFxcXCJcXFxcXFxcXGJcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBiYWNrc3BhY2VcXG4gICAgfCBcXFwiXFxcXFxcXFxuXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gbGluZUZlZWRcXG4gICAgfCBcXFwiXFxcXFxcXFxyXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gY2FycmlhZ2VSZXR1cm5cXG4gICAgfCBcXFwiXFxcXFxcXFx0XFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gdGFiXFxuICAgIHwgXFxcIlxcXFxcXFxcdVxcXCIgaGV4RGlnaXQgaGV4RGlnaXQgaGV4RGlnaXQgaGV4RGlnaXQgIC0tIHVuaWNvZGVFc2NhcGVcXG4gICAgfCBcXFwiXFxcXFxcXFx4XFxcIiBoZXhEaWdpdCBoZXhEaWdpdCAgICAgICAgICAgICAgICAgICAgLS0gaGV4RXNjYXBlXFxuXFxuICBzcGFjZVxcbiAgICs9IGNvbW1lbnRcXG5cXG4gIGNvbW1lbnRcXG4gICAgPSBcXFwiLy9cXFwiICh+XFxcIlxcXFxuXFxcIiBhbnkpKiBcXFwiXFxcXG5cXFwiICAtLSBzaW5nbGVMaW5lXFxuICAgIHwgXFxcIi8qXFxcIiAoflxcXCIqL1xcXCIgYW55KSogXFxcIiovXFxcIiAgLS0gbXVsdGlMaW5lXFxuXFxuICB0b2tlbnMgPSB0b2tlbipcXG5cXG4gIHRva2VuID0gY2FzZU5hbWUgfCBjb21tZW50IHwgaWRlbnQgfCBvcGVyYXRvciB8IHB1bmN0dWF0aW9uIHwgdGVybWluYWwgfCBhbnlcXG5cXG4gIG9wZXJhdG9yID0gXFxcIjw6XFxcIiB8IFxcXCI9XFxcIiB8IFxcXCI6PVxcXCIgfCBcXFwiKz1cXFwiIHwgXFxcIipcXFwiIHwgXFxcIitcXFwiIHwgXFxcIj9cXFwiIHwgXFxcIn5cXFwiIHwgXFxcIiZcXFwiXFxuXFxuICBwdW5jdHVhdGlvbiA9IFxcXCI8XFxcIiB8IFxcXCI+XFxcIiB8IFxcXCIsXFxcIiB8IFxcXCItLVxcXCJcXG59XCJ9LFwiT2htXCIsbnVsbCxcIkdyYW1tYXJzXCIse1wiR3JhbW1hcnNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5LDMyXX0sbnVsbCxbXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQsMzJdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNCwzMV19LFwiR3JhbW1hclwiLFtdXV1dLFwiR3JhbW1hclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM2LDgzXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MCw4M119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzUwLDU1XX0sXCJpZGVudFwiLFtdXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1Niw2OV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2LDY4XX0sXCJTdXBlckdyYW1tYXJcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzAsNzNdfSxcIntcIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc0LDc5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzQsNzhdfSxcIlJ1bGVcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODAsODNdfSxcIn1cIl1dXSxcIlN1cGVyR3JhbW1hclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDExNl19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA2LDExNl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA2LDExMF19LFwiPDpcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTExLDExNl19LFwiaWRlbnRcIixbXV1dXSxcIlJ1bGVfZGVmaW5lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE4MV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE3MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxMzZdfSxcImlkZW50XCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNywxNDVdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzcsMTQ0XX0sXCJGb3JtYWxzXCIsW11dXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDYsMTU2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ2LDE1NV19LFwicnVsZURlc2NyXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1NywxNjBdfSxcIj1cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTYyLDE3MF19LFwiUnVsZUJvZHlcIixbXV1dXSxcIlJ1bGVfb3ZlcnJpZGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODgsMjQwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODgsMjI3XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg4LDE5M119LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk0LDIwMl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NCwyMDFdfSxcIkZvcm1hbHNcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE0LDIxOF19LFwiOj1cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5LDIyN119LFwiUnVsZUJvZHlcIixbXV1dXSxcIlJ1bGVfZXh0ZW5kXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI5N119LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI4Nl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0NywyNTJdfSxcImlkZW50XCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1MywyNjFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNTMsMjYwXX0sXCJGb3JtYWxzXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI3MywyNzddfSxcIis9XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI3OCwyODZdfSxcIlJ1bGVCb2R5XCIsW11dXV0sXCJSdWxlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIwLDI5N119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDI5N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxNzBdfSxcIlJ1bGVfZGVmaW5lXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4OCwyMjddfSxcIlJ1bGVfb3ZlcnJpZGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI4Nl19LFwiUnVsZV9leHRlbmRcIixbXV1dXSxcIlJ1bGVCb2R5XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzAxLDM1NF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE2LDM1NF19LFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMxNiwzMjBdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMxNiwzMTldfSxcInxcIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMyMSwzNTRdfSxcIk5vbmVtcHR5TGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMzNiwzNDhdfSxcIlRvcExldmVsVGVybVwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM1MCwzNTNdfSxcInxcIl1dXV1dLFwiVG9wTGV2ZWxUZXJtX2lubGluZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3Nyw0MDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODldfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzgwXX0sXCJTZXFcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzgxLDM4OV19LFwiY2FzZU5hbWVcIixbXV1dXSxcIlRvcExldmVsVGVybVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM1OCw0MTBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3Nyw0MTBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzg5XX0sXCJUb3BMZXZlbFRlcm1faW5saW5lXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQwNyw0MTBdfSxcIlNlcVwiLFtdXV1dLFwiRm9ybWFsc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQxNCw0NTRdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQyOCw0NTRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQyOCw0MzFdfSxcIjxcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDMyLDQ1MF19LFwiTGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQzOSw0NDRdfSxcImlkZW50XCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDQ2LDQ0OV19LFwiLFwiXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDUxLDQ1NF19LFwiPlwiXV1dLFwiUGFyYW1zXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDU4LDQ5NV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDcxLDQ5NV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDcxLDQ3NF19LFwiPFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NzUsNDkxXX0sXCJMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDgyLDQ4NV19LFwiU2VxXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDg3LDQ5MF19LFwiLFwiXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDkyLDQ5NV19LFwiPlwiXV1dLFwiQWx0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDk5LDUzM119LG51bGwsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTA5LDUzM119LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTI0LDUyN119LFwiU2VxXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTI5LDUzMl19LFwifFwiXV1dXSxcIlNlcVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzUzNyw1NTJdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NDcsNTUyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTQ3LDU1MV19LFwiSXRlclwiLFtdXV1dLFwiSXRlcl9zdGFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU4NF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU3NV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2Nyw1NzFdfSxcIlByZWRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NzIsNTc1XX0sXCIqXCJdXV0sXCJJdGVyX3BsdXNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNjA4XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNTk5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTkxLDU5NV19LFwiUHJlZFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5Niw1OTldfSxcIitcIl1dXSxcIkl0ZXJfb3B0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYzMV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYyM119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYxNSw2MTldfSxcIlByZWRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MjAsNjIzXX0sXCI/XCJdXV0sXCJJdGVyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTU2LDY0Ml19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDY0Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2Nyw1NzVdfSxcIkl0ZXJfc3RhclwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNTk5XX0sXCJJdGVyX3BsdXNcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYyM119LFwiSXRlcl9vcHRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjM4LDY0Ml19LFwiUHJlZFwiLFtdXV1dLFwiUHJlZF9ub3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjcyXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjY0XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjYwXX0sXCJ+XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY2MSw2NjRdfSxcIkxleFwiLFtdXV1dLFwiUHJlZF9sb29rYWhlYWRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNzAwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNjg2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNjgyXX0sXCImXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY4Myw2ODZdfSxcIkxleFwiLFtdXV1dLFwiUHJlZFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY0Niw3MTBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw3MTBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjY0XX0sXCJQcmVkX25vdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNjg2XX0sXCJQcmVkX2xvb2thaGVhZFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MDcsNzEwXX0sXCJMZXhcIixbXV1dXSxcIkxleF9sZXhcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzQwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzMyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzI3XX0sXCIjXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyOCw3MzJdfSxcIkJhc2VcIixbXV1dXSxcIkxleFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzcxNCw3NTFdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3NTFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzMyXX0sXCJMZXhfbGV4XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc0Nyw3NTFdfSxcIkJhc2VcIixbXV1dXSxcIkJhc2VfYXBwbGljYXRpb25cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsODI3XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsODExXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzY2LDc3MV19LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzcyLDc3OV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc3Miw3NzhdfSxcIlBhcmFtc1wiLFtdXV0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgwLDgxMV19LFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc4Miw4MTBdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3ODIsNzk2XX0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgyLDc5Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc4Miw3OTFdfSxcInJ1bGVEZXNjclwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3OTMsNzk2XX0sXCI9XCJdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc5OSw4MDNdfSxcIjo9XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODA2LDgxMF19LFwiKz1cIl1dXV1dLFwiQmFzZV9yYW5nZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4ODldfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4NTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MzQsODQyXX0sXCJ0ZXJtaW5hbFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg0Myw4NDddfSxcIi4uXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg0OCw4NTZdfSxcInRlcm1pbmFsXCIsW11dXV0sXCJCYXNlX3Rlcm1pbmFsXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODk2LDk1NF19LG51bGwsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODk2LDkwNF19LFwidGVybWluYWxcIixbXV1dLFwiQmFzZV9wYXJlblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2MSwxMDE2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsOTcyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsOTY0XX0sXCIoXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2NSw5NjhdfSxcIkFsdFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2OSw5NzJdfSxcIilcIl1dXSxcIkJhc2VcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NTUsMTAxNl19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzY2LDEwMTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsODExXX0sXCJCYXNlX2FwcGxpY2F0aW9uXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4NTZdfSxcIkJhc2VfcmFuZ2VcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODk2LDkwNF19LFwiQmFzZV90ZXJtaW5hbFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsOTcyXX0sXCJCYXNlX3BhcmVuXCIsW11dXV0sXCJydWxlRGVzY3JcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDIwLDEwNzldfSxcImEgcnVsZSBkZXNjcmlwdGlvblwiLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNTgsMTA3OV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA1OCwxMDYxXX0sXCIoXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNjIsMTA3NV19LFwicnVsZURlc2NyVGV4dFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNzYsMTA3OV19LFwiKVwiXV1dLFwicnVsZURlc2NyVGV4dFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwODMsMTExNF19LG51bGwsW10sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDMsMTExNF19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDQsMTExMl19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDQsMTEwOF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEwNSwxMTA4XX0sXCIpXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTA5LDExMTJdfSxcImFueVwiLFtdXV1dXSxcImNhc2VOYW1lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTExOCwxMTg2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTMzLDExODZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzMsMTEzN119LFwiLS1cIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzgsMTE1Ml19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzksMTE1MF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzksMTE0NF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE0MCwxMTQ0XX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNDUsMTE1MF19LFwic3BhY2VcIixbXV1dXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTUzLDExNTddfSxcIm5hbWVcIixbXV0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTgsMTE3Ml19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTksMTE3MF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTksMTE2NF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE2MCwxMTY0XX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNjUsMTE3MF19LFwic3BhY2VcIixbXV1dXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTc0LDExODVdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNzQsMTE3OF19LFwiXFxuXCJdLFtcImxvb2thaGVhZFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExODEsMTE4NV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE4MiwxMTg1XX0sXCJ9XCJdXV1dXSxcIm5hbWVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTkwLDEyMzBdfSxcImEgbmFtZVwiLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMTEsMTIzMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMTEsMTIyMF19LFwibmFtZUZpcnN0XCIsW11dLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjIxLDEyMzBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjIxLDEyMjldfSxcIm5hbWVSZXN0XCIsW11dXV1dLFwibmFtZUZpcnN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIzNCwxMjY2XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjUwLDEyNjZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyNTAsMTI1M119LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjYwLDEyNjZdfSxcImxldHRlclwiLFtdXV1dLFwibmFtZVJlc3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjcwLDEzMDBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyODUsMTMwMF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI4NSwxMjg4XX0sXCJfXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyOTUsMTMwMF19LFwiYWxudW1cIixbXV1dXSxcImlkZW50XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMwNCwxMzM3XX0sXCJhbiBpZGVudGlmaWVyXCIsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMzMywxMzM3XX0sXCJuYW1lXCIsW11dXSxcInRlcm1pbmFsXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM0MSwxMzc5XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzU2LDEzNzldfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNTYsMTM2MF19LFwiXFxcIlwiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM2MSwxMzc0XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM2MSwxMzczXX0sXCJ0ZXJtaW5hbENoYXJcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM3NSwxMzc5XX0sXCJcXFwiXCJdXV0sXCJ0ZXJtaW5hbENoYXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzgzLDE0NDBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MDIsMTQ0MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MDIsMTQxMl19LFwiZXNjYXBlQ2hhclwiLFtdXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDE5LDE0NDBdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDE5LDE0MjRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MjAsMTQyNF19LFwiXFxcXFwiXV0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQyNSwxNDMwXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDI2LDE0MzBdfSxcIlxcXCJcIl1dLFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MzEsMTQzNl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQzMiwxNDM2XX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MzcsMTQ0MF19LFwiYW55XCIsW11dXV1dLFwiZXNjYXBlQ2hhcl9iYWNrc2xhc2hcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDE1MzhdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ4MywxNDg5XX0sXCJcXFxcXFxcXFwiXV0sXCJlc2NhcGVDaGFyX2RvdWJsZVF1b3RlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTU0NSwxNjAyXX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1NDUsMTU1MV19LFwiXFxcXFxcXCJcIl1dLFwiZXNjYXBlQ2hhcl9zaW5nbGVRdW90ZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2MDksMTY2Nl19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjA5LDE2MTVdfSxcIlxcXFwnXCJdXSxcImVzY2FwZUNoYXJfYmFja3NwYWNlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY3MywxNzI4XX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2NzMsMTY3OF19LFwiXFxcXGJcIl1dLFwiZXNjYXBlQ2hhcl9saW5lRmVlZFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3MzUsMTc4OV19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzM1LDE3NDBdfSxcIlxcXFxuXCJdXSxcImVzY2FwZUNoYXJfY2FycmlhZ2VSZXR1cm5cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzk2LDE4NTZdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc5NiwxODAxXX0sXCJcXFxcclwiXV0sXCJlc2NhcGVDaGFyX3RhYlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NjMsMTkxMl19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODYzLDE4NjhdfSxcIlxcXFx0XCJdXSxcImVzY2FwZUNoYXJfdW5pY29kZUVzY2FwZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5MTksMTk3OF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxOSwxOTYwXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTE5LDE5MjRdfSxcIlxcXFx1XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5MjUsMTkzM119LFwiaGV4RGlnaXRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkzNCwxOTQyXX0sXCJoZXhEaWdpdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTQzLDE5NTFdfSxcImhleERpZ2l0XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NTIsMTk2MF19LFwiaGV4RGlnaXRcIixbXV1dXSxcImVzY2FwZUNoYXJfaGV4RXNjYXBlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk4NSwyMDQwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTg1LDIwMDhdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5ODUsMTk5MF19LFwiXFxcXHhcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk5MSwxOTk5XX0sXCJoZXhEaWdpdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDAwLDIwMDhdfSxcImhleERpZ2l0XCIsW11dXV0sXCJlc2NhcGVDaGFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ0NCwyMDQwXX0sXCJhbiBlc2NhcGUgc2VxdWVuY2VcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDIwNDBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDE0ODldfSxcImVzY2FwZUNoYXJfYmFja3NsYXNoXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1NDUsMTU1MV19LFwiZXNjYXBlQ2hhcl9kb3VibGVRdW90ZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjA5LDE2MTVdfSxcImVzY2FwZUNoYXJfc2luZ2xlUXVvdGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY3MywxNjc4XX0sXCJlc2NhcGVDaGFyX2JhY2tzcGFjZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzM1LDE3NDBdfSxcImVzY2FwZUNoYXJfbGluZUZlZWRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc5NiwxODAxXX0sXCJlc2NhcGVDaGFyX2NhcnJpYWdlUmV0dXJuXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NjMsMTg2OF19LFwiZXNjYXBlQ2hhcl90YWJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxOSwxOTYwXX0sXCJlc2NhcGVDaGFyX3VuaWNvZGVFc2NhcGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk4NSwyMDA4XX0sXCJlc2NhcGVDaGFyX2hleEVzY2FwZVwiLFtdXV1dLFwic3BhY2VcIjpbXCJleHRlbmRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDQ0LDIwNjNdfSxudWxsLFtdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwNTYsMjA2M119LFwiY29tbWVudFwiLFtdXV0sXCJjb21tZW50X3NpbmdsZUxpbmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIxMThdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwODEsMjEwM119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4MSwyMDg1XX0sXCIvL1wiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4NiwyMDk4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4NywyMDk2XX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4NywyMDkyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDg4LDIwOTJdfSxcIlxcblwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA5MywyMDk2XX0sXCJhbnlcIixbXV1dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwOTksMjEwM119LFwiXFxuXCJdXV0sXCJjb21tZW50X211bHRpTGluZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMjUsMjE2MV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEyNSwyMTQ3XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTI1LDIxMjldfSxcIi8qXCJdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTMwLDIxNDJdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTMxLDIxNDBdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTMxLDIxMzZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzIsMjEzNl19LFwiKi9cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzcsMjE0MF19LFwiYW55XCIsW11dXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTQzLDIxNDddfSxcIiovXCJdXV0sXCJjb21tZW50XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA2NywyMTYxXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIxNjFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIxMDNdfSxcImNvbW1lbnRfc2luZ2xlTGluZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTI1LDIxNDddfSxcImNvbW1lbnRfbXVsdGlMaW5lXCIsW11dXV0sXCJ0b2tlbnNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTY1LDIxODBdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTc0LDIxODBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTc0LDIxNzldfSxcInRva2VuXCIsW11dXV0sXCJ0b2tlblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxODQsMjI2MF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5MiwyMjYwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5MiwyMjAwXX0sXCJjYXNlTmFtZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjAzLDIyMTBdfSxcImNvbW1lbnRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjIxMywyMjE4XX0sXCJpZGVudFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjIxLDIyMjldfSxcIm9wZXJhdG9yXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyMzIsMjI0M119LFwicHVuY3R1YXRpb25cIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI0NiwyMjU0XX0sXCJ0ZXJtaW5hbFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjU3LDIyNjBdfSxcImFueVwiLFtdXV1dLFwib3BlcmF0b3JcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjY0LDIzMjldfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNzUsMjMyOV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI3NSwyMjc5XX0sXCI8OlwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyODIsMjI4NV19LFwiPVwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyODgsMjI5Ml19LFwiOj1cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjk1LDIyOTldfSxcIis9XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMwMiwyMzA1XX0sXCIqXCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMwOCwyMzExXX0sXCIrXCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMxNCwyMzE3XX0sXCI/XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMyMCwyMzIzXX0sXCJ+XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMyNiwyMzI5XX0sXCImXCJdXV0sXCJwdW5jdHVhdGlvblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzMzMsMjM2OV19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjM0NywyMzY5XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzQ3LDIzNTBdfSxcIjxcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzUzLDIzNTZdfSxcIj5cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzU5LDIzNjJdfSxcIixcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzY1LDIzNjldfSxcIi0tXCJdXV19XSk7XG4iLCJ2YXIgb2htID0gcmVxdWlyZSgnLi4nKTtcbm1vZHVsZS5leHBvcnRzID0gb2htLm1ha2VSZWNpcGUoW1wiZ3JhbW1hclwiLHtcInNvdXJjZVwiOlwiT3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXMge1xcblxcbiAgQXR0cmlidXRlU2lnbmF0dXJlID1cXG4gICAgbmFtZVxcblxcbiAgT3BlcmF0aW9uU2lnbmF0dXJlID1cXG4gICAgbmFtZSBGb3JtYWxzP1xcblxcbiAgRm9ybWFsc1xcbiAgICA9IFxcXCIoXFxcIiBMaXN0T2Y8bmFtZSwgXFxcIixcXFwiPiBcXFwiKVxcXCJcXG5cXG4gIG5hbWUgIChhIG5hbWUpXFxuICAgID0gbmFtZUZpcnN0IG5hbWVSZXN0KlxcblxcbiAgbmFtZUZpcnN0XFxuICAgID0gXFxcIl9cXFwiXFxuICAgIHwgbGV0dGVyXFxuXFxuICBuYW1lUmVzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGFsbnVtXFxuXFxufVwifSxcIk9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzXCIsbnVsbCxcIkF0dHJpYnV0ZVNpZ25hdHVyZVwiLHtcIkF0dHJpYnV0ZVNpZ25hdHVyZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI5LDU4XX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NCw1OF19LFwibmFtZVwiLFtdXV0sXCJPcGVyYXRpb25TaWduYXR1cmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MiwxMDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDEwMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDkxXX0sXCJuYW1lXCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzkyLDEwMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzkyLDk5XX0sXCJGb3JtYWxzXCIsW11dXV1dLFwiRm9ybWFsc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNCwxNDNdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOCwxNDNdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOCwxMjFdfSxcIihcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIyLDEzOV19LFwiTGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyOSwxMzNdfSxcIm5hbWVcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzUsMTM4XX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDAsMTQzXX0sXCIpXCJdXV0sXCJuYW1lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ3LDE4N119LFwiYSBuYW1lXCIsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY4LDE4N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2OCwxNzddfSxcIm5hbWVGaXJzdFwiLFtdXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc4LDE4N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3OCwxODZdfSxcIm5hbWVSZXN0XCIsW11dXV1dLFwibmFtZUZpcnN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxLDIyM119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA3LDIyM119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA3LDIxMF19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTcsMjIzXX0sXCJsZXR0ZXJcIixbXV1dXSxcIm5hbWVSZXN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI3LDI1N119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQyLDI1N119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQyLDI0NV19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNTIsMjU3XX0sXCJhbG51bVwiLFtdXV1dfV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdG9BU1Q6IHJlcXVpcmUoJy4vc2VtYW50aWNzLXRvQVNUJykuaGVscGVyLFxuICBzZW1hbnRpY3NGb3JUb0FTVDogcmVxdWlyZSgnLi9zZW1hbnRpY3MtdG9BU1QnKS5zZW1hbnRpY3Ncbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi4vc3JjL3BleHBycycpO1xudmFyIE1hdGNoUmVzdWx0ID0gcmVxdWlyZSgnLi4vc3JjL01hdGNoUmVzdWx0Jyk7XG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4uL3NyYy9HcmFtbWFyJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgndXRpbC1leHRlbmQnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBkZWZhdWx0T3BlcmF0aW9uID0ge1xuICBfdGVybWluYWw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByaW1pdGl2ZVZhbHVlO1xuICB9LFxuXG4gIF9ub250ZXJtaW5hbDogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICB2YXIgY3Rvck5hbWUgPSB0aGlzLl9ub2RlLmN0b3JOYW1lO1xuICAgIHZhciBtYXBwaW5nID0gdGhpcy5hcmdzLm1hcHBpbmc7XG5cbiAgICAvLyB3aXRob3V0IGN1c3RvbWl6YXRpb25cbiAgICBpZiAoIW1hcHBpbmcuaGFzT3duUHJvcGVydHkoY3Rvck5hbWUpKSB7XG4gICAgICAvLyBpbnRlcm1lZGlhdGUgbm9kZVxuICAgICAgaWYgKHRoaXMuX25vZGUgaW5zdGFuY2VvZiBwZXhwcnMuQWx0IHx8IHRoaXMuX25vZGUgaW5zdGFuY2VvZiBwZXhwcnMuQXBwbHkpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgfVxuXG4gICAgICAvLyBsZXhpY2FsIHJ1bGVcbiAgICAgIGlmICh0aGlzLmlzTGV4aWNhbCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgICAgfVxuXG4gICAgICAvLyBzaW5ndWxhciBub2RlIChlLmcuIG9ubHkgc3Vycm91bmRlZCBieSBsaXRlcmFscyBvciBsb29rYWhlYWRzKVxuICAgICAgdmFyIHJlYWxDaGlsZHJlbiA9IGNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICByZXR1cm4gIWNoaWxkLmlzVGVybWluYWwoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlYWxDaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlYWxDaGlsZHJlblswXS50b0FTVChtYXBwaW5nKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVzdDogdGVybXMgd2l0aCBtdWx0aXBsZSBjaGlsZHJlblxuICAgIH1cblxuICAgIC8vIGRpcmVjdCBmb3J3YXJkXG4gICAgaWYgKHR5cGVvZiBtYXBwaW5nW2N0b3JOYW1lXSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlblttYXBwaW5nW2N0b3JOYW1lXV0udG9BU1QobWFwcGluZyk7XG4gICAgfVxuXG4gICAgLy8gbmFtZWQvbWFwcGVkIGNoaWxkcmVuIG9yIHVubmFtZWQgY2hpbGRyZW4gKCcwJywgJzEnLCAnMicsIC4uLilcbiAgICB2YXIgcHJvcE1hcCA9IG1hcHBpbmdbY3Rvck5hbWVdIHx8IGNoaWxkcmVuO1xuICAgIHZhciBub2RlID0ge1xuICAgICAgdHlwZTogY3Rvck5hbWVcbiAgICB9O1xuICAgIGZvciAodmFyIHByb3AgaW4gcHJvcE1hcCkge1xuICAgICAgdmFyIG1hcHBlZFByb3AgPSBtYXBwaW5nW2N0b3JOYW1lXSAmJiBtYXBwaW5nW2N0b3JOYW1lXVtwcm9wXTtcbiAgICAgIGlmICh0eXBlb2YgbWFwcGVkUHJvcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gZGlyZWN0IGZvcndhcmRcbiAgICAgICAgbm9kZVtwcm9wXSA9IGNoaWxkcmVuW21hcHBlZFByb3BdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG1hcHBlZFByb3AgPT09ICdzdHJpbmcnKSB8fCAodHlwZW9mIG1hcHBlZFByb3AgPT09ICdib29sZWFuJykgfHxcbiAgICAgICAgICAobWFwcGVkUHJvcCA9PT0gbnVsbCkpIHtcbiAgICAgICAgLy8gcHJpbWl0aXZlIHZhbHVlXG4gICAgICAgIG5vZGVbcHJvcF0gPSBtYXBwZWRQcm9wO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG1hcHBlZFByb3AgPT09ICdvYmplY3QnKSAmJiAobWFwcGVkUHJvcCBpbnN0YW5jZW9mIE51bWJlcikpIHtcbiAgICAgICAgLy8gcHJpbWl0aXZlIG51bWJlciAobXVzdCBiZSB1bmJveGVkKVxuICAgICAgICBub2RlW3Byb3BdID0gTnVtYmVyKG1hcHBlZFByb3ApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWFwcGVkUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBjb21wdXRlZCB2YWx1ZVxuICAgICAgICBub2RlW3Byb3BdID0gbWFwcGVkUHJvcC5jYWxsKHRoaXMsIGNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSBpZiAobWFwcGVkUHJvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChjaGlsZHJlbltwcm9wXSAmJiAhY2hpbGRyZW5bcHJvcF0uaXNUZXJtaW5hbCgpKSB7XG4gICAgICAgICAgbm9kZVtwcm9wXSA9IGNoaWxkcmVuW3Byb3BdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRlbGV0ZSBwcmVkZWZpbmVkICd0eXBlJyBwcm9wZXJ0aWVzLCBsaWtlICd0eXBlJywgaWYgZXhwbGljaXRlbHkgcmVtb3ZlZFxuICAgICAgICAgIGRlbGV0ZSBub2RlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9LFxuXG4gIF9pdGVyOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgIGlmICh0aGlzLl9ub2RlLmlzT3B0aW9uYWwoKSkge1xuICAgICAgaWYgKHRoaXMubnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5bMF0udG9BU1QodGhpcy5hcmdzLm1hcHBpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIHJldHVybiBjaGlsZC50b0FTVCh0aGlzLmFyZ3MubWFwcGluZyk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgTm9uZW1wdHlMaXN0T2Y6IGZ1bmN0aW9uKGZpcnN0LCBzZXAsIHJlc3QpIHtcbiAgICByZXR1cm4gW2ZpcnN0LnRvQVNUKHRoaXMuYXJncy5tYXBwaW5nKV0uY29uY2F0KHJlc3QudG9BU1QodGhpcy5hcmdzLm1hcHBpbmcpKTtcbiAgfSxcblxuICBFbXB0eUxpc3RPZjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QgdGhhdCBpbmNsdWRlcyBhbiBhYnN0cmFjdCBzeW50YXggdHJlZSAoQVNUKVxuLy8gZm9yIHRoZSBnaXZlbiBtYXRjaCByZXN1bHQgYHJlc2AgY29udGFpbmcgYSBjb25jcmV0ZSBzeW50YXggdHJlZSAoQ1NUKSBhbmQgZ3JhbW1hci5cbi8vIFRoZSBvcHRpb25hbCBgbWFwcGluZ2AgcGFyYW1ldGVyIGNhbiBiZSB1c2VkIHRvIGN1c3RvbWl6ZSBob3cgdGhlIG5vZGVzIG9mIHRoZSBDU1Rcbi8vIGFyZSBtYXBwZWQgdG8gdGhlIEFTVCAoc2VlIC9kb2MvZXh0cmFzLm1kI3RvYXN0bWF0Y2hyZXN1bHQtbWFwcGluZykuXG5mdW5jdGlvbiB0b0FTVChyZXMsIG1hcHBpbmcpIHtcbiAgaWYgKCEocmVzIGluc3RhbmNlb2YgTWF0Y2hSZXN1bHQpIHx8IHJlcy5mYWlsZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcigndG9BU1QoKSBleHBlY3RzIGEgc3VjY2VzZnVsbCBNYXRjaFJlc3VsdCBhcyBmaXJzdCBwYXJhbWV0ZXInKTtcbiAgfVxuXG4gIG1hcHBpbmcgPSBleHRlbmQoe30sIG1hcHBpbmcpO1xuICB2YXIgb3BlcmF0aW9uID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3BlcmF0aW9uKTtcbiAgZm9yICh2YXIgdGVybU5hbWUgaW4gbWFwcGluZykge1xuICAgIGlmICh0eXBlb2YgbWFwcGluZ1t0ZXJtTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wZXJhdGlvblt0ZXJtTmFtZV0gPSBtYXBwaW5nW3Rlcm1OYW1lXTtcbiAgICAgIGRlbGV0ZSBtYXBwaW5nW3Rlcm1OYW1lXTtcbiAgICB9XG4gIH1cbiAgdmFyIGcgPSByZXMuX2NzdC5ncmFtbWFyO1xuICB2YXIgcyA9IGcuc2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCd0b0FTVChtYXBwaW5nKScsIG9wZXJhdGlvbik7XG4gIHJldHVybiBzKHJlcykudG9BU1QobWFwcGluZyk7XG59XG5cbi8vIFJldHVybnMgYSBzZW1hbnRpY3MgY29udGFpbmcgdGhlIHRvQVNUKG1hcHBpbmcpIG9wZXJhdGlvbiBmb3IgdGhlIGdpdmVuIGdyYW1tYXIgZy5cbmZ1bmN0aW9uIHNlbWFudGljc0ZvclRvQVNUKGcpIHtcbiAgaWYgKCEoZyBpbnN0YW5jZW9mIEdyYW1tYXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZW1hbnRpY3NUb0FTVCgpIGV4cGVjdHMgYSBHcmFtbWFyIGFzIHBhcmFtZXRlcicpO1xuICB9XG5cbiAgcmV0dXJuIGcuc2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCd0b0FTVChtYXBwaW5nKScsIGRlZmF1bHRPcGVyYXRpb24pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGVscGVyOiB0b0FTVCxcbiAgc2VtYW50aWNzOiBzZW1hbnRpY3NGb3JUb0FTVFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKSA/IFN5bWJvbCA6IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzeW1ib2w7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdHN5bWJvbCA9IFN5bWJvbCgndGVzdCBzeW1ib2wnKTtcblx0dHJ5IHsgU3RyaW5nKHN5bWJvbCk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgcmV0dXJuIHRydWU7XG5cblx0Ly8gUmV0dXJuICd0cnVlJyBmb3IgcG9seWZpbGxzXG5cdGlmICh0eXBlb2YgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZSAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblx0aWYgKHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cdGlmICh0eXBlb2YgU3ltYm9sLnRvUHJpbWl0aXZlICE9PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXHRpZiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblx0aWYgKHR5cGVvZiBTeW1ib2wudW5zY29wYWJsZXMgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh4KSB7XG5cdHJldHVybiAoeCAmJiAoKHR5cGVvZiB4ID09PSAnc3ltYm9sJykgfHwgKHhbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpKSkgfHwgZmFsc2U7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduICAgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2Fzc2lnbicpXG4gICwgbm9ybWFsaXplT3B0cyA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zJylcbiAgLCBpc0NhbGxhYmxlICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUnKVxuICAsIGNvbnRhaW5zICAgICAgPSByZXF1aXJlKCdlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zJylcblxuICAsIGQ7XG5cbmQgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkc2NyLCB2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIHcsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHx8ICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpKSB7XG5cdFx0b3B0aW9ucyA9IHZhbHVlO1xuXHRcdHZhbHVlID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0XHR3ID0gY29udGFpbnMuY2FsbChkc2NyLCAndycpO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5kLmdzID0gZnVuY3Rpb24gKGRzY3IsIGdldCwgc2V0LyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgb3B0aW9ucywgZGVzYztcblx0aWYgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoZ2V0ID09IG51bGwpIHtcblx0XHRnZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoZ2V0KSkge1xuXHRcdG9wdGlvbnMgPSBnZXQ7XG5cdFx0Z2V0ID0gc2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKHNldCA9PSBudWxsKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKHNldCkpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0fVxuXG5cdGRlc2MgPSB7IGdldDogZ2V0LCBzZXQ6IHNldCwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlIH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0b2JqID0geyBmb286ICdyYXonIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiAnZHdhJyB9LCB7IHRyenk6ICd0cnp5JyB9KTtcblx0cmV0dXJuIChvYmouZm9vICsgb2JqLmJhciArIG9iai50cnp5KSA9PT0gJ3JhemR3YXRyenknO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgID0gcmVxdWlyZSgnLi4va2V5cycpXG4gICwgdmFsdWUgPSByZXF1aXJlKCcuLi92YWxpZC12YWx1ZScpXG5cbiAgLCBtYXggPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGVzdCwgc3JjLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGwgPSBtYXgoYXJndW1lbnRzLmxlbmd0aCwgMiksIGFzc2lnbjtcblx0ZGVzdCA9IE9iamVjdCh2YWx1ZShkZXN0KSk7XG5cdGFzc2lnbiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR0cnkgeyBkZXN0W2tleV0gPSBzcmNba2V5XTsgfSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlO1xuXHRcdH1cblx0fTtcblx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuIiwiLy8gRGVwcmVjYXRlZFxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJzsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IE9iamVjdC5rZXlzXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKCdwcmltaXRpdmUnKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gT2JqZWN0LmtleXM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuXHRyZXR1cm4ga2V5cyhvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IE9iamVjdChvYmplY3QpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbnZhciBwcm9jZXNzID0gZnVuY3Rpb24gKHNyYywgb2JqKSB7XG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIHNyYykgb2JqW2tleV0gPSBzcmNba2V5XTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMvKiwg4oCmb3B0aW9ucyovKSB7XG5cdHZhciByZXN1bHQgPSBjcmVhdGUobnVsbCk7XG5cdGZvckVhY2guY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgcmV0dXJuO1xuXHRcdHByb2Nlc3MoT2JqZWN0KG9wdGlvbnMpLCByZXN1bHQpO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IFN0cmluZy5wcm90b3R5cGUuY29udGFpbnNcblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0ciA9ICdyYXpkd2F0cnp5JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc3RyLmNvbnRhaW5zICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiAoKHN0ci5jb250YWlucygnZHdhJykgPT09IHRydWUpICYmIChzdHIuY29udGFpbnMoJ2ZvbycpID09PSBmYWxzZSkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCB2YWxpZGF0ZVN5bWJvbCA9IHJlcXVpcmUoJy4vdmFsaWRhdGUtc3ltYm9sJylcblxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlXG4gICwgU3ltYm9sLCBIaWRkZW5TeW1ib2wsIGdsb2JhbFN5bWJvbHMgPSBjcmVhdGUobnVsbCk7XG5cbnZhciBnZW5lcmF0ZU5hbWUgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgY3JlYXRlZCA9IGNyZWF0ZShudWxsKTtcblx0cmV0dXJuIGZ1bmN0aW9uIChkZXNjKSB7XG5cdFx0dmFyIHBvc3RmaXggPSAwLCBuYW1lO1xuXHRcdHdoaWxlIChjcmVhdGVkW2Rlc2MgKyAocG9zdGZpeCB8fCAnJyldKSArK3Bvc3RmaXg7XG5cdFx0ZGVzYyArPSAocG9zdGZpeCB8fCAnJyk7XG5cdFx0Y3JlYXRlZFtkZXNjXSA9IHRydWU7XG5cdFx0bmFtZSA9ICdAQCcgKyBkZXNjO1xuXHRcdGRlZmluZVByb3BlcnR5KG9ialByb3RvdHlwZSwgbmFtZSwgZC5ncyhudWxsLCBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdGRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIGQodmFsdWUpKTtcblx0XHR9KSk7XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH07XG59KCkpO1xuXG5IaWRkZW5TeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcblx0aWYgKHRoaXMgaW5zdGFuY2VvZiBIaWRkZW5TeW1ib2wpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdHJldHVybiBTeW1ib2woZGVzY3JpcHRpb24pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdHZhciBzeW1ib2w7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlRXJyb3I6IFN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuXHRzeW1ib2wgPSBjcmVhdGUoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSk7XG5cdGRlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhkZXNjcmlwdGlvbikpO1xuXHRyZXR1cm4gZGVmaW5lUHJvcGVydGllcyhzeW1ib2wsIHtcblx0XHRfX2Rlc2NyaXB0aW9uX186IGQoJycsIGRlc2NyaXB0aW9uKSxcblx0XHRfX25hbWVfXzogZCgnJywgZ2VuZXJhdGVOYW1lKGRlc2NyaXB0aW9uKSlcblx0fSk7XG59O1xuZGVmaW5lUHJvcGVydGllcyhTeW1ib2wsIHtcblx0Zm9yOiBkKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoZ2xvYmFsU3ltYm9sc1trZXldKSByZXR1cm4gZ2xvYmFsU3ltYm9sc1trZXldO1xuXHRcdHJldHVybiAoZ2xvYmFsU3ltYm9sc1trZXldID0gU3ltYm9sKFN0cmluZyhrZXkpKSk7XG5cdH0pLFxuXHRrZXlGb3I6IGQoZnVuY3Rpb24gKHMpIHtcblx0XHR2YXIga2V5O1xuXHRcdHZhbGlkYXRlU3ltYm9sKHMpO1xuXHRcdGZvciAoa2V5IGluIGdsb2JhbFN5bWJvbHMpIGlmIChnbG9iYWxTeW1ib2xzW2tleV0gPT09IHMpIHJldHVybiBrZXk7XG5cdH0pLFxuXHRoYXNJbnN0YW5jZTogZCgnJywgU3ltYm9sKCdoYXNJbnN0YW5jZScpKSxcblx0aXNDb25jYXRTcHJlYWRhYmxlOiBkKCcnLCBTeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpKSxcblx0aXRlcmF0b3I6IGQoJycsIFN5bWJvbCgnaXRlcmF0b3InKSksXG5cdG1hdGNoOiBkKCcnLCBTeW1ib2woJ21hdGNoJykpLFxuXHRyZXBsYWNlOiBkKCcnLCBTeW1ib2woJ3JlcGxhY2UnKSksXG5cdHNlYXJjaDogZCgnJywgU3ltYm9sKCdzZWFyY2gnKSksXG5cdHNwZWNpZXM6IGQoJycsIFN5bWJvbCgnc3BlY2llcycpKSxcblx0c3BsaXQ6IGQoJycsIFN5bWJvbCgnc3BsaXQnKSksXG5cdHRvUHJpbWl0aXZlOiBkKCcnLCBTeW1ib2woJ3RvUHJpbWl0aXZlJykpLFxuXHR0b1N0cmluZ1RhZzogZCgnJywgU3ltYm9sKCd0b1N0cmluZ1RhZycpKSxcblx0dW5zY29wYWJsZXM6IGQoJycsIFN5bWJvbCgndW5zY29wYWJsZXMnKSlcbn0pO1xuZGVmaW5lUHJvcGVydGllcyhIaWRkZW5TeW1ib2wucHJvdG90eXBlLCB7XG5cdGNvbnN0cnVjdG9yOiBkKFN5bWJvbCksXG5cdHRvU3RyaW5nOiBkKCcnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fbmFtZV9fOyB9KVxufSk7XG5cbmRlZmluZVByb3BlcnRpZXMoU3ltYm9sLnByb3RvdHlwZSwge1xuXHR0b1N0cmluZzogZChmdW5jdGlvbiAoKSB7IHJldHVybiAnU3ltYm9sICgnICsgdmFsaWRhdGVTeW1ib2wodGhpcykuX19kZXNjcmlwdGlvbl9fICsgJyknOyB9KSxcblx0dmFsdWVPZjogZChmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTsgfSlcbn0pO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sLnRvUHJpbWl0aXZlLCBkKCcnLFxuXHRmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTsgfSkpO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCBkKCdjJywgJ1N5bWJvbCcpKTtcblxuZGVmaW5lUHJvcGVydHkoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sLnRvUHJpbWl0aXZlLFxuXHRkKCdjJywgU3ltYm9sLnByb3RvdHlwZVtTeW1ib2wudG9QcmltaXRpdmVdKSk7XG5kZWZpbmVQcm9wZXJ0eShIaWRkZW5TeW1ib2wucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsXG5cdGQoJ2MnLCBTeW1ib2wucHJvdG90eXBlW1N5bWJvbC50b1N0cmluZ1RhZ10pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pcy1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyBcIiBpcyBub3QgYSBzeW1ib2xcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBCdWZmZXJcbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgaXMtYnVmZmVyYFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gISEoXG4gICAgb2JqICE9IG51bGwgJiZcbiAgICBvYmouY29uc3RydWN0b3IgJiZcbiAgICB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbiAgKVxufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kO1xuZnVuY3Rpb24gZXh0ZW5kKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgdHlwZW9mIGFkZCAhPT0gJ29iamVjdCcpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgR3JhbW1hckRlY2wgPSByZXF1aXJlKCcuL0dyYW1tYXJEZWNsJyk7XG52YXIgSW50ZXJ2YWwgPSByZXF1aXJlKCcuL0ludGVydmFsJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEJ1aWxkZXIoKSB7fVxuXG5CdWlsZGVyLnByb3RvdHlwZSA9IHtcbiAgY3VycmVudERlY2w6IG51bGwsXG5cbiAgbmV3R3JhbW1hcjogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgR3JhbW1hckRlY2wobmFtZSk7XG4gIH0sXG5cbiAgZ3JhbW1hcjogZnVuY3Rpb24obWV0YUluZm8sIG5hbWUsIHN1cGVyR3JhbW1hciwgZGVmYXVsdFN0YXJ0UnVsZSwgcnVsZXMpIHtcbiAgICB2YXIgZ0RlY2wgPSBuZXcgR3JhbW1hckRlY2wobmFtZSk7XG4gICAgaWYgKHN1cGVyR3JhbW1hcikge1xuICAgICAgZ0RlY2wud2l0aFN1cGVyR3JhbW1hcih0aGlzLmZyb21SZWNpcGUoc3VwZXJHcmFtbWFyKSk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0U3RhcnRSdWxlKSB7XG4gICAgICBnRGVjbC53aXRoRGVmYXVsdFN0YXJ0UnVsZShkZWZhdWx0U3RhcnRSdWxlKTtcbiAgICB9XG4gICAgaWYgKG1ldGFJbmZvICYmIG1ldGFJbmZvLnNvdXJjZSkge1xuICAgICAgZ0RlY2wud2l0aFNvdXJjZShtZXRhSW5mby5zb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmN1cnJlbnREZWNsID0gZ0RlY2w7XG4gICAgT2JqZWN0LmtleXMocnVsZXMpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICAgIHZhciBydWxlUmVjaXBlID0gcnVsZXNbcnVsZU5hbWVdO1xuXG4gICAgICB2YXIgYWN0aW9uID0gcnVsZVJlY2lwZVswXTsgLy8gZGVmaW5lL2V4dGVuZC9vdmVycmlkZVxuICAgICAgdmFyIG1ldGFJbmZvID0gcnVsZVJlY2lwZVsxXTtcbiAgICAgIHZhciBvcHREZXNjcmlwdGlvbiA9IHJ1bGVSZWNpcGVbMl07XG4gICAgICB2YXIgZm9ybWFscyA9IHJ1bGVSZWNpcGVbM107XG4gICAgICB2YXIgYm9keSA9IHNlbGYuZnJvbVJlY2lwZShydWxlUmVjaXBlWzRdKTtcbiAgICAgIGlmIChnRGVjbC5pbnRlcnZhbCAmJiBtZXRhSW5mbyAmJiBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbCkge1xuICAgICAgICBib2R5LmRlZmluaXRpb25JbnRlcnZhbCA9IG5ldyBJbnRlcnZhbChnRGVjbC5pbnRlcnZhbC5pbnB1dFN0cmVhbSxcbiAgICAgICAgICBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbFswXSwgbWV0YUluZm8uc291cmNlSW50ZXJ2YWxbMV0pO1xuICAgICAgfVxuXG4gICAgICBnRGVjbFthY3Rpb25dKHJ1bGVOYW1lLCBmb3JtYWxzLCBib2R5LCBvcHREZXNjcmlwdGlvbik7XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50RGVjbCA9IG51bGw7XG4gICAgcmV0dXJuIGdEZWNsLmJ1aWxkKCk7XG4gIH0sXG5cbiAgdGVybWluYWw6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5UZXJtaW5hbCh4KTtcbiAgfSxcblxuICByYW5nZTogZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5SYW5nZShmcm9tLCB0byk7XG4gIH0sXG5cbiAgcGFyYW06IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuUGFyYW0oaW5kZXgpO1xuICB9LFxuXG4gIGFsdDogZnVuY3Rpb24oLyogdGVybTEsIHRlcm0xLCAuLi4gKi8pIHtcbiAgICB2YXIgdGVybXMgPSBbXTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpZHhdO1xuICAgICAgaWYgKCEoYXJnIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgICBhcmcgPSB0aGlzLmZyb21SZWNpcGUoYXJnKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBwZXhwcnMuQWx0KSB7XG4gICAgICAgIHRlcm1zID0gdGVybXMuY29uY2F0KGFyZy50ZXJtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXJtcy5wdXNoKGFyZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXJtcy5sZW5ndGggPT09IDEgPyB0ZXJtc1swXSA6IG5ldyBwZXhwcnMuQWx0KHRlcm1zKTtcbiAgfSxcblxuICBzZXE6IGZ1bmN0aW9uKC8qIGZhY3RvcjEsIGZhY3RvcjIsIC4uLiAqLykge1xuICAgIHZhciBmYWN0b3JzID0gW107XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaWR4XTtcbiAgICAgIGlmICghKGFyZyBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgICAgYXJnID0gdGhpcy5mcm9tUmVjaXBlKGFyZyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnIGluc3RhbmNlb2YgcGV4cHJzLlNlcSkge1xuICAgICAgICBmYWN0b3JzID0gZmFjdG9ycy5jb25jYXQoYXJnLmZhY3RvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9ycy5wdXNoKGFyZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWN0b3JzLmxlbmd0aCA9PT0gMSA/IGZhY3RvcnNbMF0gOiBuZXcgcGV4cHJzLlNlcShmYWN0b3JzKTtcbiAgfSxcblxuICBzdGFyOiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLlN0YXIoZXhwcik7XG4gIH0sXG5cbiAgcGx1czogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5QbHVzKGV4cHIpO1xuICB9LFxuXG4gIG9wdDogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5PcHQoZXhwcik7XG4gIH0sXG5cbiAgbm90OiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLk5vdChleHByKTtcbiAgfSxcblxuICBsYTogZnVuY3Rpb24oZXhwcikge1xuICAgIC8vIFRPRE86IHRlbXBvcmFyeSB0byBzdGlsbCBiZSBhYmxlIHRvIHJlYWQgb2xkIHJlY2lwZXNcbiAgICByZXR1cm4gdGhpcy5sb29rYWhlYWQoZXhwcik7XG4gIH0sXG5cbiAgbG9va2FoZWFkOiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLkxvb2thaGVhZChleHByKTtcbiAgfSxcblxuICBsZXg6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuTGV4KGV4cHIpO1xuICB9LFxuXG4gIGFwcDogZnVuY3Rpb24ocnVsZU5hbWUsIG9wdFBhcmFtcykge1xuICAgIGlmIChvcHRQYXJhbXMgJiYgb3B0UGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wdFBhcmFtcyA9IG9wdFBhcmFtcy5tYXAoZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByID8gcGFyYW0gOlxuICAgICAgICAgIHRoaXMuZnJvbVJlY2lwZShwYXJhbSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuQXBwbHkocnVsZU5hbWUsIG9wdFBhcmFtcyk7XG4gIH0sXG5cbiAgZnJvbVJlY2lwZTogZnVuY3Rpb24ocmVjaXBlKSB7XG4gICAgLy8gdGhlIG1ldGEtaW5mbyBvZiAnZ3JhbW1hcicgaXMgcHJvY2Nlc3NlZCBpbiBCdWlsZGVyLmdyYW1tYXJcbiAgICB2YXIgcmVzdWx0ID0gdGhpc1tyZWNpcGVbMF1dLmFwcGx5KHRoaXMsXG4gICAgICByZWNpcGVbMF0gPT09ICdncmFtbWFyJyA/IHJlY2lwZS5zbGljZSgxKSA6IHJlY2lwZS5zbGljZSgyKSk7XG5cbiAgICB2YXIgbWV0YUluZm8gPSByZWNpcGVbMV07XG4gICAgaWYgKG1ldGFJbmZvKSB7XG4gICAgICBpZiAobWV0YUluZm8uc291cmNlSW50ZXJ2YWwgJiYgdGhpcy5jdXJyZW50RGVjbCkge1xuICAgICAgICByZXN1bHQud2l0aEludGVydmFsKFxuICAgICAgICAgIHRoaXMuY3VycmVudERlY2wuc291cmNlSW50ZXJ2YWwuYXBwbHkodGhpcy5jdXJyZW50RGVjbCwgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1aWxkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBgRmFpbHVyZWBzIHJlcHJlc2VudCBleHByZXNzaW9ucyB0aGF0IHdlcmVuJ3QgbWF0Y2hlZCB3aGlsZSBwYXJzaW5nLiBUaGV5IGFyZSB1c2VkIHRvIGdlbmVyYXRlXG4gIGVycm9yIG1lc3NhZ2VzIGF1dG9tYXRpY2FsbHkuIFRoZSBpbnRlcmZhY2Ugb2YgYEZhaWx1cmVgcyBpbmNsdWRlcyB0aGUgY29sbG93aW5nIG1ldGhvZHM6XG5cbiAgLSBnZXRUZXh0KCkgOiBTdHJpbmdcbiAgLSBnZXRUeXBlKCkgOiBTdHJpbmcgIChvbmUgb2Yge1wiZGVzY3JpcHRpb25cIiwgXCJzdHJpbmdcIiwgXCJjb2RlXCJ9KVxuICAtIGlzRGVzY3JpcHRpb24oKSA6IGJvb2xcbiAgLSBpc1N0cmluZ1Rlcm1pbmFsKCkgOiBib29sXG4gIC0gaXNDb2RlKCkgOiBib29sXG4gIC0gaXNGbHVmZnkoKSA6IGJvb2xcbiAgLSBtYWtlRmx1ZmZ5KCkgOiB2b2lkXG4gIC0gc3Vic3VtZXMoRmFpbHVyZSkgOiBib29sXG4qL1xuXG5mdW5jdGlvbiBpc1ZhbGlkVHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlID09PSAnZGVzY3JpcHRpb24nIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdjb2RlJztcbn1cblxuZnVuY3Rpb24gRmFpbHVyZShwZXhwciwgdGV4dCwgdHlwZSkge1xuICBpZiAoIWlzVmFsaWRUeXBlKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIEZhaWx1cmUgdHlwZTogJyArIHR5cGUpO1xuICB9XG4gIHRoaXMucGV4cHIgPSBwZXhwcjtcbiAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5mbHVmZnkgPSBmYWxzZTtcbn1cblxuRmFpbHVyZS5wcm90b3R5cGUuZ2V0UEV4cHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucGV4cHI7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRleHQ7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGU7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5pc0Rlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdkZXNjcmlwdGlvbic7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5pc1N0cmluZ1Rlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdzdHJpbmcnO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuaXNDb2RlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdjb2RlJztcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmlzRmx1ZmZ5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZsdWZmeTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLm1ha2VGbHVmZnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mbHVmZnkgPSB0cnVlO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuY2xlYXJGbHVmZnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mbHVmZnkgPSBmYWxzZTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLnN1YnN1bWVzID0gZnVuY3Rpb24odGhhdCkge1xuICByZXR1cm4gdGhpcy5nZXRUZXh0KCkgPT09IHRoYXQuZ2V0VGV4dCgpICYmXG4gICAgICB0aGlzLnR5cGUgPT09IHRoYXQudHlwZSAmJlxuICAgICAgKCF0aGlzLmlzRmx1ZmZ5KCkgfHwgdGhpcy5pc0ZsdWZmeSgpICYmIHRoYXQuaXNGbHVmZnkoKSk7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50eXBlID09PSAnc3RyaW5nJyA/XG4gICAgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRUZXh0KCkpIDpcbiAgICB0aGlzLmdldFRleHQoKTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmYWlsdXJlID0gbmV3IEZhaWx1cmUodGhpcy5wZXhwciwgdGhpcy50ZXh0LCB0aGlzLnR5cGUpO1xuICBpZiAodGhpcy5pc0ZsdWZmeSgpKSB7XG4gICAgZmFpbHVyZS5tYWtlRmx1ZmZ5KCk7XG4gIH1cbiAgcmV0dXJuIGZhaWx1cmU7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS50b0tleSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpICsgJyMnICsgdGhpcy50eXBlO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gRmFpbHVyZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBNYXRjaFJlc3VsdCA9IHJlcXVpcmUoJy4vTWF0Y2hSZXN1bHQnKTtcbnZhciBTZW1hbnRpY3MgPSByZXF1aXJlKCcuL1NlbWFudGljcycpO1xudmFyIFN0YXRlID0gcmVxdWlyZSgnLi9TdGF0ZScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gR3JhbW1hcihcbiAgICBuYW1lLFxuICAgIHN1cGVyR3JhbW1hcixcbiAgICBydWxlQm9kaWVzLFxuICAgIHJ1bGVGb3JtYWxzLFxuICAgIHJ1bGVEZXNjcmlwdGlvbnMsXG4gICAgb3B0RGVmYXVsdFN0YXJ0UnVsZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbiAgdGhpcy5ydWxlQm9kaWVzID0gcnVsZUJvZGllcztcbiAgdGhpcy5ydWxlRm9ybWFscyA9IHJ1bGVGb3JtYWxzO1xuICB0aGlzLnJ1bGVEZXNjcmlwdGlvbnMgPSBydWxlRGVzY3JpcHRpb25zO1xuICBpZiAob3B0RGVmYXVsdFN0YXJ0UnVsZSkge1xuICAgIGlmICghKG9wdERlZmF1bHRTdGFydFJ1bGUgaW4gcnVsZUJvZGllcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhcnQgcnVsZTogJ1wiICsgb3B0RGVmYXVsdFN0YXJ0UnVsZSArXG4gICAgICAgICAgICAgICAgICAgICAgXCInIGlzIG5vdCBhIHJ1bGUgaW4gZ3JhbW1hciAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgIH1cbiAgICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUgPSBvcHREZWZhdWx0U3RhcnRSdWxlO1xuICB9XG59XG5cbnZhciBvaG1HcmFtbWFyO1xudmFyIGJ1aWxkR3JhbW1hcjtcblxuLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGZyb20gbWFpbi5qcyBvbmNlIE9obSBoYXMgbG9hZGVkLlxuR3JhbW1hci5pbml0QXBwbGljYXRpb25QYXJzZXIgPSBmdW5jdGlvbihncmFtbWFyLCBidWlsZGVyRm4pIHtcbiAgb2htR3JhbW1hciA9IGdyYW1tYXI7XG4gIGJ1aWxkR3JhbW1hciA9IGJ1aWxkZXJGbjtcbn07XG5cbkdyYW1tYXIucHJvdG90eXBlID0ge1xuICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ3JhbW1hciBpcyBhIGJ1aWx0LWluIGdyYW1tYXIsIG90aGVyd2lzZSBmYWxzZS5cbiAgLy8gTk9URTogVGhpcyBtaWdodCBnaXZlIGFuIHVuZXhwZWN0ZWQgcmVzdWx0IGlmIGNhbGxlZCBiZWZvcmUgQnVpbHRJblJ1bGVzIGlzIGRlZmluZWQhXG4gIGlzQnVpbHRJbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgPT09IEdyYW1tYXIuUHJvdG9CdWlsdEluUnVsZXMgfHwgdGhpcyA9PT0gR3JhbW1hci5CdWlsdEluUnVsZXM7XG4gIH0sXG5cbiAgX21hdGNoOiBmdW5jdGlvbihpbnB1dCwgb3B0cykge1xuICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZSh0aGlzLCBpbnB1dCwgb3B0cyk7XG4gICAgc3RhdGUuZXZhbEZyb21TdGFydCgpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcblxuICBtYXRjaDogZnVuY3Rpb24oaW5wdXQsIG9wdFN0YXJ0QXBwbGljYXRpb24pIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9tYXRjaChpbnB1dCwge3N0YXJ0QXBwbGljYXRpb246IG9wdFN0YXJ0QXBwbGljYXRpb259KTtcbiAgICByZXR1cm4gTWF0Y2hSZXN1bHQubmV3Rm9yKHN0YXRlKTtcbiAgfSxcblxuICB0cmFjZTogZnVuY3Rpb24oaW5wdXQsIG9wdFN0YXJ0QXBwbGljYXRpb24pIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9tYXRjaChpbnB1dCwge3N0YXJ0QXBwbGljYXRpb246IG9wdFN0YXJ0QXBwbGljYXRpb24sIHRyYWNlOiB0cnVlfSk7XG5cbiAgICAvLyBUaGUgdHJhY2Ugbm9kZSBmb3IgdGhlIHN0YXJ0IHJ1bGUgaXMgYWx3YXlzIHRoZSBsYXN0IGVudHJ5LiBJZiBpdCBpcyBhIHN5bnRhY3RpYyBydWxlLFxuICAgIC8vIHRoZSBmaXJzdCBlbnRyeSBpcyBmb3IgYW4gYXBwbGljYXRpb24gb2YgJ3NwYWNlcycuXG4gICAgLy8gVE9ETyhwZHVicm95KTogQ2xlYW4gdGhpcyB1cCBieSBpbnRyb2R1Y2luZyBhIHNwZWNpYWwgYE1hdGNoPHN0YXJ0QXBwbD5gIHJ1bGUsIHdoaWNoIHdpbGxcbiAgICAvLyBlbnN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgYSBzaW5nbGUgcm9vdCB0cmFjZSBub2RlLlxuICAgIHZhciByb290VHJhY2UgPSBzdGF0ZS50cmFjZVtzdGF0ZS50cmFjZS5sZW5ndGggLSAxXTtcbiAgICByb290VHJhY2Uuc3RhdGUgPSBzdGF0ZTtcbiAgICByb290VHJhY2UucmVzdWx0ID0gTWF0Y2hSZXN1bHQubmV3Rm9yKHN0YXRlKTtcbiAgICByZXR1cm4gcm9vdFRyYWNlO1xuICB9LFxuXG4gIHNlbWFudGljczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3ModGhpcyk7XG4gIH0sXG5cbiAgZXh0ZW5kU2VtYW50aWNzOiBmdW5jdGlvbihzdXBlclNlbWFudGljcykge1xuICAgIHJldHVybiBTZW1hbnRpY3MuY3JlYXRlU2VtYW50aWNzKHRoaXMsIHN1cGVyU2VtYW50aWNzLl9nZXRTZW1hbnRpY3MoKSk7XG4gIH0sXG5cbiAgLy8gQ2hlY2sgdGhhdCBldmVyeSBrZXkgaW4gYGFjdGlvbkRpY3RgIGNvcnJlc3BvbmRzIHRvIGEgc2VtYW50aWMgYWN0aW9uLCBhbmQgdGhhdCBpdCBtYXBzIHRvXG4gIC8vIGEgZnVuY3Rpb24gb2YgdGhlIGNvcnJlY3QgYXJpdHkuIElmIG5vdCwgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICBfY2hlY2tUb3BEb3duQWN0aW9uRGljdDogZnVuY3Rpb24od2hhdCwgbmFtZSwgYWN0aW9uRGljdCkge1xuICAgIGZ1bmN0aW9uIGlzU3BlY2lhbEFjdGlvbihhKSB7XG4gICAgICByZXR1cm4gYSA9PT0gJ19pdGVyJyB8fCBhID09PSAnX3Rlcm1pbmFsJyB8fCBhID09PSAnX25vbnRlcm1pbmFsJyB8fCBhID09PSAnX2RlZmF1bHQnO1xuICAgIH1cblxuICAgIHZhciBwcm9ibGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gYWN0aW9uRGljdCkge1xuICAgICAgdmFyIHYgPSBhY3Rpb25EaWN0W2tdO1xuICAgICAgaWYgKCFpc1NwZWNpYWxBY3Rpb24oaykgJiYgIShrIGluIHRoaXMucnVsZUJvZGllcykpIHtcbiAgICAgICAgcHJvYmxlbXMucHVzaChcIidcIiArIGsgKyBcIicgaXMgbm90IGEgdmFsaWQgc2VtYW50aWMgYWN0aW9uIGZvciAnXCIgKyB0aGlzLm5hbWUgKyBcIidcIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByb2JsZW1zLnB1c2goXG4gICAgICAgICAgICBcIidcIiArIGsgKyBcIicgbXVzdCBiZSBhIGZ1bmN0aW9uIGluIGFuIGFjdGlvbiBkaWN0aW9uYXJ5IGZvciAnXCIgKyB0aGlzLm5hbWUgKyBcIidcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYWN0dWFsID0gdi5sZW5ndGg7XG4gICAgICAgIHZhciBleHBlY3RlZCA9IHRoaXMuX3RvcERvd25BY3Rpb25Bcml0eShrKTtcbiAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICAgICAgICBwcm9ibGVtcy5wdXNoKFxuICAgICAgICAgICAgICBcIlNlbWFudGljIGFjdGlvbiAnXCIgKyBrICsgXCInIGhhcyB0aGUgd3JvbmcgYXJpdHk6IFwiICtcbiAgICAgICAgICAgICAgJ2V4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvYmxlbXMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHByZXR0eVByb2JsZW1zID0gcHJvYmxlbXMubWFwKGZ1bmN0aW9uKHByb2JsZW0pIHsgcmV0dXJuICctICcgKyBwcm9ibGVtOyB9KTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgICBcIkZvdW5kIGVycm9ycyBpbiB0aGUgYWN0aW9uIGRpY3Rpb25hcnkgb2YgdGhlICdcIiArIG5hbWUgKyBcIicgXCIgKyB3aGF0ICsgJzpcXG4nICtcbiAgICAgICAgICBwcmV0dHlQcm9ibGVtcy5qb2luKCdcXG4nKSk7XG4gICAgICBlcnJvci5wcm9ibGVtcyA9IHByb2JsZW1zO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9LFxuXG4gIC8vIFJldHVybiB0aGUgZXhwZWN0ZWQgYXJpdHkgZm9yIGEgc2VtYW50aWMgYWN0aW9uIG5hbWVkIGBhY3Rpb25OYW1lYCwgd2hpY2hcbiAgLy8gaXMgZWl0aGVyIGEgcnVsZSBuYW1lIG9yIGEgc3BlY2lhbCBhY3Rpb24gbmFtZSBsaWtlICdfbm9udGVybWluYWwnLlxuICBfdG9wRG93bkFjdGlvbkFyaXR5OiBmdW5jdGlvbihhY3Rpb25OYW1lKSB7XG4gICAgaWYgKGFjdGlvbk5hbWUgPT09ICdfaXRlcicgfHwgYWN0aW9uTmFtZSA9PT0gJ19ub250ZXJtaW5hbCcgfHwgYWN0aW9uTmFtZSA9PT0gJ19kZWZhdWx0Jykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChhY3Rpb25OYW1lID09PSAnX3Rlcm1pbmFsJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJ1bGVCb2RpZXNbYWN0aW9uTmFtZV0uZ2V0QXJpdHkoKTtcbiAgfSxcblxuICBfaW5oZXJpdHNGcm9tOiBmdW5jdGlvbihncmFtbWFyKSB7XG4gICAgdmFyIGcgPSB0aGlzLnN1cGVyR3JhbW1hcjtcbiAgICB3aGlsZSAoZykge1xuICAgICAgaWYgKGcgPT09IGdyYW1tYXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBnID0gZy5zdXBlckdyYW1tYXI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICB0b1JlY2lwZTogZnVuY3Rpb24ob3B0VmFyTmFtZSkge1xuICAgIHZhciBtZXRhSW5mbyA9IHt9O1xuICAgIC8vIEluY2x1ZGUgdGhlIGdyYW1tYXIgc291cmNlIGlmIGl0IGlzIGF2YWlsYWJsZS5cbiAgICBpZiAodGhpcy5kZWZpbml0aW9uSW50ZXJ2YWwpIHtcbiAgICAgIG1ldGFJbmZvLnNvdXJjZSA9IHRoaXMuZGVmaW5pdGlvbkludGVydmFsLmNvbnRlbnRzO1xuICAgIH1cblxuICAgIHZhciBzdXBlckdyYW1tYXIgPSBudWxsO1xuICAgIGlmICh0aGlzLnN1cGVyR3JhbW1hciAmJiAhdGhpcy5zdXBlckdyYW1tYXIuaXNCdWlsdEluKCkpIHtcbiAgICAgIHN1cGVyR3JhbW1hciA9IEpTT04ucGFyc2UodGhpcy5zdXBlckdyYW1tYXIudG9SZWNpcGUoKSk7XG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0UnVsZSA9IG51bGw7XG4gICAgaWYgKHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSkge1xuICAgICAgc3RhcnRSdWxlID0gdGhpcy5kZWZhdWx0U3RhcnRSdWxlO1xuICAgIH1cblxuICAgIHZhciBydWxlcyA9IHt9O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJ1bGVCb2RpZXMpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICAgIHZhciBib2R5ID0gc2VsZi5ydWxlQm9kaWVzW3J1bGVOYW1lXTtcbiAgICAgIHZhciBpc0RlZmluaXRpb24gPSAhc2VsZi5zdXBlckdyYW1tYXIgfHwgIXNlbGYuc3VwZXJHcmFtbWFyLnJ1bGVCb2RpZXNbcnVsZU5hbWVdO1xuXG4gICAgICB2YXIgb3BlcmF0aW9uO1xuICAgICAgaWYgKGlzRGVmaW5pdGlvbikge1xuICAgICAgICBvcGVyYXRpb24gPSAnZGVmaW5lJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wZXJhdGlvbiA9IGJvZHkgaW5zdGFuY2VvZiBwZXhwcnMuRXh0ZW5kID8gJ2V4dGVuZCcgOiAnb3ZlcnJpZGUnO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWV0YUluZm8gPSB7fTtcbiAgICAgIGlmIChib2R5LmRlZmluaXRpb25JbnRlcnZhbCAmJiBzZWxmLmRlZmluaXRpb25JbnRlcnZhbCkge1xuICAgICAgICB2YXIgYWRqdXN0ZWQgPSBib2R5LmRlZmluaXRpb25JbnRlcnZhbC5yZWxhdGl2ZVRvKHNlbGYuZGVmaW5pdGlvbkludGVydmFsKTtcbiAgICAgICAgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwgPSBbYWRqdXN0ZWQuc3RhcnRJZHgsIGFkanVzdGVkLmVuZElkeF07XG4gICAgICB9XG5cbiAgICAgIHZhciBkZXNjcmlwdGlvbiA9IG51bGw7XG4gICAgICBpZiAoaXNEZWZpbml0aW9uICYmIHNlbGYucnVsZURlc2NyaXB0aW9uc1tydWxlTmFtZV0pIHtcbiAgICAgICAgZGVzY3JpcHRpb24gPSBzZWxmLnJ1bGVEZXNjcmlwdGlvbnNbcnVsZU5hbWVdO1xuICAgICAgfVxuXG4gICAgICB2YXIgZm9ybWFscyA9IHNlbGYucnVsZUZvcm1hbHNbcnVsZU5hbWVdO1xuICAgICAgdmFyIHJ1bGVCb2R5ID0gYm9keS5vdXRwdXRSZWNpcGUoZm9ybWFscywgc2VsZi5kZWZpbml0aW9uSW50ZXJ2YWwpO1xuXG4gICAgICBydWxlc1tydWxlTmFtZV0gPSBbXG4gICAgICAgIG9wZXJhdGlvbiwgLy8gXCJkZWZpbmVcIi9cImV4dGVuZFwiL1wib3ZlcnJpZGVcIlxuICAgICAgICBtZXRhSW5mbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGZvcm1hbHMsXG4gICAgICAgIHJ1bGVCb2R5XG4gICAgICBdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFtcbiAgICAgICdncmFtbWFyJyxcbiAgICAgIG1ldGFJbmZvLFxuICAgICAgdGhpcy5uYW1lLFxuICAgICAgc3VwZXJHcmFtbWFyLFxuICAgICAgc3RhcnRSdWxlLFxuICAgICAgcnVsZXNcbiAgICBdKTtcbiAgfSxcblxuICAvLyBUT0RPOiBDb21lIHVwIHdpdGggYmV0dGVyIG5hbWVzIGZvciB0aGVzZSBtZXRob2RzLlxuICAvLyBUT0RPOiBXcml0ZSB0aGUgYW5hbG9nIG9mIHRoZXNlIG1ldGhvZHMgZm9yIGluaGVyaXRlZCBhdHRyaWJ1dGVzLlxuICB0b09wZXJhdGlvbkFjdGlvbkRpY3Rpb25hcnlUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvT3BlcmF0aW9uT3JBdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGUoKTtcbiAgfSxcbiAgdG9BdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl90b09wZXJhdGlvbk9yQXR0cmlidXRlQWN0aW9uRGljdGlvbmFyeVRlbXBsYXRlKCk7XG4gIH0sXG5cbiAgX3RvT3BlcmF0aW9uT3JBdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IGFkZCB0aGUgc3VwZXItZ3JhbW1hcidzIHRlbXBsYXRlcyBhdCB0aGUgcmlnaHQgcGxhY2UsIGUuZy4sIGEgY2FzZSBmb3IgQWRkRXhwcl9wbHVzXG4gICAgLy8gc2hvdWxkIGFwcGVhciBuZXh0IHRvIG90aGVyIGNhc2VzIG9mIEFkZEV4cHIuXG5cbiAgICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICAgIHNiLmFwcGVuZCgneycpO1xuXG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBydWxlTmFtZSBpbiB0aGlzLnJ1bGVCb2RpZXMpIHtcbiAgICAgIHZhciBib2R5ID0gdGhpcy5ydWxlQm9kaWVzW3J1bGVOYW1lXTtcbiAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2IuYXBwZW5kKCcsJyk7XG4gICAgICB9XG4gICAgICBzYi5hcHBlbmQoJ1xcbicpO1xuICAgICAgc2IuYXBwZW5kKCcgICcpO1xuICAgICAgdGhpcy5hZGRTZW1hbnRpY0FjdGlvblRlbXBsYXRlKHJ1bGVOYW1lLCBib2R5LCBzYik7XG4gICAgfVxuXG4gICAgc2IuYXBwZW5kKCdcXG59Jyk7XG4gICAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG4gIH0sXG5cbiAgYWRkU2VtYW50aWNBY3Rpb25UZW1wbGF0ZTogZnVuY3Rpb24ocnVsZU5hbWUsIGJvZHksIHNiKSB7XG4gICAgc2IuYXBwZW5kKHJ1bGVOYW1lKTtcbiAgICBzYi5hcHBlbmQoJzogZnVuY3Rpb24oJyk7XG4gICAgdmFyIGFyaXR5ID0gdGhpcy5fdG9wRG93bkFjdGlvbkFyaXR5KHJ1bGVOYW1lKTtcbiAgICBzYi5hcHBlbmQoY29tbW9uLnJlcGVhdCgnXycsIGFyaXR5KS5qb2luKCcsICcpKTtcbiAgICBzYi5hcHBlbmQoJykge1xcbicpO1xuICAgIHNiLmFwcGVuZCgnICB9Jyk7XG4gIH0sXG5cbiAgLy8gUGFyc2UgYSBzdHJpbmcgd2hpY2ggZXhwcmVzc2VzIGEgcnVsZSBhcHBsaWNhdGlvbiBpbiB0aGlzIGdyYW1tYXIsIGFuZCByZXR1cm4gdGhlXG4gIC8vIHJlc3VsdGluZyBBcHBseSBub2RlLlxuICBwYXJzZUFwcGxpY2F0aW9uOiBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgYXBwO1xuICAgIGlmIChzdHIuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgLy8gc2ltcGxlIGFwcGxpY2F0aW9uXG4gICAgICBhcHAgPSBuZXcgcGV4cHJzLkFwcGx5KHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHBhcmFtZXRlcml6ZWQgYXBwbGljYXRpb25cbiAgICAgIHZhciBjc3QgPSBvaG1HcmFtbWFyLm1hdGNoKHN0ciwgJ0Jhc2VfYXBwbGljYXRpb24nKTtcbiAgICAgIGFwcCA9IGJ1aWxkR3JhbW1hcihjc3QsIHt9KTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgdmFsaWQuXG4gICAgaWYgKCEoYXBwLnJ1bGVOYW1lIGluIHRoaXMucnVsZUJvZGllcykpIHtcbiAgICAgIHRocm93IGVycm9ycy51bmRlY2xhcmVkUnVsZShhcHAucnVsZU5hbWUsIHRoaXMubmFtZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJ1bGVGb3JtYWxzW2FwcC5ydWxlTmFtZV0ubGVuZ3RoICE9PSBhcHAuYXJncy5sZW5ndGgpIHtcbiAgICAgIHRocm93IGVycm9ycy53cm9uZ051bWJlck9mUGFyYW1ldGVycyhcbiAgICAgICAgICBhcHAucnVsZU5hbWUsIHRoaXMucnVsZUZvcm1hbHNbYXBwLnJ1bGVOYW1lXS5sZW5ndGgsIGFwcC5hcmdzLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBhcHA7XG4gIH1cbn07XG5cbi8vIFRoZSBmb2xsb3dpbmcgZ3JhbW1hciBjb250YWlucyBhIGZldyBydWxlcyB0aGF0IGNvdWxkbid0IGJlIHdyaXR0ZW4gIGluIFwidXNlcmxhbmRcIi5cbi8vIEF0IHRoZSBib3R0b20gb2Ygc3JjL21haW4uanMsIHdlIGNyZWF0ZSBhIHN1Yi1ncmFtbWFyIG9mIHRoaXMgZ3JhbW1hciB0aGF0J3MgY2FsbGVkXG4vLyBgQnVpbHRJblJ1bGVzYC4gVGhhdCBncmFtbWFyIGNvbnRhaW5zIHNldmVyYWwgY29udmVuaWVuY2UgcnVsZXMsIGUuZy4sIGBsZXR0ZXJgIGFuZFxuLy8gYGRpZ2l0YCwgYW5kIGlzIGltcGxpY2l0bHkgdGhlIHN1cGVyLWdyYW1tYXIgb2YgYW55IGdyYW1tYXIgd2hvc2Ugc3VwZXItZ3JhbW1hclxuLy8gaXNuJ3Qgc3BlY2lmaWVkLlxuR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcyA9IG5ldyBHcmFtbWFyKFxuICAgICdQcm90b0J1aWx0SW5SdWxlcycsICAvLyBuYW1lXG4gICAgdW5kZWZpbmVkLCAgLy8gc3VwZXJncmFtbWFyXG5cbiAgICAvLyBydWxlIGJvZGllc1xuICAgIHtcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgcnVsZXMgY2FuJ3QgYmUgd3JpdHRlbiBpbiB1c2VybGFuZCBiZWNhdXNlIHRoZXkgcmVmZXJlbmNlXG4gICAgICAvLyBgYW55YCBhbmQgYGVuZGAgZGlyZWN0bHkuXG4gICAgICBhbnk6IHBleHBycy5hbnksXG4gICAgICBlbmQ6IHBleHBycy5lbmQsXG5cbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgcnVsZSBpcyBpbnZva2VkIGltcGxpY2l0bHkgYnkgc3ludGFjdGljIHJ1bGVzIHRvIHNraXAgc3BhY2VzLlxuICAgICAgc3BhY2VzOiBuZXcgcGV4cHJzLlN0YXIobmV3IHBleHBycy5BcHBseSgnc3BhY2UnKSksXG5cbiAgICAgIC8vIFRoZSBgc3BhY2VgIHJ1bGUgbXVzdCBiZSBkZWZpbmVkIGhlcmUgYmVjYXVzZSBpdCdzIHJlZmVyZW5jZWQgYnkgYHNwYWNlc2AuXG4gICAgICBzcGFjZTogbmV3IHBleHBycy5SYW5nZSgnXFx4MDAnLCAnICcpLFxuXG4gICAgICAvLyBUaGVzZSBydWxlcyBhcmUgaW1wbGVtZW50ZWQgbmF0aXZlbHkgYmVjYXVzZSB0aGV5IHVzZSBVbmljb2RlQ2hhciBkaXJlY3RseSwgd2hpY2ggaXNcbiAgICAgIC8vIG5vdCBwYXJ0IG9mIHRoZSBPaG0gZ3JhbW1hci5cbiAgICAgIGxvd2VyOiBuZXcgcGV4cHJzLlVuaWNvZGVDaGFyKCdMbCcpLFxuICAgICAgdXBwZXI6IG5ldyBwZXhwcnMuVW5pY29kZUNoYXIoJ0x1JyksXG5cbiAgICAgIC8vIFRoZSB1bmlvbiBvZiBMdCAodGl0bGVjYXNlKSwgTG0gKG1vZGlmaWVyKSwgYW5kIExvIChvdGhlciksIGkuZS4gYW55IGxldHRlciBub3RcbiAgICAgIC8vIGluIExsIG9yIEx1LlxuICAgICAgdW5pY29kZUx0bW86IG5ldyBwZXhwcnMuVW5pY29kZUNoYXIoJ0x0bW8nKVxuICAgIH0sXG5cbiAgICAvLyBydWxlIGZvcm1hbCBhcmd1bWVudHNcbiAgICB7XG4gICAgICBhbnk6IFtdLFxuICAgICAgZW5kOiBbXSxcbiAgICAgIHNwYWNlczogW10sXG4gICAgICBzcGFjZTogW10sXG4gICAgICBsb3dlcjogW10sXG4gICAgICB1cHBlcjogW10sXG4gICAgICB1bmljb2RlTHRtbzogW11cbiAgICB9LFxuXG4gICAgLy8gcnVsZSBkZXNjcmlwdGlvbnNcbiAgICB7XG4gICAgICBhbnk6ICdhbnkgb2JqZWN0JyxcbiAgICAgIGVuZDogJ2VuZCBvZiBpbnB1dCcsXG4gICAgICBzcGFjZTogJ2Egc3BhY2UnLFxuICAgICAgbG93ZXI6ICdhIGxvd2VyY2FzZSBsZXR0ZXInLFxuICAgICAgdXBwZXI6ICdhbiB1cHBlcmNhc2UgbGV0dGVyJ1xuICAgIH1cbik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW1tYXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4vR3JhbW1hcicpO1xudmFyIElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9JbnB1dFN0cmVhbScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBTdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gQ29uc3RydWN0b3JzXG5cbmZ1bmN0aW9uIEdyYW1tYXJEZWNsKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbn1cblxuLy8gSGVscGVyc1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuc291cmNlSW50ZXJ2YWwgPSBmdW5jdGlvbihzdGFydElkeCwgZW5kSWR4KSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHRoaXMuaW50ZXJ2YWwuaW5wdXRTdHJlYW07XG4gIHJldHVybiBpbnB1dFN0cmVhbS5pbnRlcnZhbChzdGFydElkeCwgZW5kSWR4KTtcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5lbnN1cmVTdXBlckdyYW1tYXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLnN1cGVyR3JhbW1hcikge1xuICAgIHRoaXMud2l0aFN1cGVyR3JhbW1hcihcbiAgICAgICAgLy8gVE9ETzogVGhlIGNvbmRpdGlvbmFsIGV4cHJlc3Npb24gYmVsb3cgaXMgYW4gdWdseSBoYWNrLiBJdCdzIGtpbmQgb2Ygb2sgYmVjYXVzZVxuICAgICAgICAvLyBJIGRvdWJ0IGFueW9uZSB3aWxsIGV2ZXIgdHJ5IHRvIGRlY2xhcmUgYSBncmFtbWFyIGNhbGxlZCBgQnVpbHRJblJ1bGVzYC4gU3RpbGwsXG4gICAgICAgIC8vIHdlIHNob3VsZCB0cnkgdG8gZmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhpcy5cbiAgICAgICAgdGhpcy5uYW1lID09PSAnQnVpbHRJblJ1bGVzJyA/XG4gICAgICAgICAgICBHcmFtbWFyLlByb3RvQnVpbHRJblJ1bGVzIDpcbiAgICAgICAgICAgIEdyYW1tYXIuQnVpbHRJblJ1bGVzKTtcbiAgfVxuICByZXR1cm4gdGhpcy5zdXBlckdyYW1tYXI7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuaW5zdGFsbE92ZXJyaWRkZW5PckV4dGVuZGVkUnVsZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcm1hbHMsIGJvZHkpIHtcbiAgdmFyIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMoZm9ybWFscyk7XG4gIGlmIChkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKG5hbWUsIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLCBib2R5KTtcbiAgfVxuICB2YXIgZXhwZWN0ZWRGb3JtYWxzID0gdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKS5ydWxlRm9ybWFsc1tuYW1lXTtcbiAgdmFyIGV4cGVjdGVkTnVtRm9ybWFscyA9IGV4cGVjdGVkRm9ybWFscyA/IGV4cGVjdGVkRm9ybWFscy5sZW5ndGggOiAwO1xuICBpZiAoZm9ybWFscy5sZW5ndGggIT09IGV4cGVjdGVkTnVtRm9ybWFscykge1xuICAgIHRocm93IGVycm9ycy53cm9uZ051bWJlck9mUGFyYW1ldGVycyhuYW1lLCBleHBlY3RlZE51bUZvcm1hbHMsIGZvcm1hbHMubGVuZ3RoLCBib2R5KTtcbiAgfVxuICByZXR1cm4gdGhpcy5pbnN0YWxsKG5hbWUsIGZvcm1hbHMsIGJvZHkpO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmluc3RhbGwgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBib2R5LCBvcHREZXNjcmlwdGlvbikge1xuICBib2R5ID0gYm9keS5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gIHRoaXMucnVsZUZvcm1hbHNbbmFtZV0gPSBmb3JtYWxzO1xuICBpZiAob3B0RGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLnJ1bGVEZXNjcmlwdGlvbnNbbmFtZV0gPSBvcHREZXNjcmlwdGlvbjtcbiAgfVxuICB0aGlzLnJ1bGVCb2RpZXNbbmFtZV0gPSBib2R5O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFN0dWZmIHRoYXQgeW91IHNob3VsZCBvbmx5IGRvIG9uY2VcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLndpdGhTdXBlckdyYW1tYXIgPSBmdW5jdGlvbihzdXBlckdyYW1tYXIpIHtcbiAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgc3VwZXIgZ3JhbW1hciBvZiBhIEdyYW1tYXJEZWNsIGNhbm5vdCBiZSBzZXQgbW9yZSB0aGFuIG9uY2UnKTtcbiAgfVxuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbiAgdGhpcy5ydWxlQm9kaWVzID0gT2JqZWN0LmNyZWF0ZShzdXBlckdyYW1tYXIucnVsZUJvZGllcyk7XG4gIHRoaXMucnVsZUZvcm1hbHMgPSBPYmplY3QuY3JlYXRlKHN1cGVyR3JhbW1hci5ydWxlRm9ybWFscyk7XG4gIHRoaXMucnVsZURlc2NyaXB0aW9ucyA9IE9iamVjdC5jcmVhdGUoc3VwZXJHcmFtbWFyLnJ1bGVEZXNjcmlwdGlvbnMpO1xuXG4gIC8vIEdyYW1tYXJzIHdpdGggYW4gZXhwbGljaXQgc3VwZXJncmFtbWFyIGluaGVyaXQgYSBkZWZhdWx0IHN0YXJ0IHJ1bGUuXG4gIGlmICghc3VwZXJHcmFtbWFyLmlzQnVpbHRJbigpKSB7XG4gICAgdGhpcy5kZWZhdWx0U3RhcnRSdWxlID0gc3VwZXJHcmFtbWFyLmRlZmF1bHRTdGFydFJ1bGU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aERlZmF1bHRTdGFydFJ1bGUgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUgPSBydWxlTmFtZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aFNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICB0aGlzLmludGVydmFsID0gbmV3IElucHV0U3RyZWFtKHNvdXJjZSkuaW50ZXJ2YWwoMCwgc291cmNlLmxlbmd0aCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gQ3JlYXRlcyBhIEdyYW1tYXIgaW5zdGFuY2UsIGFuZCBpZiBpdCBwYXNzZXMgdGhlIHNhbml0eSBjaGVja3MsIHJldHVybnMgaXQuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGdyYW1tYXIgPSBuZXcgR3JhbW1hcihcbiAgICAgIHRoaXMubmFtZSxcbiAgICAgIHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCksXG4gICAgICB0aGlzLnJ1bGVCb2RpZXMsXG4gICAgICB0aGlzLnJ1bGVGb3JtYWxzLFxuICAgICAgdGhpcy5ydWxlRGVzY3JpcHRpb25zLFxuICAgICAgdGhpcy5kZWZhdWx0U3RhcnRSdWxlKTtcbiAgLy8gVE9ETzogY2hhbmdlIHRoZSBwZXhwci5wcm90b3R5cGUuYXNzZXJ0Li4uIG1ldGhvZHMgdG8gbWFrZSB0aGVtIGFkZFxuICAvLyBleGNlcHRpb25zIHRvIGFuIGFycmF5IHRoYXQncyBwcm92aWRlZCBhcyBhbiBhcmcuIFRoZW4gd2UnbGwgYmUgYWJsZSB0b1xuICAvLyBzaG93IG1vcmUgdGhhbiBvbmUgZXJyb3Igb2YgdGhlIHNhbWUgdHlwZSBhdCBhIHRpbWUuXG4gIC8vIFRPRE86IGluY2x1ZGUgdGhlIG9mZmVuZGluZyBwZXhwciBpbiB0aGUgZXJyb3JzLCB0aGF0IHdheSB3ZSBjYW4gc2hvd1xuICAvLyB0aGUgcGFydCBvZiB0aGUgc291cmNlIHRoYXQgY2F1c2VkIGl0LlxuICB2YXIgZ3JhbW1hckVycm9ycyA9IFtdO1xuICB2YXIgZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMgPSBmYWxzZTtcbiAgT2JqZWN0LmtleXMoZ3JhbW1hci5ydWxlQm9kaWVzKS5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgdmFyIGJvZHkgPSBncmFtbWFyLnJ1bGVCb2RpZXNbcnVsZU5hbWVdO1xuICAgIHRyeSB7XG4gICAgICBib2R5LmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5KHJ1bGVOYW1lKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBncmFtbWFyRXJyb3JzLnB1c2goZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBib2R5LmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBncmFtbWFyRXJyb3JzLnB1c2goZSk7XG4gICAgICBncmFtbWFySGFzSW52YWxpZEFwcGxpY2F0aW9ucyA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKCFncmFtbWFySGFzSW52YWxpZEFwcGxpY2F0aW9ucykge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgY2hlY2sgY2FuIG9ubHkgYmUgZG9uZSBpZiB0aGUgZ3JhbW1hciBoYXMgbm8gaW52YWxpZCBhcHBsaWNhdGlvbnMuXG4gICAgT2JqZWN0LmtleXMoZ3JhbW1hci5ydWxlQm9kaWVzKS5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgICB2YXIgYm9keSA9IGdyYW1tYXIucnVsZUJvZGllc1tydWxlTmFtZV07XG4gICAgICB0cnkge1xuICAgICAgICBib2R5LmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdyYW1tYXJFcnJvcnMucHVzaChlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBpZiAoZ3JhbW1hckVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgZXJyb3JzLnRocm93RXJyb3JzKGdyYW1tYXJFcnJvcnMpO1xuICB9XG4gIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgZ3JhbW1hci5kZWZpbml0aW9uSW50ZXJ2YWwgPSB0aGlzLmludGVydmFsO1xuICB9XG5cbiAgcmV0dXJuIGdyYW1tYXI7XG59O1xuXG4vLyBSdWxlIGRlY2xhcmF0aW9uc1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24obmFtZSwgZm9ybWFscywgYm9keSwgb3B0RGVzY3IpIHtcbiAgdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKTtcbiAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVCb2RpZXNbbmFtZV0pIHtcbiAgICB0aHJvdyBlcnJvcnMuZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uKG5hbWUsIHRoaXMubmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSwgYm9keSk7XG4gIH0gZWxzZSBpZiAodGhpcy5ydWxlQm9kaWVzW25hbWVdKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihuYW1lLCB0aGlzLm5hbWUsIHRoaXMubmFtZSwgYm9keSk7XG4gIH1cbiAgdmFyIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMoZm9ybWFscyk7XG4gIGlmIChkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKG5hbWUsIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLCBib2R5KTtcbiAgfVxuICByZXR1cm4gdGhpcy5pbnN0YWxsKG5hbWUsIGZvcm1hbHMsIGJvZHksIG9wdERlc2NyKTtcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5vdmVycmlkZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcm1hbHMsIGJvZHkpIHtcbiAgdmFyIGJhc2VSdWxlID0gdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKS5ydWxlQm9kaWVzW25hbWVdO1xuICBpZiAoIWJhc2VSdWxlKSB7XG4gICAgdGhyb3cgZXJyb3JzLmNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGUobmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSwgYm9keSk7XG4gIH1cbiAgdGhpcy5pbnN0YWxsT3ZlcnJpZGRlbk9yRXh0ZW5kZWRSdWxlKG5hbWUsIGZvcm1hbHMsIGJvZHkpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBmcmFnbWVudCkge1xuICB2YXIgYmFzZVJ1bGUgPSB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLnJ1bGVCb2RpZXNbbmFtZV07XG4gIGlmICghYmFzZVJ1bGUpIHtcbiAgICB0aHJvdyBlcnJvcnMuY2Fubm90RXh0ZW5kVW5kZWNsYXJlZFJ1bGUobmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSwgZnJhZ21lbnQpO1xuICB9XG4gIHZhciBib2R5ID0gbmV3IHBleHBycy5FeHRlbmQodGhpcy5zdXBlckdyYW1tYXIsIG5hbWUsIGZyYWdtZW50KTtcbiAgYm9keS5pbnRlcnZhbCA9IGZyYWdtZW50LmludGVydmFsO1xuICBib2R5LmRlZmluaXRpb25JbnRlcnZhbCA9IGZyYWdtZW50LmRlZmluaXRpb25JbnRlcnZhbDtcbiAgdGhpcy5pbnN0YWxsT3ZlcnJpZGRlbk9yRXh0ZW5kZWRSdWxlKG5hbWUsIGZvcm1hbHMsIGJvZHkpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW1tYXJEZWNsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gSW5wdXRTdHJlYW0oc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlO1xuICB0aGlzLnBvcyA9IDA7XG4gIHRoaXMucG9zSW5mb3MgPSBbXTtcbn1cblxuSW5wdXRTdHJlYW0ucHJvdG90eXBlID0ge1xuICBhdEVuZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zID09PSB0aGlzLnNvdXJjZS5sZW5ndGg7XG4gIH0sXG5cbiAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlW3RoaXMucG9zKytdO1xuICB9LFxuXG4gIG1hdGNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBpZiAodGhpcy5uZXh0KCkgIT09IHNbaWR4XSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHNvdXJjZVNsaWNlOiBmdW5jdGlvbihzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0SWR4LCBlbmRJZHgpO1xuICB9LFxuXG4gIGludGVydmFsOiBmdW5jdGlvbihzdGFydElkeCwgb3B0RW5kSWR4KSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLCBzdGFydElkeCwgb3B0RW5kSWR4ID8gb3B0RW5kSWR4IDogdGhpcy5wb3MpO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0cmVhbTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2NvbW1vbicpLmFzc2VydDtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEludGVydmFsKGlucHV0U3RyZWFtLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgdGhpcy5zdGFydElkeCA9IHN0YXJ0SWR4O1xuICB0aGlzLmVuZElkeCA9IGVuZElkeDtcbn1cblxuSW50ZXJ2YWwuY292ZXJhZ2UgPSBmdW5jdGlvbigvKiBpbnRlcnZhbDEsIGludGVydmFsMiwgLi4uICovKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IGFyZ3VtZW50c1swXS5pbnB1dFN0cmVhbTtcbiAgdmFyIHN0YXJ0SWR4ID0gYXJndW1lbnRzWzBdLnN0YXJ0SWR4O1xuICB2YXIgZW5kSWR4ID0gYXJndW1lbnRzWzBdLmVuZElkeDtcbiAgZm9yICh2YXIgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgaW50ZXJ2YWwgPSBhcmd1bWVudHNbaWR4XTtcbiAgICBpZiAoaW50ZXJ2YWwuaW5wdXRTdHJlYW0gIT09IGlucHV0U3RyZWFtKSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0SWR4ID0gTWF0aC5taW4oc3RhcnRJZHgsIGFyZ3VtZW50c1tpZHhdLnN0YXJ0SWR4KTtcbiAgICAgIGVuZElkeCA9IE1hdGgubWF4KGVuZElkeCwgYXJndW1lbnRzW2lkeF0uZW5kSWR4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBJbnRlcnZhbChpbnB1dFN0cmVhbSwgc3RhcnRJZHgsIGVuZElkeCk7XG59O1xuXG5JbnRlcnZhbC5wcm90b3R5cGUgPSB7XG4gIGNvdmVyYWdlV2l0aDogZnVuY3Rpb24oLyogaW50ZXJ2YWwxLCBpbnRlcnZhbDIsIC4uLiAqLykge1xuICAgIHZhciBpbnRlcnZhbHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGludGVydmFscy5wdXNoKHRoaXMpO1xuICAgIHJldHVybiBJbnRlcnZhbC5jb3ZlcmFnZS5hcHBseSh1bmRlZmluZWQsIGludGVydmFscyk7XG4gIH0sXG5cbiAgY29sbGFwc2VkTGVmdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCB0aGlzLnN0YXJ0SWR4LCB0aGlzLnN0YXJ0SWR4KTtcbiAgfSxcblxuICBjb2xsYXBzZWRSaWdodDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCB0aGlzLmVuZElkeCwgdGhpcy5lbmRJZHgpO1xuICB9LFxuXG4gIGdldExpbmVBbmRDb2x1bW5NZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmFuZ2UgPSBbdGhpcy5zdGFydElkeCwgdGhpcy5lbmRJZHhdO1xuICAgIHJldHVybiB1dGlsLmdldExpbmVBbmRDb2x1bW5NZXNzYWdlKHRoaXMuaW5wdXRTdHJlYW0uc291cmNlLCB0aGlzLnN0YXJ0SWR4LCByYW5nZSk7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiAwLCAxLCBvciAyIGludGVydmFscyB0aGF0IHJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiB0aGVcbiAgLy8gaW50ZXJ2YWwgZGlmZmVyZW5jZSBvcGVyYXRpb24uXG4gIG1pbnVzOiBmdW5jdGlvbih0aGF0KSB7XG4gICAgaWYgKHRoaXMuaW5wdXRTdHJlYW0gIT09IHRoYXQuaW5wdXRTdHJlYW0pIHtcbiAgICAgIHRocm93IGVycm9ycy5pbnRlcnZhbFNvdXJjZXNEb250TWF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPT09IHRoYXQuc3RhcnRJZHggJiYgdGhpcy5lbmRJZHggPT09IHRoYXQuZW5kSWR4KSB7XG4gICAgICAvLyBgdGhpc2AgYW5kIGB0aGF0YCBhcmUgdGhlIHNhbWUgaW50ZXJ2YWwhXG4gICAgICByZXR1cm4gW1xuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LnN0YXJ0SWR4ICYmIHRoYXQuZW5kSWR4IDwgdGhpcy5lbmRJZHgpIHtcbiAgICAgIC8vIGB0aGF0YCBzcGxpdHMgYHRoaXNgIGludG8gdHdvIGludGVydmFsc1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuaW5wdXRTdHJlYW0sIHRoaXMuc3RhcnRJZHgsIHRoYXQuc3RhcnRJZHgpLFxuICAgICAgICBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhhdC5lbmRJZHgsIHRoaXMuZW5kSWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LmVuZElkeCAmJiB0aGF0LmVuZElkeCA8IHRoaXMuZW5kSWR4KSB7XG4gICAgICAvLyBgdGhhdGAgY29udGFpbnMgYSBwcmVmaXggb2YgYHRoaXNgXG4gICAgICByZXR1cm4gW1xuICAgICAgICBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhhdC5lbmRJZHgsIHRoaXMuZW5kSWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LnN0YXJ0SWR4ICYmIHRoYXQuc3RhcnRJZHggPCB0aGlzLmVuZElkeCkge1xuICAgICAgLy8gYHRoYXRgIGNvbnRhaW5zIGEgc3VmZml4IG9mIGB0aGlzYFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuaW5wdXRTdHJlYW0sIHRoaXMuc3RhcnRJZHgsIHRoYXQuc3RhcnRJZHgpXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBgdGhhdGAgYW5kIGB0aGlzYCBkbyBub3Qgb3ZlcmxhcFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpc1xuICAgICAgXTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIG5ldyBJbnRlcnZhbCB0aGF0IGhhcyB0aGUgc2FtZSBleHRlbnQgYXMgdGhpcyBvbmUsIGJ1dCB3aGljaCBpcyByZWxhdGl2ZVxuICAvLyB0byBgdGhhdGAsIGFuIEludGVydmFsIHRoYXQgZnVsbHkgY292ZXJzIHRoaXMgb25lLlxuICByZWxhdGl2ZVRvOiBmdW5jdGlvbih0aGF0LCBuZXdJbnB1dFN0cmVhbSkge1xuICAgIGlmICh0aGlzLmlucHV0U3RyZWFtICE9PSB0aGF0LmlucHV0U3RyZWFtKSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCk7XG4gICAgfVxuICAgIGFzc2VydCh0aGlzLnN0YXJ0SWR4ID49IHRoYXQuc3RhcnRJZHggJiYgdGhpcy5lbmRJZHggPD0gdGhhdC5lbmRJZHgsXG4gICAgICAgICAgICdvdGhlciBpbnRlcnZhbCBkb2VzIG5vdCBjb3ZlciB0aGlzIG9uZScpO1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwobmV3SW5wdXRTdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWR4IC0gdGhhdC5zdGFydElkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kSWR4IC0gdGhhdC5zdGFydElkeCk7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIG5ldyBJbnRlcnZhbCB3aGljaCBjb250YWlucyB0aGUgc2FtZSBjb250ZW50cyBhcyB0aGlzIG9uZSxcbiAgLy8gYnV0IHdpdGggd2hpdGVzcGFjZSB0cmltbWVkIGZyb20gYm90aCBlbmRzLiAoVGhpcyBvbmx5IG1ha2VzIHNlbnNlIHdoZW5cbiAgLy8gdGhlIGlucHV0IHN0cmVhbSBpcyBhIHN0cmluZy4pXG4gIHRyaW1tZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgdmFyIHN0YXJ0SWR4ID0gdGhpcy5zdGFydElkeCArIGNvbnRlbnRzLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICB2YXIgZW5kSWR4ID0gdGhpcy5lbmRJZHggLSBjb250ZW50cy5tYXRjaCgvXFxzKiQvKVswXS5sZW5ndGg7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCBzdGFydElkeCwgZW5kSWR4KTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSW50ZXJ2YWwucHJvdG90eXBlLCB7XG4gIGNvbnRlbnRzOiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9jb250ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzID0gdGhpcy5pbnB1dFN0cmVhbS5zb3VyY2VTbGljZSh0aGlzLnN0YXJ0SWR4LCB0aGlzLmVuZElkeCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudHM7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1cbn0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnZhbDtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgbm9kZXMgPSByZXF1aXJlKCcuL25vZGVzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gQ3JlYXRlIGEgc2hvcnQgZXJyb3IgbWVzc2FnZSBmb3IgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCBkdXJpbmcgbWF0Y2hpbmcuXG5mdW5jdGlvbiBnZXRTaG9ydE1hdGNoRXJyb3JNZXNzYWdlKHBvcywgc291cmNlLCBkZXRhaWwpIHtcbiAgdmFyIGVycm9ySW5mbyA9IHV0aWwuZ2V0TGluZUFuZENvbHVtbihzb3VyY2UsIHBvcyk7XG4gIHJldHVybiAnTGluZSAnICsgZXJyb3JJbmZvLmxpbmVOdW0gKyAnLCBjb2wgJyArIGVycm9ySW5mby5jb2xOdW0gKyAnOiAnICsgZGV0YWlsO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBNYXRjaEZhaWx1cmUgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTWF0Y2hSZXN1bHQoc3RhdGUpIHtcbiAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB0aGlzLl9jc3QgPSBzdGF0ZS5iaW5kaW5nc1swXTtcbn1cblxuTWF0Y2hSZXN1bHQubmV3Rm9yID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIHN1Y2NlZWRlZCA9IHN0YXRlLmJpbmRpbmdzLmxlbmd0aCA+IDA7XG4gIHJldHVybiBzdWNjZWVkZWQgPyBuZXcgTWF0Y2hSZXN1bHQoc3RhdGUpIDogbmV3IE1hdGNoRmFpbHVyZShzdGF0ZSk7XG59O1xuXG5NYXRjaFJlc3VsdC5wcm90b3R5cGUuZmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk1hdGNoUmVzdWx0LnByb3RvdHlwZS5zdWNjZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLmZhaWxlZCgpO1xufTtcblxuLy8gUmV0dXJucyBhIGBNYXRjaFJlc3VsdGAgdGhhdCBjYW4gYmUgZmVkIGludG8gb3BlcmF0aW9ucyBvciBhdHRyaWJ1dGVzIHRoYXQgY2FyZVxuLy8gYWJvdXQgdGhlIHdoaXRlc3BhY2UgdGhhdCB3YXMgaW1wbGljaXRseSBza2lwcGVkIG92ZXIgYnkgc3ludGFjdGljIHJ1bGVzLiBUaGlzXG4vLyBpcyB1c2VmdWwgZm9yIGRvaW5nIHRoaW5ncyB3aXRoIGNvbW1lbnRzLCBlLmcuLCBzeW50YXggaGlnaGxpZ2h0aW5nLlxuTWF0Y2hSZXN1bHQucHJvdG90eXBlLmdldERpc2NhcmRlZFNwYWNlcyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5mYWlsZWQoKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gIHZhciBncmFtbWFyID0gc3RhdGUuZ3JhbW1hcjtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG5cbiAgdmFyIGludGVydmFscyA9IFtuZXcgSW50ZXJ2YWwoaW5wdXRTdHJlYW0sIDAsIGlucHV0U3RyZWFtLnNvdXJjZS5sZW5ndGgpXTtcblxuICAvLyBTdWJ0cmFjdCB0aGUgaW50ZXJ2YWwgb2YgZWFjaCB0ZXJtaW5hbCBmcm9tIHRoZSBzZXQgb2YgaW50ZXJ2YWxzIGFib3ZlLlxuICB2YXIgcyA9IGdyYW1tYXIuc2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCdzdWJ0cmFjdFRlcm1pbmFscycsIHtcbiAgICBfbm9udGVybWluYWw6IGZ1bmN0aW9uKGNoaWxkcmVuKSB7XG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIGNoaWxkLnN1YnRyYWN0VGVybWluYWxzKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIF90ZXJtaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdCA9IHRoaXM7XG4gICAgICBpbnRlcnZhbHMgPSBpbnRlcnZhbHMuXG4gICAgICAgICAgbWFwKGZ1bmN0aW9uKGludGVydmFsKSB7IHJldHVybiBpbnRlcnZhbC5taW51cyh0LmludGVydmFsKTsgfSkuXG4gICAgICAgICAgcmVkdWNlKGZ1bmN0aW9uKHhzLCB5cykgeyByZXR1cm4geHMuY29uY2F0KHlzKTsgfSwgW10pO1xuICAgIH1cbiAgfSk7XG4gIHModGhpcykuc3VidHJhY3RUZXJtaW5hbHMoKTtcblxuICAvLyBOb3cgYGludGVydmFsc2AgaG9sZHMgdGhlIGludGVydmFscyBvZiB0aGUgaW5wdXQgc3RyZWFtIHRoYXQgd2VyZSBza2lwcGVkIG92ZXIgYnkgc3ludGFjdGljXG4gIC8vIHJ1bGVzLCBiZWNhdXNlIHRoZXkgY29udGFpbmVkIHNwYWNlcy5cblxuICAvLyBOZXh0LCB3ZSB3YW50IHRvIG1hdGNoIHRoZSBjb250ZW50cyBvZiBlYWNoIG9mIHRob3NlIGludGVydmFscyB3aXRoIHRoZSBncmFtbWFyJ3MgYHNwYWNlc2BcbiAgLy8gcnVsZSwgdG8gcmVjb25zdHJ1Y3QgdGhlIENTVCBub2RlcyB0aGF0IHdlcmUgZGlzY2FyZGVkIGJ5IHN5bnRhY3RpYyBydWxlcy4gQnV0IGlmIHdlIHNpbXBseVxuICAvLyBwYXNzIGVhY2ggaW50ZXJ2YWwncyBgY29udGVudHNgIHRvIHRoZSBncmFtbWFyJ3MgYG1hdGNoYCBtZXRob2QsIHRoZSByZXN1bHRpbmcgbm9kZXMgYW5kXG4gIC8vIHRoZWlyIGNoaWxkcmVuIHdpbGwgaGF2ZSBpbnRlcnZhbHMgdGhhdCBhcmUgYXNzb2NpYXRlZCB3aXRoIGEgZGlmZmVyZW50IGlucHV0LCBpLmUuLCBhXG4gIC8vIHN1YnN0cmluZyBvZiB0aGUgb3JpZ2luYWwgaW5wdXQuIFRoZSBmb2xsb3dpbmcgb3BlcmF0aW9uIHdpbGwgZml4IHRoaXMgcHJvYmxlbSBmb3IgdXMuXG4gIHMuYWRkT3BlcmF0aW9uKCdmaXhJbnRlcnZhbHMoaWR4T2Zmc2V0KScsIHtcbiAgICBfZGVmYXVsdDogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgIHZhciBpZHhPZmZzZXQgPSB0aGlzLmFyZ3MuaWR4T2Zmc2V0O1xuICAgICAgdGhpcy5pbnRlcnZhbC5pbnB1dFN0cmVhbSA9IGlucHV0U3RyZWFtO1xuICAgICAgdGhpcy5pbnRlcnZhbC5zdGFydElkeCArPSBpZHhPZmZzZXQ7XG4gICAgICB0aGlzLmludGVydmFsLmVuZElkeCArPSBpZHhPZmZzZXQ7XG4gICAgICBpZiAoIXRoaXMuaXNUZXJtaW5hbCgpKSB7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBjaGlsZC5maXhJbnRlcnZhbHMoaWR4T2Zmc2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBOb3cgd2UncmUgZmluYWxseSByZWFkeSB0byByZWNvbnN0cnVjdCB0aGUgZGlzY2FyZGVkIENTVCBub2Rlcy5cbiAgdmFyIGRpc2NhcmRlZE5vZGVzID0gaW50ZXJ2YWxzLm1hcChmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgIHZhciByID0gZ3JhbW1hci5tYXRjaChpbnRlcnZhbC5jb250ZW50cywgJ3NwYWNlcycpO1xuICAgIHMocikuZml4SW50ZXJ2YWxzKGludGVydmFsLnN0YXJ0SWR4KTtcbiAgICByZXR1cm4gci5fY3N0O1xuICB9KTtcblxuICAvLyBSYXRoZXIgdGhhbiByZXR1cm4gYSBidW5jaCBvZiBDU1Qgbm9kZXMgYW5kIG1ha2UgdGhlIGNhbGxlciBvZiB0aGlzIG1ldGhvZCBsb29wIG92ZXIgdGhlbSxcbiAgLy8gd2UgY2FuIGNvbnN0cnVjdCBhIHNpbmdsZSBDU1Qgbm9kZSB0aGF0IGlzIHRoZSBwYXJlbnQgb2YgYWxsIG9mIHRoZSBkaXNjYXJkZWQgbm9kZXMuIEFuXG4gIC8vIGBJdGVyYXRpb25Ob2RlYCBpcyB0aGUgb2J2aW91cyBjaG9pY2UgZm9yIHRoaXMuXG4gIGRpc2NhcmRlZE5vZGVzID0gbmV3IG5vZGVzLkl0ZXJhdGlvbk5vZGUoXG4gICAgICBncmFtbWFyLFxuICAgICAgZGlzY2FyZGVkTm9kZXMsXG4gICAgICBkaXNjYXJkZWROb2Rlcy5sZW5ndGggPT09IDAgP1xuICAgICAgICAgIG5ldyBJbnRlcnZhbChpbnB1dFN0cmVhbSwgMCwgMCkgOlxuICAgICAgICAgIG5ldyBJbnRlcnZhbChcbiAgICAgICAgICAgICAgaW5wdXRTdHJlYW0sXG4gICAgICAgICAgICAgIGRpc2NhcmRlZE5vZGVzWzBdLmludGVydmFsLnN0YXJ0SWR4LFxuICAgICAgICAgICAgICBkaXNjYXJkZWROb2Rlc1tkaXNjYXJkZWROb2Rlcy5sZW5ndGggLSAxXS5pbnRlcnZhbC5lbmRJZHgpKTtcblxuICAvLyBCdXQgcmVtZW1iZXIgdGhhdCBhIENTVCBub2RlIGNhbid0IGJlIHVzZWQgZGlyZWN0bHkgYnkgY2xpZW50cy4gV2hhdCB3ZSByZWFsbHkgbmVlZCB0byByZXR1cm5cbiAgLy8gZnJvbSB0aGlzIG1ldGhvZCBpcyBhIHN1Y2Nlc3NmdWwgYE1hdGNoUmVzdWx0YCB0aGF0IGNhbiBiZSB1c2VkIHdpdGggdGhlIGNsaWVudHMnIHNlbWFudGljcy5cbiAgLy8gV2UgYWxyZWFkeSBoYXZlIG9uZSAtLSBgdGhpc2AgLS0gYnV0IGl0J3MgZ290IGEgZGlmZmVyZW50IENTVCBub2RlIGluc2lkZS4gU28gd2UgY3JlYXRlIGEgbmV3XG4gIC8vIG9iamVjdCB0aGF0IGRlbGVnYXRlcyB0byBgdGhpc2AsIGFuZCBvdmVycmlkZSBpdHMgYF9jc3RgIHByb3BlcnR5LlxuICB2YXIgciA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gIHIuX2NzdCA9IGRpc2NhcmRlZE5vZGVzO1xuXG4gIC8vIFdlIGFsc28gb3ZlcnJpZGUgaXRzIGBnZXREaXNjYXJkZWRTcGFjZXNgIG1ldGhvZCwgaW4gY2FzZSBzb21lb25lIGRlY2lkZXMgdG8gY2FsbCBpdC5cbiAgci5nZXREaXNjYXJkZWRTcGFjZXMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHI7IH07XG5cbiAgcmV0dXJuIHI7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBNYXRjaEZhaWx1cmUgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTWF0Y2hGYWlsdXJlKHN0YXRlKSB7XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgY29tbW9uLmRlZmluZUxhenlQcm9wZXJ0eSh0aGlzLCAnX2ZhaWx1cmVzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0RmFpbHVyZXMoKTtcbiAgfSk7XG4gIGNvbW1vbi5kZWZpbmVMYXp5UHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc291cmNlID0gdGhpcy5zdGF0ZS5pbnB1dFN0cmVhbS5zb3VyY2U7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJ21hdGNoIGZhaWxlZCBhdCBwb3NpdGlvbiAnICsgdGhpcy5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICB2YXIgZGV0YWlsID0gJ0V4cGVjdGVkICcgKyB0aGlzLmdldEV4cGVjdGVkVGV4dCgpO1xuICAgIHJldHVybiB1dGlsLmdldExpbmVBbmRDb2x1bW5NZXNzYWdlKHNvdXJjZSwgdGhpcy5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKSkgKyBkZXRhaWw7XG4gIH0pO1xuICBjb21tb24uZGVmaW5lTGF6eVByb3BlcnR5KHRoaXMsICdzaG9ydE1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc3RhdGUuaW5wdXRTdHJlYW0uc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuICdtYXRjaCBmYWlsZWQgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCk7XG4gICAgfVxuICAgIHZhciBkZXRhaWwgPSAnZXhwZWN0ZWQgJyArIHRoaXMuZ2V0RXhwZWN0ZWRUZXh0KCk7XG4gICAgcmV0dXJuIGdldFNob3J0TWF0Y2hFcnJvck1lc3NhZ2UoXG4gICAgICAgIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCksXG4gICAgICAgIHRoaXMuc3RhdGUuaW5wdXRTdHJlYW0uc291cmNlLFxuICAgICAgICBkZXRhaWwpO1xuICB9KTtcbn1cbmluaGVyaXRzKE1hdGNoRmFpbHVyZSwgTWF0Y2hSZXN1bHQpO1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnW01hdGNoRmFpbHVyZSBhdCBwb3NpdGlvbiAnICsgdGhpcy5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKSArICddJztcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCk7XG59O1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldFJpZ2h0bW9zdEZhaWx1cmVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9mYWlsdXJlcztcbn07XG5cbi8vIFJldHVybiBhIHN0cmluZyBzdW1tYXJpemluZyB0aGUgZXhwZWN0ZWQgY29udGVudHMgb2YgdGhlIGlucHV0IHN0cmVhbSB3aGVuXG4vLyB0aGUgbWF0Y2ggZmFpbHVyZSBvY2N1cnJlZC5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0RXhwZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gIHZhciBmYWlsdXJlcyA9IHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZXMoKTtcblxuICAvLyBGaWx0ZXIgb3V0IHRoZSBmbHVmZnkgZmFpbHVyZXMgdG8gbWFrZSB0aGUgZGVmYXVsdCBlcnJvciBtZXNzYWdlcyBtb3JlIHVzZWZ1bFxuICBmYWlsdXJlcyA9IGZhaWx1cmVzLmZpbHRlcihmdW5jdGlvbihmYWlsdXJlKSB7XG4gICAgcmV0dXJuICFmYWlsdXJlLmlzRmx1ZmZ5KCk7XG4gIH0pO1xuXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGZhaWx1cmVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgaWYgKGlkeCA9PT0gZmFpbHVyZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBzYi5hcHBlbmQoKGZhaWx1cmVzLmxlbmd0aCA+IDIgPyAnLCBvciAnIDogJyBvciAnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYi5hcHBlbmQoJywgJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHNiLmFwcGVuZChmYWlsdXJlc1tpZHhdLnRvU3RyaW5nKCkpO1xuICB9XG4gIHJldHVybiBzYi5jb250ZW50cygpO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcG9zID0gdGhpcy5zdGF0ZS5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKTtcbiAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLnN0YXRlLmlucHV0U3RyZWFtLCBwb3MsIHBvcyk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXRjaFJlc3VsdDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCd1dGlsLWV4dGVuZCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTmFtZXNwYWNlKCkge1xufVxuTmFtZXNwYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbk5hbWVzcGFjZS5hc05hbWVzcGFjZSA9IGZ1bmN0aW9uKG9iak9yTmFtZXNwYWNlKSB7XG4gIGlmIChvYmpPck5hbWVzcGFjZSBpbnN0YW5jZW9mIE5hbWVzcGFjZSkge1xuICAgIHJldHVybiBvYmpPck5hbWVzcGFjZTtcbiAgfVxuICByZXR1cm4gTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZShvYmpPck5hbWVzcGFjZSk7XG59O1xuXG4vLyBDcmVhdGUgYSBuZXcgbmFtZXNwYWNlLiBJZiBgb3B0UHJvcHNgIGlzIHNwZWNpZmllZCwgYWxsIG9mIGl0cyBwcm9wZXJ0aWVzXG4vLyB3aWxsIGJlIGNvcGllZCB0byB0aGUgbmV3IG5hbWVzcGFjZS5cbk5hbWVzcGFjZS5jcmVhdGVOYW1lc3BhY2UgPSBmdW5jdGlvbihvcHRQcm9wcykge1xuICByZXR1cm4gTmFtZXNwYWNlLmV4dGVuZChOYW1lc3BhY2UucHJvdG90eXBlLCBvcHRQcm9wcyk7XG59O1xuXG4vLyBDcmVhdGUgYSBuZXcgbmFtZXNwYWNlIHdoaWNoIGV4dGVuZHMgYW5vdGhlciBuYW1lc3BhY2UuIElmIGBvcHRQcm9wc2AgaXNcbi8vIHNwZWNpZmllZCwgYWxsIG9mIGl0cyBwcm9wZXJ0aWVzIHdpbGwgYmUgY29waWVkIHRvIHRoZSBuZXcgbmFtZXNwYWNlLlxuTmFtZXNwYWNlLmV4dGVuZCA9IGZ1bmN0aW9uKG5hbWVzcGFjZSwgb3B0UHJvcHMpIHtcbiAgaWYgKG5hbWVzcGFjZSAhPT0gTmFtZXNwYWNlLnByb3RvdHlwZSAmJiAhKG5hbWVzcGFjZSBpbnN0YW5jZW9mIE5hbWVzcGFjZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBOYW1lc3BhY2Ugb2JqZWN0OiAnICsgbmFtZXNwYWNlKTtcbiAgfVxuICB2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG5hbWVzcGFjZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogTmFtZXNwYWNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBleHRlbmQobnMsIG9wdFByb3BzKTtcbn07XG5cbi8vIFRPRE86IFNob3VsZCB0aGlzIGJlIGEgcmVndWxhciBtZXRob2Q/XG5OYW1lc3BhY2UudG9TdHJpbmcgPSBmdW5jdGlvbihucykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5zKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVzcGFjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFBvc0luZm8oc3RhdGUpIHtcbiAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrID0gW107ICAvLyBhIHN0YWNrIG9mIFwibWVtbyBrZXlzXCIgb2YgdGhlIGFjdGl2ZSBhcHBsaWNhdGlvbnNcbiAgdGhpcy5tZW1vID0ge307XG4gIHRoaXMuY3VycmVudExlZnRSZWN1cnNpb24gPSB1bmRlZmluZWQ7XG59XG5cblBvc0luZm8ucHJvdG90eXBlID0ge1xuICBpc0FjdGl2ZTogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5pbmRleE9mKGFwcGxpY2F0aW9uLnRvTWVtb0tleSgpKSA+PSAwO1xuICB9LFxuXG4gIGVudGVyOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIHRoaXMuc3RhdGUuZW50ZXIoYXBwbGljYXRpb24pO1xuICAgIHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2sucHVzaChhcHBsaWNhdGlvbi50b01lbW9LZXkoKSk7XG4gIH0sXG5cbiAgZXhpdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZS5leGl0KCk7XG4gICAgdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5wb3AoKTtcbiAgfSxcblxuICBzdGFydExlZnRSZWN1cnNpb246IGZ1bmN0aW9uKGhlYWRBcHBsaWNhdGlvbiwgbWVtb1JlYykge1xuICAgIG1lbW9SZWMuaXNMZWZ0UmVjdXJzaW9uID0gdHJ1ZTtcbiAgICBtZW1vUmVjLmhlYWRBcHBsaWNhdGlvbiA9IGhlYWRBcHBsaWNhdGlvbjtcbiAgICBtZW1vUmVjLm5leHRMZWZ0UmVjdXJzaW9uID0gdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbjtcbiAgICB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gbWVtb1JlYztcblxuICAgIHZhciBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjayA9IHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2s7XG4gICAgdmFyIGluZGV4T2ZGaXJzdEludm9sdmVkUnVsZSA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmluZGV4T2YoaGVhZEFwcGxpY2F0aW9uLnRvTWVtb0tleSgpKSArIDE7XG4gICAgdmFyIGludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cyA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLnNsaWNlKGluZGV4T2ZGaXJzdEludm9sdmVkUnVsZSk7XG5cbiAgICBtZW1vUmVjLmlzSW52b2x2ZWQgPSBmdW5jdGlvbihhcHBsaWNhdGlvbk1lbW9LZXkpIHtcbiAgICAgIHJldHVybiBpbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMuaW5kZXhPZihhcHBsaWNhdGlvbk1lbW9LZXkpID49IDA7XG4gICAgfTtcblxuICAgIG1lbW9SZWMudXBkYXRlSW52b2x2ZWRBcHBsaWNhdGlvbk1lbW9LZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpZHggPSBpbmRleE9mRmlyc3RJbnZvbHZlZFJ1bGU7IGlkeCA8IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uTWVtb0tleSA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrW2lkeF07XG4gICAgICAgIGlmICghdGhpcy5pc0ludm9sdmVkKGFwcGxpY2F0aW9uTWVtb0tleSkpIHtcbiAgICAgICAgICBpbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMucHVzaChhcHBsaWNhdGlvbk1lbW9LZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBlbmRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbi5uZXh0TGVmdFJlY3Vyc2lvbjtcbiAgfSxcblxuICAvLyBOb3RlOiB0aGlzIG1ldGhvZCBkb2Vzbid0IGdldCBjYWxsZWQgZm9yIHRoZSBcImhlYWRcIiBvZiBhIGxlZnQgcmVjdXJzaW9uIC0tIGZvciBMUiBoZWFkcyxcbiAgLy8gdGhlIG1lbW9pemVkIHJlc3VsdCAod2hpY2ggc3RhcnRzIG91dCBiZWluZyBhIGZhaWx1cmUpIGlzIGFsd2F5cyB1c2VkLlxuICBzaG91bGRVc2VNZW1vaXplZFJlc3VsdDogZnVuY3Rpb24obWVtb1JlYykge1xuICAgIGlmICghbWVtb1JlYy5pc0xlZnRSZWN1cnNpb24pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgYXBwbGljYXRpb25NZW1vS2V5U3RhY2sgPSB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcHBsaWNhdGlvbk1lbW9LZXkgPSBhcHBsaWNhdGlvbk1lbW9LZXlTdGFja1tpZHhdO1xuICAgICAgaWYgKG1lbW9SZWMuaXNJbnZvbHZlZChhcHBsaWNhdGlvbk1lbW9LZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc0luZm87XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgU3ltYm9sID0gcmVxdWlyZSgnZXM2LXN5bWJvbCcpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxudmFyIE1hdGNoUmVzdWx0ID0gcmVxdWlyZSgnLi9NYXRjaFJlc3VsdCcpO1xudmFyIEl0ZXJhdGlvbk5vZGUgPSByZXF1aXJlKCcuL25vZGVzJykuSXRlcmF0aW9uTm9kZTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gV3JhcHBlcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gV3JhcHBlcnMgZGVjb3JhdGUgQ1NUIG5vZGVzIHdpdGggYWxsIG9mIHRoZSBmdW5jdGlvbmFsaXR5IChpLmUuLCBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzKVxuLy8gcHJvdmlkZWQgYnkgYSBTZW1hbnRpY3MgKHNlZSBiZWxvdykuIGBXcmFwcGVyYCBpcyB0aGUgYWJzdHJhY3Qgc3VwZXJjbGFzcyBvZiBhbGwgd3JhcHBlcnMuIEFcbi8vIGBXcmFwcGVyYCBtdXN0IGhhdmUgYF9ub2RlYCBhbmQgYF9zZW1hbnRpY3NgIGluc3RhbmNlIHZhcmlhYmxlcywgd2hpY2ggcmVmZXIgdG8gdGhlIENTVCBub2RlIGFuZFxuLy8gU2VtYW50aWNzIChyZXNwLikgZm9yIHdoaWNoIGl0IHdhcyBjcmVhdGVkLCBhbmQgYSBgX2NoaWxkV3JhcHBlcnNgIGluc3RhbmNlIHZhcmlhYmxlIHdoaWNoIGlzXG4vLyB1c2VkIHRvIGNhY2hlIHRoZSB3cmFwcGVyIGluc3RhbmNlcyB0aGF0IGFyZSBjcmVhdGVkIGZvciBpdHMgY2hpbGQgbm9kZXMuIFNldHRpbmcgdGhlc2UgaW5zdGFuY2Vcbi8vIHZhcmlhYmxlcyBpcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGhlIGNvbnN0cnVjdG9yIG9mIGVhY2ggU2VtYW50aWNzLXNwZWNpZmljIHN1YmNsYXNzIG9mXG4vLyBgV3JhcHBlcmAuXG5mdW5jdGlvbiBXcmFwcGVyKCkge31cblxuV3JhcHBlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdbc2VtYW50aWNzIHdyYXBwZXIgZm9yICcgKyB0aGlzLl9ub2RlLmdyYW1tYXIubmFtZSArICddJztcbn07XG5cbldyYXBwZXIucHJvdG90eXBlLl9mb3JnZXRNZW1vaXplZFJlc3VsdEZvciA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcbiAgLy8gUmVtb3ZlIHRoZSBtZW1vaXplZCBhdHRyaWJ1dGUgZnJvbSB0aGUgY3N0Tm9kZSBhbmQgYWxsIGl0cyBjaGlsZHJlbi5cbiAgZGVsZXRlIHRoaXMuX25vZGVbdGhpcy5fc2VtYW50aWNzLmF0dHJpYnV0ZUtleXNbYXR0cmlidXRlTmFtZV1dO1xuICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICBjaGlsZC5fZm9yZ2V0TWVtb2l6ZWRSZXN1bHRGb3IoYXR0cmlidXRlTmFtZSk7XG4gIH0pO1xufTtcblxuLy8gUmV0dXJucyB0aGUgd3JhcHBlciBvZiB0aGUgc3BlY2lmaWVkIGNoaWxkIG5vZGUuIENoaWxkIHdyYXBwZXJzIGFyZSBjcmVhdGVkIGxhemlseSBhbmQgY2FjaGVkIGluXG4vLyB0aGUgcGFyZW50IHdyYXBwZXIncyBgX2NoaWxkV3JhcHBlcnNgIGluc3RhbmNlIHZhcmlhYmxlLlxuV3JhcHBlci5wcm90b3R5cGUuY2hpbGQgPSBmdW5jdGlvbihpZHgpIHtcbiAgaWYgKCEoMCA8PSBpZHggJiYgaWR4IDwgdGhpcy5fbm9kZS5udW1DaGlsZHJlbigpKSkge1xuICAgIC8vIFRPRE86IENvbnNpZGVyIHRocm93aW5nIGFuIGV4Y2VwdGlvbiBoZXJlLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgdmFyIGNoaWxkV3JhcHBlciA9IHRoaXMuX2NoaWxkV3JhcHBlcnNbaWR4XTtcbiAgaWYgKCFjaGlsZFdyYXBwZXIpIHtcbiAgICBjaGlsZFdyYXBwZXIgPSB0aGlzLl9jaGlsZFdyYXBwZXJzW2lkeF0gPSB0aGlzLl9zZW1hbnRpY3Mud3JhcCh0aGlzLl9ub2RlLmNoaWxkQXQoaWR4KSk7XG4gIH1cbiAgcmV0dXJuIGNoaWxkV3JhcHBlcjtcbn07XG5cbi8vIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgd3JhcHBlcnMgb2YgYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpc1xuLy8gd3JhcHBlci5cbldyYXBwZXIucHJvdG90eXBlLl9jaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBGb3JjZSB0aGUgY3JlYXRpb24gb2YgYWxsIGNoaWxkIHdyYXBwZXJzXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuX25vZGUubnVtQ2hpbGRyZW4oKTsgaWR4KyspIHtcbiAgICB0aGlzLmNoaWxkKGlkeCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2NoaWxkV3JhcHBlcnM7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBjb3JyZXNwb25kcyB0byBhbiBpdGVyYXRpb25cbi8vIGV4cHJlc3Npb24sIGkuZS4sIGEgS2xlZW5lLSosIEtsZWVuZS0rLCBvciBhbiBvcHRpb25hbC4gUmV0dXJucyBgZmFsc2VgIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzSXRlcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzSXRlcmF0aW9uKCk7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBpcyBhIHRlcm1pbmFsIG5vZGUsIGBmYWxzZWBcbi8vIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzVGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25vZGUuaXNUZXJtaW5hbCgpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYSBub250ZXJtaW5hbCBub2RlLCBgZmFsc2VgXG4vLyBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc05vbnRlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzTm9udGVybWluYWwoKTtcbn07XG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyIGlzIGEgbm9udGVybWluYWwgbm9kZVxuLy8gY29ycmVzcG9uZGluZyB0byBhIHN5bnRhY3RpYyBydWxlLCBgZmFsc2VgIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzU3ludGFjdGljID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmlzTm9udGVybWluYWwoKSAmJiB0aGlzLl9ub2RlLmlzU3ludGFjdGljKCk7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBpcyBhIG5vbnRlcm1pbmFsIG5vZGVcbi8vIGNvcnJlc3BvbmRpbmcgdG8gYSBsZXhpY2FsIHJ1bGUsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuV3JhcHBlci5wcm90b3R5cGUuaXNMZXhpY2FsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmlzTm9udGVybWluYWwoKSAmJiB0aGlzLl9ub2RlLmlzTGV4aWNhbCgpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYW4gaXRlcmF0b3Igbm9kZVxuLy8gaGF2aW5nIGVpdGhlciBvbmUgb3Igbm8gY2hpbGQgKD8gb3BlcmF0b3IpLCBgZmFsc2VgIG90aGVyd2lzZS5cbi8vIE90aGVyd2lzZSwgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbldyYXBwZXIucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25vZGUuaXNPcHRpb25hbCgpO1xufTtcblxuLy8gQ3JlYXRlIGEgbmV3IEl0ZXJhdGlvbk5vZGUgaW4gdGhlIHNhbWUgc2VtYW50aWNzIGFzIHRoaXMgd3JhcHBlci5cbldyYXBwZXIucHJvdG90eXBlLml0ZXJhdGlvbiA9IGZ1bmN0aW9uKG9wdEVsZW1lbnRzKSB7XG4gIHZhciBpdGVyID0gbmV3IEl0ZXJhdGlvbk5vZGUodGhpcy5fbm9kZS5ncmFtbWFyLCBvcHRFbGVtZW50cyB8fCBbXSwgdGhpcy5pbnRlcnZhbCwgZmFsc2UpO1xuICByZXR1cm4gdGhpcy5fc2VtYW50aWNzLndyYXAoaXRlcik7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhXcmFwcGVyLnByb3RvdHlwZSwge1xuICAvLyBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGNoaWxkcmVuIG9mIHRoaXMgQ1NUIG5vZGUuXG4gIGNoaWxkcmVuOiB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuKCk7IH19LFxuXG4gIC8vIFJldHVybnMgdGhlIG5hbWUgb2YgZ3JhbW1hciBydWxlIHRoYXQgY3JlYXRlZCB0aGlzIENTVCBub2RlLlxuICBjdG9yTmFtZToge2dldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9ub2RlLmN0b3JOYW1lOyB9fSxcblxuICAvLyBSZXR1cm5zIHRoZSBpbnRlcnZhbCBjb25zdW1lZCBieSB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlci5cbiAgaW50ZXJ2YWw6IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbm9kZS5pbnRlcnZhbDsgfX0sXG5cbiAgLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoaXMgQ1NUIG5vZGUuXG4gIG51bUNoaWxkcmVuOiB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX25vZGUubnVtQ2hpbGRyZW4oKTsgfX0sXG5cbiAgLy8gUmV0dXJucyB0aGUgcHJpbWl0aXZlIHZhbHVlIG9mIHRoaXMgQ1NUIG5vZGUsIGlmIGl0J3MgYSB0ZXJtaW5hbCBub2RlLiBPdGhlcndpc2UsXG4gIC8vIHRocm93cyBhbiBleGNlcHRpb24uXG4gIHByaW1pdGl2ZVZhbHVlOiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVGVybWluYWwoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZS5wcmltaXRpdmVWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJ0cmllZCB0byBhY2Nlc3MgdGhlICdwcmltaXRpdmVWYWx1ZScgYXR0cmlidXRlIG9mIGEgbm9uLXRlcm1pbmFsIENTVCBub2RlXCIpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFNlbWFudGljcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBBIFNlbWFudGljcyBpcyBhIGNvbnRhaW5lciBmb3IgYSBmYW1pbHkgb2YgT3BlcmF0aW9ucyBhbmQgQXR0cmlidXRlcyBmb3IgYSBnaXZlbiBncmFtbWFyLlxuLy8gU2VtYW50aWNzIGVuYWJsZSBtb2R1bGFyaXR5IChkaWZmZXJlbnQgY2xpZW50cyBvZiBhIGdyYW1tYXIgY2FuIGNyZWF0ZSB0aGVpciBzZXQgb2Ygb3BlcmF0aW9uc1xuLy8gYW5kIGF0dHJpYnV0ZXMgaW4gaXNvbGF0aW9uKSBhbmQgZXh0ZW5zaWJpbGl0eSBldmVuIHdoZW4gb3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcyBhcmUgbXV0dWFsbHktXG4vLyByZWN1cnNpdmUuIFRoaXMgY29uc3RydWN0b3Igc2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgZXhjZXB0IGZyb21cbi8vIGBTZW1hbnRpY3MuY3JlYXRlU2VtYW50aWNzYC4gVGhlIG5vcm1hbCB3YXlzIHRvIGNyZWF0ZSBhIFNlbWFudGljcywgZ2l2ZW4gYSBncmFtbWFyICdnJywgYXJlXG4vLyBgZy5zZW1hbnRpY3MoKWAgYW5kIGBnLmV4dGVuZFNlbWFudGljcyhwYXJlbnRTZW1hbnRpY3MpYC5cbmZ1bmN0aW9uIFNlbWFudGljcyhncmFtbWFyLCBzdXBlclNlbWFudGljcykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMuY2hlY2tlZEFjdGlvbkRpY3RzID0gZmFsc2U7XG5cbiAgLy8gQ29uc3RydWN0b3IgZm9yIHdyYXBwZXIgaW5zdGFuY2VzLCB3aGljaCBhcmUgcGFzc2VkIGFzIHRoZSBhcmd1bWVudHMgdG8gdGhlIHNlbWFudGljIGFjdGlvbnNcbiAgLy8gb2YgYW4gb3BlcmF0aW9uIG9yIGF0dHJpYnV0ZS4gT3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcyByZXF1aXJlIGRvdWJsZSBkaXNwYXRjaDogdGhlIHNlbWFudGljXG4gIC8vIGFjdGlvbiBpcyBjaG9zZW4gYmFzZWQgb24gYm90aCB0aGUgbm9kZSdzIHR5cGUgYW5kIHRoZSBzZW1hbnRpY3MuIFdyYXBwZXJzIGVuc3VyZSB0aGF0XG4gIC8vIHRoZSBgZXhlY3V0ZWAgbWV0aG9kIGlzIGNhbGxlZCB3aXRoIHRoZSBjb3JyZWN0IChtb3N0IHNwZWNpZmljKSBzZW1hbnRpY3Mgb2JqZWN0IGFzIGFuXG4gIC8vIGFyZ3VtZW50LlxuICB0aGlzLldyYXBwZXIgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgc2VsZi5jaGVja0FjdGlvbkRpY3RzSWZIYXZlbnRBbHJlYWR5KCk7XG4gICAgdGhpcy5fc2VtYW50aWNzID0gc2VsZjtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgICB0aGlzLl9jaGlsZFdyYXBwZXJzID0gW107XG4gIH07XG5cbiAgdGhpcy5zdXBlciA9IHN1cGVyU2VtYW50aWNzO1xuICBpZiAoc3VwZXJTZW1hbnRpY3MpIHtcbiAgICBpZiAoZ3JhbW1hciAhPT0gdGhpcy5zdXBlci5ncmFtbWFyICYmICFncmFtbWFyLl9pbmhlcml0c0Zyb20odGhpcy5zdXBlci5ncmFtbWFyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiQ2Fubm90IGV4dGVuZCBhIHNlbWFudGljcyBmb3IgZ3JhbW1hciAnXCIgKyB0aGlzLnN1cGVyLmdyYW1tYXIubmFtZSArXG4gICAgICAgICAgXCInIGZvciB1c2Ugd2l0aCBncmFtbWFyICdcIiArIGdyYW1tYXIubmFtZSArIFwiJyAobm90IGEgc3ViLWdyYW1tYXIpXCIpO1xuICAgIH1cbiAgICBpbmhlcml0cyh0aGlzLldyYXBwZXIsIHRoaXMuc3VwZXIuV3JhcHBlcik7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnN1cGVyLm9wZXJhdGlvbnMpO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IE9iamVjdC5jcmVhdGUodGhpcy5zdXBlci5hdHRyaWJ1dGVzKTtcbiAgICB0aGlzLmF0dHJpYnV0ZUtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgLy8gQXNzaWduIHVuaXF1ZSBzeW1ib2xzIGZvciBlYWNoIG9mIHRoZSBhdHRyaWJ1dGVzIGluaGVyaXRlZCBmcm9tIHRoZSBzdXBlci1zZW1hbnRpY3Mgc28gdGhhdFxuICAgIC8vIHRoZXkgYXJlIG1lbW9pemVkIGluZGVwZW5kZW50bHkuXG4gICAgZm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIHRoaXMuYXR0cmlidXRlS2V5c1thdHRyaWJ1dGVOYW1lXSA9IFN5bWJvbCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpbmhlcml0cyh0aGlzLldyYXBwZXIsIFdyYXBwZXIpO1xuICAgIHRoaXMub3BlcmF0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmF0dHJpYnV0ZUtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9XG59XG5cblNlbWFudGljcy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdbc2VtYW50aWNzIGZvciAnICsgdGhpcy5ncmFtbWFyLm5hbWUgKyAnXSc7XG59O1xuXG5TZW1hbnRpY3MucHJvdG90eXBlLmNoZWNrQWN0aW9uRGljdHNJZkhhdmVudEFscmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLmNoZWNrZWRBY3Rpb25EaWN0cykge1xuICAgIHRoaXMuY2hlY2tBY3Rpb25EaWN0cygpO1xuICAgIHRoaXMuY2hlY2tlZEFjdGlvbkRpY3RzID0gdHJ1ZTtcbiAgfVxufTtcblxuLy8gQ2hlY2tzIHRoYXQgdGhlIGFjdGlvbiBkaWN0aW9uYXJpZXMgZm9yIGFsbCBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIGluIHRoaXMgc2VtYW50aWNzLFxuLy8gaW5jbHVkaW5nIHRoZSBvbmVzIHRoYXQgd2VyZSBpbmhlcml0ZWQgZnJvbSB0aGUgc3VwZXItc2VtYW50aWNzLCBhZ3JlZSB3aXRoIHRoZSBncmFtbWFyLlxuLy8gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiBvbmUgb3IgbW9yZSBvZiB0aGVtIGRvZXNuJ3QuXG5TZW1hbnRpY3MucHJvdG90eXBlLmNoZWNrQWN0aW9uRGljdHMgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm9wZXJhdGlvbnMpIHtcbiAgICB0aGlzLm9wZXJhdGlvbnNbbmFtZV0uY2hlY2tBY3Rpb25EaWN0KHRoaXMuZ3JhbW1hcik7XG4gIH1cbiAgZm9yIChuYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgIHRoaXMuYXR0cmlidXRlc1tuYW1lXS5jaGVja0FjdGlvbkRpY3QodGhpcy5ncmFtbWFyKTtcbiAgfVxufTtcblxuU2VtYW50aWNzLnByb3RvdHlwZS50b1JlY2lwZSA9IGZ1bmN0aW9uKHNlbWFudGljc09ubHkpIHtcbiAgZnVuY3Rpb24gaGFzU3VwZXJTZW1hbnRpY3Mocykge1xuICAgIHJldHVybiBzLnN1cGVyICE9PSBTZW1hbnRpY3MuQnVpbHRJblNlbWFudGljcy5fZ2V0U2VtYW50aWNzKCk7XG4gIH1cblxuICB2YXIgc3RyID0gJyhmdW5jdGlvbihnKSB7XFxuJztcbiAgaWYgKGhhc1N1cGVyU2VtYW50aWNzKHRoaXMpKSB7XG4gICAgc3RyICs9ICcgIHZhciBzZW1hbnRpY3MgPSAnICsgdGhpcy5zdXBlci50b1JlY2lwZSh0cnVlKSArICcoZyc7XG5cbiAgICB2YXIgc3VwZXJTZW1hbnRpY3NHcmFtbWFyID0gdGhpcy5zdXBlci5ncmFtbWFyO1xuICAgIHZhciByZWxhdGVkR3JhbW1hciA9IHRoaXMuZ3JhbW1hcjtcbiAgICB3aGlsZSAocmVsYXRlZEdyYW1tYXIgIT09IHN1cGVyU2VtYW50aWNzR3JhbW1hcikge1xuICAgICAgc3RyICs9ICcuc3VwZXJHcmFtbWFyJztcbiAgICAgIHJlbGF0ZWRHcmFtbWFyID0gcmVsYXRlZEdyYW1tYXIuc3VwZXJHcmFtbWFyO1xuICAgIH1cblxuICAgIHN0ciArPSAnKTtcXG4nO1xuICAgIHN0ciArPSAnICByZXR1cm4gZy5leHRlbmRTZW1hbnRpY3Moc2VtYW50aWNzKSc7XG4gIH0gZWxzZSB7XG4gICAgc3RyICs9ICcgIHJldHVybiBnLnNlbWFudGljcygpJztcbiAgfVxuICBbJ09wZXJhdGlvbicsICdBdHRyaWJ1dGUnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIgc2VtYW50aWNPcGVyYXRpb25zID0gdGhpc1t0eXBlLnRvTG93ZXJDYXNlKCkgKyAncyddO1xuICAgIE9iamVjdC5rZXlzKHNlbWFudGljT3BlcmF0aW9ucykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgc2lnbmF0dXJlID0gbmFtZTtcbiAgICAgIGlmIChzZW1hbnRpY09wZXJhdGlvbnNbbmFtZV0uZm9ybWFscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNpZ25hdHVyZSArPSAnKCcgKyBzZW1hbnRpY09wZXJhdGlvbnNbbmFtZV0uZm9ybWFscy5qb2luKCcsICcpICsgJyknO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWV0aG9kO1xuICAgICAgaWYgKGhhc1N1cGVyU2VtYW50aWNzKHRoaXMpICYmIHRoaXMuc3VwZXJbdHlwZS50b0xvd2VyQ2FzZSgpICsgJ3MnXVtuYW1lXSkge1xuICAgICAgICBtZXRob2QgPSAnZXh0ZW5kJyArIHR5cGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXRob2QgPSAnYWRkJyArIHR5cGU7XG4gICAgICB9XG4gICAgICBzdHIgKz0gJ1xcbiAgICAuJyArIG1ldGhvZCArICcoJyArIEpTT04uc3RyaW5naWZ5KHNpZ25hdHVyZSkgKyAnLCB7JztcblxuICAgICAgdmFyIGFjdGlvbnMgPSBzZW1hbnRpY09wZXJhdGlvbnNbbmFtZV0uYWN0aW9uRGljdDtcbiAgICAgIHZhciBzcmNBcnJheSA9IFtdO1xuICAgICAgT2JqZWN0LmtleXMoYWN0aW9ucykuZm9yRWFjaChmdW5jdGlvbihhY3Rpb25OYW1lKSB7XG4gICAgICAgIGlmIChzZW1hbnRpY09wZXJhdGlvbnNbbmFtZV0uYnVpbHRJbkRlZmF1bHQgIT09IGFjdGlvbnNbYWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICBzcmNBcnJheS5wdXNoKCdcXG4gICAgICAnICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uTmFtZSkgKyAnOiAnICtcbiAgICAgICAgICAgIGFjdGlvbnNbYWN0aW9uTmFtZV0udG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3RyICs9IHNyY0FycmF5LmpvaW4oJywnKTtcblxuICAgICAgc3RyICs9ICdcXG4gICAgfSknO1xuICAgIH0sIHRoaXMpO1xuICB9LCB0aGlzKTtcbiAgc3RyICs9ICc7XFxuICB9KSc7XG5cbiAgaWYgKCFzZW1hbnRpY3NPbmx5KSB7XG4gICAgc3RyID1cbiAgICAgICcoZnVuY3Rpb24oKSB7XFxuJyArXG4gICAgICAnICB2YXIgZ3JhbW1hciA9IHRoaXMuZnJvbVJlY2lwZSgnICsgdGhpcy5ncmFtbWFyLnRvUmVjaXBlKCkgKyAnKTtcXG4nICtcbiAgICAgICcgIHZhciBzZW1hbnRpY3MgPSAnICsgc3RyICsgJyhncmFtbWFyKTtcXG4nICtcbiAgICAgICcgIHJldHVybiBzZW1hbnRpY3M7XFxuJyArXG4gICAgICAnfSk7XFxuJztcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG52YXIgcHJvdG90eXBlR3JhbW1hcjtcbnZhciBwcm90b3R5cGVHcmFtbWFyU2VtYW50aWNzO1xuXG4vLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZnJvbSBtYWluLmpzIG9uY2UgT2htIGhhcyBsb2FkZWQuXG5TZW1hbnRpY3MuaW5pdFByb3RvdHlwZVBhcnNlciA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgcHJvdG90eXBlR3JhbW1hclNlbWFudGljcyA9IGdyYW1tYXIuc2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCdwYXJzZScsIHtcbiAgICBBdHRyaWJ1dGVTaWduYXR1cmU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUucGFyc2UoKSxcbiAgICAgICAgZm9ybWFsczogW11cbiAgICAgIH07XG4gICAgfSxcbiAgICBPcGVyYXRpb25TaWduYXR1cmU6IGZ1bmN0aW9uKG5hbWUsIG9wdEZvcm1hbHMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUucGFyc2UoKSxcbiAgICAgICAgZm9ybWFsczogb3B0Rm9ybWFscy5wYXJzZSgpWzBdIHx8IFtdXG4gICAgICB9O1xuICAgIH0sXG4gICAgRm9ybWFsczogZnVuY3Rpb24ob3BhcmVuLCBmcywgY3BhcmVuKSB7XG4gICAgICByZXR1cm4gZnMuYXNJdGVyYXRpb24oKS5wYXJzZSgpO1xuICAgIH0sXG4gICAgbmFtZTogZnVuY3Rpb24oZmlyc3QsIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH1cbiAgfSk7XG4gIHByb3RvdHlwZUdyYW1tYXIgPSBncmFtbWFyO1xufTtcblxuZnVuY3Rpb24gcGFyc2VTaWduYXR1cmUoc2lnbmF0dXJlLCB0eXBlKSB7XG4gIGlmICghcHJvdG90eXBlR3JhbW1hcikge1xuICAgIC8vIFRoZSBPcGVyYXRpb25zIGFuZCBBdHRyaWJ1dGVzIGdyYW1tYXIgd29uJ3QgYmUgYXZhaWxhYmxlIHdoaWxlIE9obSBpcyBsb2FkaW5nLFxuICAgIC8vIGJ1dCB3ZSBjYW4gZ2V0IGF3YXkgdGhlIGZvbGxvd2luZyBzaW1wbGlmaWNhdGlvbiBiL2Mgbm9uZSBvZiB0aGUgb3BlcmF0aW9uc1xuICAgIC8vIHRoYXQgYXJlIHVzZWQgd2hpbGUgbG9hZGluZyB0YWtlIGFyZ3VtZW50cy5cbiAgICBjb21tb24uYXNzZXJ0KHNpZ25hdHVyZS5pbmRleE9mKCcoJykgPT09IC0xKTtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogc2lnbmF0dXJlLFxuICAgICAgZm9ybWFsczogW11cbiAgICB9O1xuICB9XG5cbiAgdmFyIHIgPSBwcm90b3R5cGVHcmFtbWFyLm1hdGNoKFxuICAgICAgc2lnbmF0dXJlLFxuICAgICAgdHlwZSA9PT0gJ29wZXJhdGlvbicgPyAnT3BlcmF0aW9uU2lnbmF0dXJlJyA6ICdBdHRyaWJ1dGVTaWduYXR1cmUnKTtcbiAgaWYgKHIuZmFpbGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3Ioci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldHVybiBwcm90b3R5cGVHcmFtbWFyU2VtYW50aWNzKHIpLnBhcnNlKCk7XG59XG5cbmZ1bmN0aW9uIG5ld0RlZmF1bHRBY3Rpb24odHlwZSwgbmFtZSwgZG9JdCkge1xuICByZXR1cm4gZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHRoaXNUaGluZyA9IHRoaXMuX3NlbWFudGljcy5vcGVyYXRpb25zW25hbWVdIHx8IHRoaXMuX3NlbWFudGljcy5hdHRyaWJ1dGVzW25hbWVdO1xuICAgIHZhciBhcmdzID0gdGhpc1RoaW5nLmZvcm1hbHMubWFwKGZ1bmN0aW9uKGZvcm1hbCkge1xuICAgICAgcmV0dXJuIHNlbGYuYXJnc1tmb3JtYWxdO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuaXNJdGVyYXRpb24oKSkge1xuICAgICAgLy8gVGhpcyBDU1Qgbm9kZSBjb3JyZXNwb25kcyB0byBhbiBpdGVyYXRpb24gZXhwcmVzc2lvbiBpbiB0aGUgZ3JhbW1hciAoKiwgKywgb3IgPykuIFRoZVxuICAgICAgLy8gZGVmYXVsdCBiZWhhdmlvciBpcyB0byBtYXAgdGhpcyBvcGVyYXRpb24gb3IgYXR0cmlidXRlIG92ZXIgYWxsIG9mIGl0cyBjaGlsZCBub2Rlcy5cbiAgICAgIHJldHVybiBjaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGQpIHsgcmV0dXJuIGRvSXQuYXBwbHkoY2hpbGQsIGFyZ3MpOyB9KTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIENTVCBub2RlIGNvcnJlc3BvbmRzIHRvIGEgbm9uLXRlcm1pbmFsIGluIHRoZSBncmFtbWFyIChlLmcuLCBBZGRFeHByKS4gVGhlIGZhY3QgdGhhdFxuICAgIC8vIHdlIGdvdCBoZXJlIG1lYW5zIHRoYXQgdGhpcyBhY3Rpb24gZGljdGlvbmFyeSBkb2Vzbid0IGhhdmUgYW4gYWN0aW9uIGZvciB0aGlzIHBhcnRpY3VsYXJcbiAgICAvLyBub24tdGVybWluYWwgb3IgYSBnZW5lcmljIGBfbm9udGVybWluYWxgIGFjdGlvbi5cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBcyBhIGNvbnZlbmllbmNlLCBpZiB0aGlzIG5vZGUgb25seSBoYXMgb25lIGNoaWxkLCB3ZSBqdXN0IHJldHVybiB0aGUgcmVzdWx0IG9mXG4gICAgICAvLyBhcHBseWluZyB0aGlzIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZSB0byB0aGUgY2hpbGQgbm9kZS5cbiAgICAgIHJldHVybiBkb0l0LmFwcGx5KGNoaWxkcmVuWzBdLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSB0aHJvdyBhbiBleGNlcHRpb24gdG8gbGV0IHRoZSBwcm9ncmFtbWVyIGtub3cgdGhhdCB3ZSBkb24ndCBrbm93IHdoYXRcbiAgICAgIC8vIHRvIGRvIHdpdGggdGhpcyBub2RlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdNaXNzaW5nIHNlbWFudGljIGFjdGlvbiBmb3IgJyArIHRoaXMuY3Rvck5hbWUgKyAnIGluICcgKyBuYW1lICsgJyAnICsgdHlwZSk7XG4gICAgfVxuICB9O1xufVxuXG5TZW1hbnRpY3MucHJvdG90eXBlLmFkZE9wZXJhdGlvbk9yQXR0cmlidXRlID0gZnVuY3Rpb24odHlwZSwgc2lnbmF0dXJlLCBhY3Rpb25EaWN0KSB7XG4gIHZhciB0eXBlUGx1cmFsID0gdHlwZSArICdzJztcblxuICB2YXIgcGFyc2VkTmFtZUFuZEZvcm1hbEFyZ3MgPSBwYXJzZVNpZ25hdHVyZShzaWduYXR1cmUsIHR5cGUpO1xuICB2YXIgbmFtZSA9IHBhcnNlZE5hbWVBbmRGb3JtYWxBcmdzLm5hbWU7XG4gIHZhciBmb3JtYWxzID0gcGFyc2VkTmFtZUFuZEZvcm1hbEFyZ3MuZm9ybWFscztcblxuICAvLyBUT0RPOiBjaGVjayB0aGF0IHRoZXJlIGFyZSBubyBkdXBsaWNhdGUgZm9ybWFsIGFyZ3VtZW50c1xuXG4gIHRoaXMuYXNzZXJ0TmV3TmFtZShuYW1lLCB0eXBlKTtcblxuICAvLyBDcmVhdGUgdGhlIGFjdGlvbiBkaWN0aW9uYXJ5IGZvciB0aGlzIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZSB0aGF0IGNvbnRhaW5zIGEgYF9kZWZhdWx0YCBhY3Rpb25cbiAgLy8gd2hpY2ggZGVmaW5lcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiBpdGVyYXRpb24sIHRlcm1pbmFsLCBhbmQgbm9uLXRlcm1pbmFsIG5vZGVzLi4uXG4gIHZhciBidWlsdEluRGVmYXVsdCA9IG5ld0RlZmF1bHRBY3Rpb24odHlwZSwgbmFtZSwgZG9JdCk7XG4gIHZhciByZWFsQWN0aW9uRGljdCA9IHtfZGVmYXVsdDogYnVpbHRJbkRlZmF1bHR9O1xuICAvLyAuLi4gYW5kIGFkZCBpbiB0aGUgYWN0aW9ucyBzdXBwbGllZCBieSB0aGUgcHJvZ3JhbW1lciwgd2hpY2ggbWF5IG92ZXJyaWRlIHNvbWUgb3IgYWxsIG9mIHRoZVxuICAvLyBkZWZhdWx0IG9uZXMuXG4gIE9iamVjdC5rZXlzKGFjdGlvbkRpY3QpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIHJlYWxBY3Rpb25EaWN0W25hbWVdID0gYWN0aW9uRGljdFtuYW1lXTtcbiAgfSk7XG5cbiAgdmFyIGVudHJ5ID0gdHlwZSA9PT0gJ29wZXJhdGlvbicgP1xuICAgICAgbmV3IE9wZXJhdGlvbihuYW1lLCBmb3JtYWxzLCByZWFsQWN0aW9uRGljdCwgYnVpbHRJbkRlZmF1bHQpIDpcbiAgICAgIG5ldyBBdHRyaWJ1dGUobmFtZSwgcmVhbEFjdGlvbkRpY3QsIGJ1aWx0SW5EZWZhdWx0KTtcblxuICAvLyBUaGUgZm9sbG93aW5nIGNoZWNrIGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnkgKGl0IHdpbGwgaGFwcGVuIGxhdGVyIGFueXdheSkgYnV0IGl0J3MgYmV0dGVyIHRvXG4gIC8vIGNhdGNoIGVycm9ycyBlYXJseS5cbiAgZW50cnkuY2hlY2tBY3Rpb25EaWN0KHRoaXMuZ3JhbW1hcik7XG5cbiAgdGhpc1t0eXBlUGx1cmFsXVtuYW1lXSA9IGVudHJ5O1xuXG4gIGZ1bmN0aW9uIGRvSXQoKSB7XG4gICAgLy8gRGlzcGF0Y2ggdG8gbW9zdCBzcGVjaWZpYyB2ZXJzaW9uIG9mIHRoaXMgb3BlcmF0aW9uIC8gYXR0cmlidXRlIC0tIGl0IG1heSBoYXZlIGJlZW5cbiAgICAvLyBvdmVycmlkZGVuIGJ5IGEgc3ViLXNlbWFudGljcy5cbiAgICB2YXIgdGhpc1RoaW5nID0gdGhpcy5fc2VtYW50aWNzW3R5cGVQbHVyYWxdW25hbWVdO1xuXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgY2FsbGVyIHBhc3NlZCB0aGUgY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSB0aGlzVGhpbmcuZm9ybWFscy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHBhc3NlZCB0byAnICsgbmFtZSArICcgJyArIHR5cGUgKyAnIChleHBlY3RlZCAnICtcbiAgICAgICAgICB0aGlzVGhpbmcuZm9ybWFscy5sZW5ndGggKyAnLCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnKScpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhbiBcImFyZ3VtZW50cyBvYmplY3RcIiBmcm9tIHRoZSBhcmd1bWVudHMgdGhhdCB3ZXJlIHBhc3NlZCB0byB0aGlzXG4gICAgLy8gb3BlcmF0aW9uIC8gYXR0cmlidXRlLlxuICAgIHZhciBhcmdzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGZvcm1hbCA9IHRoaXNUaGluZy5mb3JtYWxzW2lkeF07XG4gICAgICBhcmdzW2Zvcm1hbF0gPSBhcmd1bWVudHNbaWR4XTtcbiAgICB9XG5cbiAgICB2YXIgb2xkQXJncyA9IHRoaXMuYXJncztcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHZhciBhbnMgPSB0aGlzVGhpbmcuZXhlY3V0ZSh0aGlzLl9zZW1hbnRpY3MsIHRoaXMpO1xuICAgIHRoaXMuYXJncyA9IG9sZEFyZ3M7XG4gICAgcmV0dXJuIGFucztcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnb3BlcmF0aW9uJykge1xuICAgIHRoaXMuV3JhcHBlci5wcm90b3R5cGVbbmFtZV0gPSBkb0l0O1xuICAgIHRoaXMuV3JhcHBlci5wcm90b3R5cGVbbmFtZV0udG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAnWycgKyBuYW1lICsgJyBvcGVyYXRpb25dJztcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLldyYXBwZXIucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICAgIGdldDogZG9JdCxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlICAvLyBTbyB0aGUgcHJvcGVydHkgY2FuIGJlIGRlbGV0ZWQuXG4gICAgICB9KTtcbiAgICB0aGlzLmF0dHJpYnV0ZUtleXNbbmFtZV0gPSBTeW1ib2woKTtcbiAgfVxufTtcblxuU2VtYW50aWNzLnByb3RvdHlwZS5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIGFjdGlvbkRpY3QpIHtcbiAgdmFyIHR5cGVQbHVyYWwgPSB0eXBlICsgJ3MnO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGBuYW1lYCByZWFsbHkgaXMganVzdCBhIG5hbWUsIGkuZS4sIHRoYXQgaXQgZG9lc24ndCBhbHNvIGNvbnRhaW4gZm9ybWFscy5cbiAgcGFyc2VTaWduYXR1cmUobmFtZSwgJ2F0dHJpYnV0ZScpO1xuXG4gIGlmICghKHRoaXMuc3VwZXIgJiYgbmFtZSBpbiB0aGlzLnN1cGVyW3R5cGVQbHVyYWxdKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGV4dGVuZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgK1xuICAgICAgICBcIic6IGRpZCBub3QgaW5oZXJpdCBhbiBcIiArIHR5cGUgKyAnIHdpdGggdGhhdCBuYW1lJyk7XG4gIH1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzW3R5cGVQbHVyYWxdLCBuYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGV4dGVuZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgKyBcIicgYWdhaW5cIik7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBuZXcgb3BlcmF0aW9uIC8gYXR0cmlidXRlIHdob3NlIGFjdGlvbkRpY3QgZGVsZWdhdGVzIHRvIHRoZSBzdXBlciBvcGVyYXRpb24gL1xuICAvLyBhdHRyaWJ1dGUncyBhY3Rpb25EaWN0LCBhbmQgd2hpY2ggaGFzIGFsbCB0aGUga2V5cyBmcm9tIGBpbmhlcml0ZWRBY3Rpb25EaWN0YC5cbiAgdmFyIGluaGVyaXRlZEZvcm1hbHMgPSB0aGlzW3R5cGVQbHVyYWxdW25hbWVdLmZvcm1hbHM7XG4gIHZhciBpbmhlcml0ZWRBY3Rpb25EaWN0ID0gdGhpc1t0eXBlUGx1cmFsXVtuYW1lXS5hY3Rpb25EaWN0O1xuICB2YXIgbmV3QWN0aW9uRGljdCA9IE9iamVjdC5jcmVhdGUoaW5oZXJpdGVkQWN0aW9uRGljdCk7XG4gIE9iamVjdC5rZXlzKGFjdGlvbkRpY3QpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIG5ld0FjdGlvbkRpY3RbbmFtZV0gPSBhY3Rpb25EaWN0W25hbWVdO1xuICB9KTtcblxuICB0aGlzW3R5cGVQbHVyYWxdW25hbWVdID0gdHlwZSA9PT0gJ29wZXJhdGlvbicgP1xuICAgICAgbmV3IE9wZXJhdGlvbihuYW1lLCBpbmhlcml0ZWRGb3JtYWxzLCBuZXdBY3Rpb25EaWN0KSA6XG4gICAgICBuZXcgQXR0cmlidXRlKG5hbWUsIG5ld0FjdGlvbkRpY3QpO1xuXG4gIC8vIFRoZSBmb2xsb3dpbmcgY2hlY2sgaXMgbm90IHN0cmljdGx5IG5lY2Vzc2FyeSAoaXQgd2lsbCBoYXBwZW4gbGF0ZXIgYW55d2F5KSBidXQgaXQncyBiZXR0ZXIgdG9cbiAgLy8gY2F0Y2ggZXJyb3JzIGVhcmx5LlxuICB0aGlzW3R5cGVQbHVyYWxdW25hbWVdLmNoZWNrQWN0aW9uRGljdCh0aGlzLmdyYW1tYXIpO1xufTtcblxuU2VtYW50aWNzLnByb3RvdHlwZS5hc3NlcnROZXdOYW1lID0gZnVuY3Rpb24obmFtZSwgdHlwZSkge1xuICBpZiAoV3JhcHBlci5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgYWRkICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArIFwiJzogdGhhdCdzIGEgcmVzZXJ2ZWQgbmFtZVwiKTtcbiAgfVxuICBpZiAobmFtZSBpbiB0aGlzLm9wZXJhdGlvbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgYWRkICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArIFwiJzogYW4gb3BlcmF0aW9uIHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzXCIpO1xuICB9XG4gIGlmIChuYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCBhZGQgJyArIHR5cGUgKyBcIiAnXCIgKyBuYW1lICsgXCInOiBhbiBhdHRyaWJ1dGUgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHNcIik7XG4gIH1cbn07XG5cbi8vIFJldHVybnMgYSB3cmFwcGVyIGZvciB0aGUgZ2l2ZW4gQ1NUIGBub2RlYCBpbiB0aGlzIHNlbWFudGljcy5cbi8vIElmIGBub2RlYCBpcyBhbHJlYWR5IGEgd3JhcHBlciwgcmV0dXJucyBgbm9kZWAgaXRzZWxmLiAgLy8gVE9ETzogd2h5IGlzIHRoaXMgbmVlZGVkP1xuU2VtYW50aWNzLnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIHRoaXMuV3JhcHBlciA/IG5vZGUgOiBuZXcgdGhpcy5XcmFwcGVyKG5vZGUpO1xufTtcblxuLy8gQ3JlYXRlcyBhIG5ldyBTZW1hbnRpY3MgaW5zdGFuY2UgZm9yIGBncmFtbWFyYCwgaW5oZXJpdGluZyBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIGZyb21cbi8vIGBvcHRTdXBlclNlbWFudGljc2AsIGlmIGl0IGlzIHNwZWNpZmllZC4gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYWN0cyBhcyBhIHByb3h5IGZvciB0aGUgbmV3XG4vLyBTZW1hbnRpY3MgaW5zdGFuY2UuIFdoZW4gdGhhdCBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggYSBDU1Qgbm9kZSBhcyBhbiBhcmd1bWVudCwgaXQgcmV0dXJuc1xuLy8gYSB3cmFwcGVyIGZvciB0aGF0IG5vZGUgd2hpY2ggZ2l2ZXMgYWNjZXNzIHRvIHRoZSBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIHByb3ZpZGVkIGJ5IHRoaXNcbi8vIHNlbWFudGljcy5cblNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3MgPSBmdW5jdGlvbihncmFtbWFyLCBvcHRTdXBlclNlbWFudGljcykge1xuICB2YXIgcyA9IG5ldyBTZW1hbnRpY3MoXG4gICAgICBncmFtbWFyLFxuICAgICAgb3B0U3VwZXJTZW1hbnRpY3MgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgb3B0U3VwZXJTZW1hbnRpY3MgOlxuICAgICAgICAgIFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzLl9nZXRTZW1hbnRpY3MoKSk7XG5cbiAgLy8gVG8gZW5hYmxlIGNsaWVudHMgdG8gaW52b2tlIGEgc2VtYW50aWNzIGxpa2UgYSBmdW5jdGlvbiwgcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBhY3RzIGFzIGEgcHJveHlcbiAgLy8gZm9yIGBzYCwgd2hpY2ggaXMgdGhlIHJlYWwgYFNlbWFudGljc2AgaW5zdGFuY2UuXG4gIHZhciBwcm94eSA9IGZ1bmN0aW9uIEFTZW1hbnRpY3MobWF0Y2hSZXN1bHQpIHtcbiAgICBpZiAoIShtYXRjaFJlc3VsdCBpbnN0YW5jZW9mIE1hdGNoUmVzdWx0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnU2VtYW50aWNzIGV4cGVjdGVkIGEgTWF0Y2hSZXN1bHQsIGJ1dCBnb3QgJyArIGNvbW1vbi51bmV4cGVjdGVkT2JqVG9TdHJpbmcobWF0Y2hSZXN1bHQpKTtcbiAgICB9XG4gICAgaWYgKCFtYXRjaFJlc3VsdC5zdWNjZWVkZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnY2Fubm90IGFwcGx5IFNlbWFudGljcyB0byAnICsgbWF0Y2hSZXN1bHQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgdmFyIGNzdCA9IG1hdGNoUmVzdWx0Ll9jc3Q7XG4gICAgaWYgKGNzdC5ncmFtbWFyICE9PSBncmFtbWFyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJDYW5ub3QgdXNlIGEgTWF0Y2hSZXN1bHQgZnJvbSBncmFtbWFyICdcIiArIGNzdC5ncmFtbWFyLm5hbWUgK1xuICAgICAgICAgIFwiJyB3aXRoIGEgc2VtYW50aWNzIGZvciAnXCIgKyBncmFtbWFyLm5hbWUgKyBcIidcIik7XG4gICAgfVxuICAgIHJldHVybiBzLndyYXAoY3N0KTtcbiAgfTtcblxuICAvLyBGb3J3YXJkIHB1YmxpYyBtZXRob2RzIGZyb20gdGhlIHByb3h5IHRvIHRoZSBzZW1hbnRpY3MgaW5zdGFuY2UuXG4gIHByb3h5LmFkZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKHNpZ25hdHVyZSwgYWN0aW9uRGljdCkge1xuICAgIHMuYWRkT3BlcmF0aW9uT3JBdHRyaWJ1dGUuY2FsbChzLCAnb3BlcmF0aW9uJywgc2lnbmF0dXJlLCBhY3Rpb25EaWN0KTtcbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG4gIHByb3h5LmV4dGVuZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIGFjdGlvbkRpY3QpIHtcbiAgICBzLmV4dGVuZE9wZXJhdGlvbk9yQXR0cmlidXRlLmNhbGwocywgJ29wZXJhdGlvbicsIG5hbWUsIGFjdGlvbkRpY3QpO1xuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbiAgcHJveHkuYWRkQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgYWN0aW9uRGljdCkge1xuICAgIHMuYWRkT3BlcmF0aW9uT3JBdHRyaWJ1dGUuY2FsbChzLCAnYXR0cmlidXRlJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5leHRlbmRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZS5jYWxsKHMsICdhdHRyaWJ1dGUnLCBuYW1lLCBhY3Rpb25EaWN0KTtcbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG4gIHByb3h5Ll9nZXRBY3Rpb25EaWN0ID0gZnVuY3Rpb24ob3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lKSB7XG4gICAgdmFyIGFjdGlvbiA9IHMub3BlcmF0aW9uc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdIHx8IHMuYXR0cmlidXRlc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgIGlmICghYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSArICdcIiBpcyBub3QgYSB2YWxpZCBvcGVyYXRpb24gb3IgYXR0cmlidXRlICcgK1xuICAgICAgICAnbmFtZSBpbiB0aGlzIHNlbWFudGljcyBmb3IgXCInICsgZ3JhbW1hci5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICAgIHJldHVybiBhY3Rpb24uYWN0aW9uRGljdDtcbiAgfTtcbiAgcHJveHkuX3JlbW92ZSA9IGZ1bmN0aW9uKG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSkge1xuICAgIHZhciBzZW1hbnRpYztcbiAgICBpZiAob3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lIGluIHMub3BlcmF0aW9ucykge1xuICAgICAgc2VtYW50aWMgPSBzLm9wZXJhdGlvbnNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICAgIGRlbGV0ZSBzLm9wZXJhdGlvbnNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSBpbiBzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIHNlbWFudGljID0gcy5hdHRyaWJ1dGVzW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgICBkZWxldGUgcy5hdHRyaWJ1dGVzW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgfVxuICAgIGRlbGV0ZSBzLldyYXBwZXIucHJvdG90eXBlW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgcmV0dXJuIHNlbWFudGljO1xuICB9O1xuICBwcm94eS5nZXRPcGVyYXRpb25OYW1lcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzLm9wZXJhdGlvbnMpO1xuICB9O1xuICBwcm94eS5nZXRBdHRyaWJ1dGVOYW1lcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzLmF0dHJpYnV0ZXMpO1xuICB9O1xuICBwcm94eS5nZXRHcmFtbWFyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHMuZ3JhbW1hcjtcbiAgfTtcbiAgcHJveHkudG9SZWNpcGUgPSBmdW5jdGlvbihzZW1hbnRpY3NPbmx5KSB7XG4gICAgcmV0dXJuIHMudG9SZWNpcGUoc2VtYW50aWNzT25seSk7XG4gIH07XG5cbiAgLy8gTWFrZSB0aGUgcHJveHkncyB0b1N0cmluZygpIHdvcmsuXG4gIHByb3h5LnRvU3RyaW5nID0gcy50b1N0cmluZy5iaW5kKHMpO1xuXG4gIC8vIFJldHVybnMgdGhlIHNlbWFudGljcyBmb3IgdGhlIHByb3h5LlxuICBwcm94eS5fZ2V0U2VtYW50aWNzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHM7XG4gIH07XG5cbiAgcmV0dXJuIHByb3h5O1xufTtcblxuU2VtYW50aWNzLmluaXRCdWlsdEluU2VtYW50aWNzID0gZnVuY3Rpb24oYnVpbHRJblJ1bGVzKSB7XG4gIHZhciBhY3Rpb25zID0ge1xuICAgIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZXJhdGlvbigpO1xuICAgIH0sXG4gICAgbm9uRW1wdHk6IGZ1bmN0aW9uKGZpcnN0LCBfLCByZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5pdGVyYXRpb24oW2ZpcnN0XS5jb25jYXQocmVzdC5jaGlsZHJlbikpO1xuICAgIH1cbiAgfTtcblxuICBTZW1hbnRpY3MuQnVpbHRJblNlbWFudGljcyA9IFNlbWFudGljc1xuICAgICAgLmNyZWF0ZVNlbWFudGljcyhidWlsdEluUnVsZXMsIG51bGwpXG4gICAgICAuYWRkT3BlcmF0aW9uKCdhc0l0ZXJhdGlvbicsIHtcbiAgICAgICAgZW1wdHlMaXN0T2Y6IGFjdGlvbnMuZW1wdHksXG4gICAgICAgIG5vbmVtcHR5TGlzdE9mOiBhY3Rpb25zLm5vbkVtcHR5LFxuICAgICAgICBFbXB0eUxpc3RPZjogYWN0aW9ucy5lbXB0eSxcbiAgICAgICAgTm9uZW1wdHlMaXN0T2Y6IGFjdGlvbnMubm9uRW1wdHlcbiAgICAgIH0pO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gT3BlcmF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEFuIE9wZXJhdGlvbiByZXByZXNlbnRzIGEgZnVuY3Rpb24gdG8gYmUgYXBwbGllZCB0byBhIGNvbmNyZXRlIHN5bnRheCB0cmVlIChDU1QpIC0tIGl0J3MgdmVyeVxuLy8gc2ltaWxhciB0byBhIFZpc2l0b3IgKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVmlzaXRvcl9wYXR0ZXJuKS4gQW4gb3BlcmF0aW9uIGlzIGV4ZWN1dGVkIGJ5XG4vLyByZWN1cnNpdmVseSB3YWxraW5nIHRoZSBDU1QsIGFuZCBhdCBlYWNoIG5vZGUsIGludm9raW5nIHRoZSBtYXRjaGluZyBzZW1hbnRpYyBhY3Rpb24gZnJvbVxuLy8gYGFjdGlvbkRpY3RgLiBTZWUgYE9wZXJhdGlvbi5wcm90b3R5cGUuZXhlY3V0ZWAgZm9yIGRldGFpbHMgb2YgaG93IGEgQ1NUIG5vZGUncyBtYXRjaGluZyBzZW1hbnRpY1xuLy8gYWN0aW9uIGlzIGZvdW5kLlxuZnVuY3Rpb24gT3BlcmF0aW9uKG5hbWUsIGZvcm1hbHMsIGFjdGlvbkRpY3QsIGJ1aWx0SW5EZWZhdWx0KSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuZm9ybWFscyA9IGZvcm1hbHM7XG4gIHRoaXMuYWN0aW9uRGljdCA9IGFjdGlvbkRpY3Q7XG4gIHRoaXMuYnVpbHRJbkRlZmF1bHQgPSBidWlsdEluRGVmYXVsdDtcbn1cblxuT3BlcmF0aW9uLnByb3RvdHlwZS50eXBlTmFtZSA9ICdvcGVyYXRpb24nO1xuXG5PcGVyYXRpb24ucHJvdG90eXBlLmNoZWNrQWN0aW9uRGljdCA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgZ3JhbW1hci5fY2hlY2tUb3BEb3duQWN0aW9uRGljdCh0aGlzLnR5cGVOYW1lLCB0aGlzLm5hbWUsIHRoaXMuYWN0aW9uRGljdCk7XG59O1xuXG4vLyBFeGVjdXRlIHRoaXMgb3BlcmF0aW9uIG9uIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggYG5vZGVXcmFwcGVyYCBpbiB0aGUgY29udGV4dCBvZiB0aGUgZ2l2ZW5cbi8vIFNlbWFudGljcyBpbnN0YW5jZS5cbk9wZXJhdGlvbi5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIpIHtcbiAgLy8gTG9vayBmb3IgYSBzZW1hbnRpYyBhY3Rpb24gd2hvc2UgbmFtZSBtYXRjaGVzIHRoZSBub2RlJ3MgY29uc3RydWN0b3IgbmFtZSwgd2hpY2ggaXMgZWl0aGVyIHRoZVxuICAvLyBuYW1lIG9mIGEgcnVsZSBpbiB0aGUgZ3JhbW1hciwgb3IgJ190ZXJtaW5hbCcgKGZvciBhIHRlcm1pbmFsIG5vZGUpLCBvciAnX2l0ZXInIChmb3IgYW5cbiAgLy8gaXRlcmF0aW9uIG5vZGUpLiBJbiB0aGUgbGF0dGVyIGNhc2UsIHRoZSBhY3Rpb24gZnVuY3Rpb24gcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQsIHdoaWNoIGlzXG4gIC8vIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgQ1NUIG5vZGUuXG4gIHZhciBhY3Rpb25GbiA9IHRoaXMuYWN0aW9uRGljdFtub2RlV3JhcHBlci5fbm9kZS5jdG9yTmFtZV07XG4gIGlmIChhY3Rpb25Gbikge1xuICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIGFjdGlvbkZuLCBub2RlV3JhcHBlci5pc0l0ZXJhdGlvbigpKTtcbiAgfVxuXG4gIC8vIFRoZSBhY3Rpb24gZGljdGlvbmFyeSBkb2VzIG5vdCBjb250YWluIGEgc2VtYW50aWMgYWN0aW9uIGZvciB0aGlzIHNwZWNpZmljIHR5cGUgb2Ygbm9kZS5cbiAgLy8gSWYgdGhpcyBpcyBhIG5vbnRlcm1pbmFsIG5vZGUgYW5kIHRoZSBwcm9ncmFtbWVyIGhhcyBwcm92aWRlZCBhIGBfbm9udGVybWluYWxgIHNlbWFudGljXG4gIC8vIGFjdGlvbiwgd2UgaW52b2tlIGl0OlxuICBpZiAobm9kZVdyYXBwZXIuaXNOb250ZXJtaW5hbCgpKSB7XG4gICAgYWN0aW9uRm4gPSB0aGlzLmFjdGlvbkRpY3QuX25vbnRlcm1pbmFsO1xuICAgIGlmIChhY3Rpb25Gbikge1xuICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlciwgYWN0aW9uRm4sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE90aGVyd2lzZSwgd2UgaW52b2tlIHRoZSAnX2RlZmF1bHQnIHNlbWFudGljIGFjdGlvbi5cbiAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlciwgdGhpcy5hY3Rpb25EaWN0Ll9kZWZhdWx0LCB0cnVlKTtcbn07XG5cbi8vIEludm9rZSBgYWN0aW9uRm5gIG9uIHRoZSBDU1Qgbm9kZSB0aGF0IGNvcnJlc3BvbmRzIHRvIGBub2RlV3JhcHBlcmAsIGluIHRoZSBjb250ZXh0IG9mXG4vLyBgc2VtYW50aWNzYC4gSWYgYG9wdFBhc3NDaGlsZHJlbkFzQXJyYXlgIGlzIHRydXRoeSwgYGFjdGlvbkZuYCB3aWxsIGJlIGNhbGxlZCB3aXRoIGEgc2luZ2xlXG4vLyBhcmd1bWVudCwgd2hpY2ggaXMgYW4gYXJyYXkgb2Ygd3JhcHBlcnMuIE90aGVyd2lzZSwgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gYGFjdGlvbkZuYCB3aWxsXG4vLyBiZSBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoZSBDU1Qgbm9kZS5cbk9wZXJhdGlvbi5wcm90b3R5cGUuZG9BY3Rpb24gPSBmdW5jdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyLCBhY3Rpb25Gbiwgb3B0UGFzc0NoaWxkcmVuQXNBcnJheSkge1xuICByZXR1cm4gb3B0UGFzc0NoaWxkcmVuQXNBcnJheSA/XG4gICAgICBhY3Rpb25Gbi5jYWxsKG5vZGVXcmFwcGVyLCBub2RlV3JhcHBlci5fY2hpbGRyZW4oKSkgOlxuICAgICAgYWN0aW9uRm4uYXBwbHkobm9kZVdyYXBwZXIsIG5vZGVXcmFwcGVyLl9jaGlsZHJlbigpKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIEF0dHJpYnV0ZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBBdHRyaWJ1dGVzIGFyZSBPcGVyYXRpb25zIHdob3NlIHJlc3VsdHMgYXJlIG1lbW9pemVkLiBUaGlzIG1lYW5zIHRoYXQsIGZvciBhbnkgZ2l2ZW4gc2VtYW50aWNzLFxuLy8gdGhlIHNlbWFudGljIGFjdGlvbiBmb3IgYSBDU1Qgbm9kZSB3aWxsIGJlIGludm9rZWQgbm8gbW9yZSB0aGFuIG9uY2UuXG5mdW5jdGlvbiBBdHRyaWJ1dGUobmFtZSwgYWN0aW9uRGljdCwgYnVpbHRJbkRlZmF1bHQpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5mb3JtYWxzID0gW107XG4gIHRoaXMuYWN0aW9uRGljdCA9IGFjdGlvbkRpY3Q7XG4gIHRoaXMuYnVpbHRJbkRlZmF1bHQgPSBidWlsdEluRGVmYXVsdDtcbn1cbmluaGVyaXRzKEF0dHJpYnV0ZSwgT3BlcmF0aW9uKTtcblxuQXR0cmlidXRlLnByb3RvdHlwZS50eXBlTmFtZSA9ICdhdHRyaWJ1dGUnO1xuXG5BdHRyaWJ1dGUucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyKSB7XG4gIHZhciBub2RlID0gbm9kZVdyYXBwZXIuX25vZGU7XG4gIHZhciBrZXkgPSBzZW1hbnRpY3MuYXR0cmlidXRlS2V5c1t0aGlzLm5hbWVdO1xuICBpZiAoIW5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgaXMgYSBzdXBlci1zZW5kIC0tIGlzbid0IEpTIGJlYXV0aWZ1bD8gOi9cbiAgICBub2RlW2tleV0gPSBPcGVyYXRpb24ucHJvdG90eXBlLmV4ZWN1dGUuY2FsbCh0aGlzLCBzZW1hbnRpY3MsIG5vZGVXcmFwcGVyKTtcbiAgfVxuICByZXR1cm4gbm9kZVtrZXldO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gU2VtYW50aWNzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9JbnB1dFN0cmVhbScpO1xudmFyIFBvc0luZm8gPSByZXF1aXJlKCcuL1Bvc0luZm8nKTtcbnZhciBUcmFjZSA9IHJlcXVpcmUoJy4vVHJhY2UnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OID0gMDtcbnZhciBSTV9SSUdIVE1PU1RfRkFJTFVSRVMgPSAxO1xuXG52YXIgYXBwbHlTcGFjZXMgPSBuZXcgcGV4cHJzLkFwcGx5KCdzcGFjZXMnKTtcblxuZnVuY3Rpb24gU3RhdGUoZ3JhbW1hciwgaW5wdXQsIG9wdHMpIHtcbiAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgdGhpcy5zdGFydEV4cHIgPSB0aGlzLl9nZXRTdGFydEV4cHIoZ3JhbW1hciwgb3B0cy5zdGFydEFwcGxpY2F0aW9uKTtcbiAgdGhpcy5pbnB1dFN0cmVhbSA9IG5ldyBJbnB1dFN0cmVhbShpbnB1dCk7XG4gIHRoaXMudHJhY2luZ0VuYWJsZWQgPSBvcHRzLnRyYWNlIHx8IGZhbHNlO1xuICB0aGlzLm1hdGNoTm9kZXMgPSBvcHRzLm1hdGNoTm9kZXMgfHwgZmFsc2U7XG4gIHRoaXMuaW5pdChSTV9SSUdIVE1PU1RfRkFJTFVSRV9QT1NJVElPTik7XG59XG5cblN0YXRlLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24ocmVjb3JkaW5nTW9kZSkge1xuICAgIHRoaXMucG9zSW5mb3MgPSBbXTtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YWNrID0gW107XG4gICAgdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrID0gW2ZhbHNlXTtcblxuICAgIHRoaXMucmVjb3JkaW5nTW9kZSA9IHJlY29yZGluZ01vZGU7XG4gICAgaWYgKHJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKSB7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiA9IC0xO1xuICAgIH0gZWxzZSBpZiAocmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSB7XG4gICAgICAvLyBXZSBhbHdheXMgcnVuIGluICpyaWdodG1vc3QgZmFpbHVyZSBwb3NpdGlvbiogcmVjb3JkaW5nIG1vZGUgYmVmb3JlIHJ1bm5pbmcgaW5cbiAgICAgIC8vICpyaWdodG1vc3QgZmFpbHVyZXMqIHJlY29yZGluZyBtb2RlLiBBbmQgc2luY2UgdGhlIHRyYWNlcyBnZW5lcmF0ZWQgYnkgZWFjaCBvZlxuICAgICAgLy8gdGhlc2UgcGFzc2VzIHdvdWxkIGJlIGlkZW50aWNhbCwgdGhlcmUncyBubyBuZWVkIHRvIHJlY29yZCBpdCBub3cgaWYgd2UgaGF2ZVxuICAgICAgLy8gYWxyZWFkeSByZWNvcmRlZCBpdCBpbiB0aGUgZmlyc3QgcGFzcy5cbiAgICAgIHRoaXMudHJhY2luZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHJlY29yZGluZyBtb2RlOiAnICsgcmVjb3JkaW5nTW9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHRoaXMudHJhY2UgPSBbXTtcbiAgICB9XG4gIH0sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKGFwcCkge1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGFjay5wdXNoKGFwcCk7XG4gICAgdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrLnB1c2goZmFsc2UpO1xuICB9LFxuXG4gIGV4aXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGFjay5wb3AoKTtcbiAgICB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2sucG9wKCk7XG4gIH0sXG5cbiAgZW50ZXJMZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wdXNoKHRydWUpO1xuICB9LFxuXG4gIGV4aXRMZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wb3AoKTtcbiAgfSxcblxuICBjdXJyZW50QXBwbGljYXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uU3RhY2tbdGhpcy5hcHBsaWNhdGlvblN0YWNrLmxlbmd0aCAtIDFdO1xuICB9LFxuXG4gIGluU3ludGFjdGljQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmlucHV0U3RyZWFtLnNvdXJjZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGN1cnJlbnRBcHBsaWNhdGlvbiA9IHRoaXMuY3VycmVudEFwcGxpY2F0aW9uKCk7XG4gICAgaWYgKGN1cnJlbnRBcHBsaWNhdGlvbikge1xuICAgICAgcmV0dXJuIGN1cnJlbnRBcHBsaWNhdGlvbi5pc1N5bnRhY3RpYygpICYmICF0aGlzLmluTGV4aWZpZWRDb250ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSB0b3AtbGV2ZWwgY29udGV4dCBpcyBzeW50YWN0aWMgaWYgdGhlIHN0YXJ0IGFwcGxpY2F0aW9uIGlzLlxuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRFeHByLmZhY3RvcnNbMF0uaXNTeW50YWN0aWMoKTtcbiAgICB9XG4gIH0sXG5cbiAgaW5MZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2tbdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrLmxlbmd0aCAtIDFdO1xuICB9LFxuXG4gIHNraXBTcGFjZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmlnRmFpbHVyZXNJbmZvID0gdGhpcy5nZXRGYWlsdXJlc0luZm8oKTtcbiAgICB0aGlzLmV2YWwoYXBwbHlTcGFjZXMpO1xuICAgIHRoaXMuYmluZGluZ3MucG9wKCk7XG4gICAgdGhpcy5yZXN0b3JlRmFpbHVyZXNJbmZvKG9yaWdGYWlsdXJlc0luZm8pO1xuICAgIHJldHVybiB0aGlzLmlucHV0U3RyZWFtLnBvcztcbiAgfSxcblxuICBza2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluU3ludGFjdGljQ29udGV4dCgpID9cbiAgICAgICAgdGhpcy5za2lwU3BhY2VzKCkgOlxuICAgICAgICB0aGlzLmlucHV0U3RyZWFtLnBvcztcbiAgfSxcblxuICBtYXliZVNraXBTcGFjZXNCZWZvcmU6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIHBleHBycy5BcHBseSAmJiBleHByLmlzU3ludGFjdGljKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXBTcGFjZXMoKTtcbiAgICB9IGVsc2UgaWYgKGV4cHIuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSgpICYmIGV4cHIgIT09IGFwcGx5U3BhY2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5za2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXRTdHJlYW0ucG9zO1xuICAgIH1cbiAgfSxcblxuICB0cnVuY2F0ZUJpbmRpbmdzOiBmdW5jdGlvbihuZXdMZW5ndGgpIHtcbiAgICAvLyBZZXMsIHRoaXMgaXMgdGhpcyByZWFsbHkgZmFzdGVyIHRoYW4gc2V0dGluZyB0aGUgYGxlbmd0aGAgcHJvcGVydHkgKHRlc3RlZCB3aXRoXG4gICAgLy8gYmluL2VzNWJlbmNoIG9uIE5vZGUgdjYuMS4wKS5cbiAgICB3aGlsZSAodGhpcy5iaW5kaW5ncy5sZW5ndGggPiBuZXdMZW5ndGgpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MucG9wKCk7XG4gICAgfVxuICB9LFxuXG4gIGdldEN1cnJlbnRQb3NJbmZvOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQb3NJbmZvKHRoaXMuaW5wdXRTdHJlYW0ucG9zKTtcbiAgfSxcblxuICBnZXRQb3NJbmZvOiBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgcG9zSW5mbyA9IHRoaXMucG9zSW5mb3NbcG9zXTtcbiAgICByZXR1cm4gcG9zSW5mbyB8fCAodGhpcy5wb3NJbmZvc1twb3NdID0gbmV3IFBvc0luZm8odGhpcykpO1xuICB9LFxuXG4gIHByb2Nlc3NGYWlsdXJlOiBmdW5jdGlvbihwb3MsIGV4cHIpIHtcbiAgICBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRV9QT1NJVElPTikge1xuICAgICAgaWYgKHBvcyA+IHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gcG9zO1xuICAgICAgfVxuICAgIH0gZWxzZSAvKiBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMpICovXG4gICAgICAgIGlmIChwb3MgPT09IHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKSB7XG4gICAgICAgICAgLy8gV2UncmUgb25seSBpbnRlcmVzdGVkIGluIGZhaWx1cmVzIGF0IHRoZSByaWdodG1vc3QgZmFpbHVyZSBwb3NpdGlvbiB0aGF0IGhhdmVuJ3RcbiAgICAgICAgICAvLyBhbHJlYWR5IGJlZW4gcmVjb3JkZWQuXG5cbiAgICAgICAgICB0aGlzLmFkZFJpZ2h0bW9zdEZhaWx1cmUoZXhwci50b0ZhaWx1cmUodGhpcy5ncmFtbWFyKSwgZmFsc2UpO1xuICAgICAgICB9XG4gIH0sXG5cbiAgZW5zdXJlUmlnaHRtb3N0RmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5yaWdodG1vc3RGYWlsdXJlcykge1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICB9LFxuXG4gIGFkZFJpZ2h0bW9zdEZhaWx1cmU6IGZ1bmN0aW9uKGZhaWx1cmUsIHNob3VsZENsb25lSWZOZXcpIHtcbiAgICB0aGlzLmVuc3VyZVJpZ2h0bW9zdEZhaWx1cmVzKCk7XG4gICAgdmFyIGtleSA9IGZhaWx1cmUudG9LZXkoKTtcbiAgICBpZiAoIXRoaXMucmlnaHRtb3N0RmFpbHVyZXNba2V5XSkge1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlc1trZXldID0gc2hvdWxkQ2xvbmVJZk5ldyA/IGZhaWx1cmUuY2xvbmUoKSA6IGZhaWx1cmU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0uaXNGbHVmZnkoKSAmJiAhZmFpbHVyZS5pc0ZsdWZmeSgpKSB7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0uY2xlYXJGbHVmZnkoKTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkUmlnaHRtb3N0RmFpbHVyZXM6IGZ1bmN0aW9uKGZhaWx1cmVzLCBzaG91bGRDbG9uZUlmTmV3KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKGZhaWx1cmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgc2VsZi5hZGRSaWdodG1vc3RGYWlsdXJlKGZhaWx1cmVzW2tleV0sIHNob3VsZENsb25lSWZOZXcpO1xuICAgIH0pO1xuICB9LFxuXG4gIGNsb25lUmlnaHRtb3N0RmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5yaWdodG1vc3RGYWlsdXJlcykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgYW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmtleXModGhpcy5yaWdodG1vc3RGYWlsdXJlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGFuc1trZXldID0gc2VsZi5yaWdodG1vc3RGYWlsdXJlc1trZXldLmNsb25lKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICBnZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbjtcbiAgfSxcblxuICBnZXRGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIC8vIFJld2luZCwgdGhlbiB0cnkgdG8gbWF0Y2ggdGhlIGlucHV0IGFnYWluLCByZWNvcmRpbmcgZmFpbHVyZXMuXG4gICAgICB0aGlzLmluaXQoUk1fUklHSFRNT1NUX0ZBSUxVUkVTKTtcbiAgICAgIHRoaXMuZXZhbEZyb21TdGFydCgpO1xuICAgIH1cblxuICAgIHRoaXMuZW5zdXJlUmlnaHRtb3N0RmFpbHVyZXMoKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmlnaHRtb3N0RmFpbHVyZXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBzZWxmLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV07XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyB0aGUgbWVtb2l6ZWQgdHJhY2UgZW50cnkgZm9yIGBleHByYCBhdCBgcG9zYCwgaWYgb25lIGV4aXN0cywgYG51bGxgIG90aGVyd2lzZS5cbiAgZ2V0TWVtb2l6ZWRUcmFjZUVudHJ5OiBmdW5jdGlvbihwb3MsIGV4cHIpIHtcbiAgICB2YXIgcG9zSW5mbyA9IHRoaXMucG9zSW5mb3NbcG9zXTtcbiAgICBpZiAocG9zSW5mbyAmJiBleHByLnJ1bGVOYW1lKSB7XG4gICAgICB2YXIgbWVtb1JlYyA9IHBvc0luZm8ubWVtb1tleHByLnRvTWVtb0tleSgpXTtcbiAgICAgIGlmIChtZW1vUmVjKSB7XG4gICAgICAgIHJldHVybiBtZW1vUmVjLnRyYWNlRW50cnk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBuZXcgdHJhY2UgZW50cnksIHdpdGggdGhlIGN1cnJlbnRseSBhY3RpdmUgdHJhY2UgYXJyYXkgYXMgaXRzIGNoaWxkcmVuLlxuICBnZXRUcmFjZUVudHJ5OiBmdW5jdGlvbihwb3MsIGV4cHIsIHN1Y2NlZWRlZCwgYmluZGluZ3MpIHtcbiAgICB2YXIgbWVtb0VudHJ5ID0gdGhpcy5nZXRNZW1vaXplZFRyYWNlRW50cnkocG9zLCBleHByKTtcbiAgICByZXR1cm4gbWVtb0VudHJ5ID8gbWVtb0VudHJ5LmNsb25lV2l0aEV4cHIoZXhwcilcbiAgICAgICAgICAgICAgICAgICAgIDogbmV3IFRyYWNlKHRoaXMuaW5wdXRTdHJlYW0sIHBvcywgZXhwciwgc3VjY2VlZGVkLCBiaW5kaW5ncywgdGhpcy50cmFjZSk7XG4gIH0sXG5cbiAgaXNUcmFjaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFjaW5nRW5hYmxlZDtcbiAgfSxcblxuICB1c2VNZW1vaXplZFJlc3VsdDogZnVuY3Rpb24obWVtb1JlYykge1xuICAgIGlmICh0aGlzLmlzVHJhY2luZygpKSB7XG4gICAgICB0aGlzLnRyYWNlLnB1c2gobWVtb1JlYy50cmFjZUVudHJ5KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMgJiYgbWVtb1JlYy5mYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMuYWRkUmlnaHRtb3N0RmFpbHVyZXMobWVtb1JlYy5mYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb24sIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChtZW1vUmVjLnZhbHVlKSB7XG4gICAgICB0aGlzLmlucHV0U3RyZWFtLnBvcyA9IG1lbW9SZWMucG9zO1xuICAgICAgdGhpcy5iaW5kaW5ncy5wdXNoKG1lbW9SZWMudmFsdWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvLyBFdmFsdWF0ZSBgZXhwcmAgYW5kIHJldHVybiBgdHJ1ZWAgaWYgaXQgc3VjY2VlZGVkLCBgZmFsc2VgIG90aGVyd2lzZS4gT24gc3VjY2VzcywgYGJpbmRpbmdzYFxuICAvLyB3aWxsIGhhdmUgYGV4cHIuZ2V0QXJpdHkoKWAgbW9yZSBlbGVtZW50cyB0aGFuIGJlZm9yZSwgYW5kIHRoZSBpbnB1dCBzdHJlYW0ncyBwb3NpdGlvbiBtYXlcbiAgLy8gaGF2ZSBpbmNyZWFzZWQuIE9uIGZhaWx1cmUsIGBiaW5kaW5nc2AgYW5kIHBvc2l0aW9uIHdpbGwgYmUgdW5jaGFuZ2VkLlxuICBldmFsOiBmdW5jdGlvbihleHByKSB7XG4gICAgdmFyIGlucHV0U3RyZWFtID0gdGhpcy5pbnB1dFN0cmVhbTtcbiAgICB2YXIgb3JpZ051bUJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMpIHtcbiAgICAgIHZhciBvcmlnRmFpbHVyZXMgPSB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzO1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlcyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICB2YXIgbWVtb1BvcyA9IHRoaXMubWF5YmVTa2lwU3BhY2VzQmVmb3JlKGV4cHIpO1xuXG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHZhciBvcmlnVHJhY2UgPSB0aGlzLnRyYWNlO1xuICAgICAgdGhpcy50cmFjZSA9IFtdO1xuICAgIH1cblxuICAgIC8vIERvIHRoZSBhY3R1YWwgZXZhbHVhdGlvbi5cbiAgICB2YXIgYW5zID0gZXhwci5ldmFsKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuYmluZGluZ3Muc2xpY2Uob3JpZ051bUJpbmRpbmdzKTtcbiAgICAgIHZhciB0cmFjZUVudHJ5ID0gdGhpcy5nZXRUcmFjZUVudHJ5KG1lbW9Qb3MsIGV4cHIsIGFucywgYmluZGluZ3MpO1xuICAgICAgdHJhY2VFbnRyeS5pc0ltcGxpY2l0U3BhY2VzID0gZXhwciA9PT0gYXBwbHlTcGFjZXM7XG4gICAgICB0cmFjZUVudHJ5LmlzUm9vdE5vZGUgPSBleHByID09PSB0aGlzLnN0YXJ0RXhwcjtcbiAgICAgIG9yaWdUcmFjZS5wdXNoKHRyYWNlRW50cnkpO1xuICAgICAgdGhpcy50cmFjZSA9IG9yaWdUcmFjZTtcbiAgICB9XG5cbiAgICBpZiAoYW5zKSB7XG4gICAgICBpZiAodGhpcy5yaWdodG1vc3RGYWlsdXJlcyAmJlxuICAgICAgICAoaW5wdXRTdHJlYW0ucG9zID09PSB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiB8fFxuICAgICAgICAgdGhpcy5za2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQoKSA9PT0gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24pKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5yaWdodG1vc3RGYWlsdXJlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICBzZWxmLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0ubWFrZUZsdWZmeSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVzZXQgdGhlIHBvc2l0aW9uIGFuZCB0aGUgYmluZGluZ3MuXG4gICAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgICAgdGhpcy50cnVuY2F0ZUJpbmRpbmdzKG9yaWdOdW1CaW5kaW5ncyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTICYmIG9yaWdGYWlsdXJlcykge1xuICAgICAgdGhpcy5hZGRSaWdodG1vc3RGYWlsdXJlcyhvcmlnRmFpbHVyZXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYW5zO1xuICB9LFxuXG4gIC8vIFJldHVybiB0aGUgc3RhcnRpbmcgZXhwcmVzc2lvbiBmb3IgdGhpcyBncmFtbWFyLiBJZiBgb3B0U3RhcnRBcHBsaWNhdGlvbmAgaXMgc3BlY2lmaWVkLCBpdFxuICAvLyBpcyBhIHN0cmluZyBleHByZXNzaW5nIGEgcnVsZSBhcHBsaWNhdGlvbiBpbiB0aGUgZ3JhbW1hci4gSWYgbm90IHNwZWNpZmllZCwgdGhlIGdyYW1tYXInc1xuICAvLyBkZWZhdWx0IHN0YXJ0IHJ1bGUgd2lsbCBiZSB1c2VkLlxuICBfZ2V0U3RhcnRFeHByOiBmdW5jdGlvbihncmFtbWFyLCBvcHRTdGFydEFwcGxpY2F0aW9uKSB7XG4gICAgdmFyIGFwcGxpY2F0aW9uU3RyID0gb3B0U3RhcnRBcHBsaWNhdGlvbiB8fCBncmFtbWFyLmRlZmF1bHRTdGFydFJ1bGU7XG4gICAgaWYgKCFhcHBsaWNhdGlvblN0cikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHN0YXJ0IHJ1bGUgYXJndW1lbnQgLS0gdGhlIGdyYW1tYXIgaGFzIG5vIGRlZmF1bHQgc3RhcnQgcnVsZS4nKTtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnRBcHAgPSBncmFtbWFyLnBhcnNlQXBwbGljYXRpb24oYXBwbGljYXRpb25TdHIpO1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlNlcShbc3RhcnRBcHAsIHBleHBycy5lbmRdKTtcbiAgfSxcblxuICBldmFsRnJvbVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmV2YWwodGhpcy5zdGFydEV4cHIpO1xuICB9LFxuXG4gIGdldEZhaWx1cmVzSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIHJldHVybiB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbjtcbiAgICB9IGVsc2UgLyogaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSAqLyB7XG4gICAgICByZXR1cm4gdGhpcy5yaWdodG1vc3RGYWlsdXJlcztcbiAgICB9XG4gIH0sXG5cbiAgcmVzdG9yZUZhaWx1cmVzSW5mbzogZnVuY3Rpb24oZmFpbHVyZXNJbmZvKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gZmFpbHVyZXNJbmZvO1xuICAgIH0gZWxzZSAvKiBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMpICovIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZXMgPSBmYWlsdXJlc0luZm87XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBJbnRlcnZhbCA9IHJlcXVpcmUoJy4vSW50ZXJ2YWwnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVW5pY29kZSBjaGFyYWN0ZXJzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIGB0b1N0cmluZ2Agb3V0cHV0LlxudmFyIEJBTExPVF9YID0gJ1xcdTI3MTcnO1xudmFyIENIRUNLX01BUksgPSAnXFx1MjcxMyc7XG52YXIgRE9UX09QRVJBVE9SID0gJ1xcdTIyQzUnO1xudmFyIFJJR0hUV0FSRFNfRE9VQkxFX0FSUk9XID0gJ1xcdTIxRDInO1xudmFyIFNZTUJPTF9GT1JfSE9SSVpPTlRBTF9UQUJVTEFUSU9OID0gJ1xcdTI0MDknO1xudmFyIFNZTUJPTF9GT1JfTElORV9GRUVEID0gJ1xcdTI0MEEnO1xudmFyIFNZTUJPTF9GT1JfQ0FSUklBR0VfUkVUVVJOID0gJ1xcdTI0MEQnO1xuXG5mdW5jdGlvbiBzcGFjZXMobikge1xuICByZXR1cm4gY29tbW9uLnJlcGVhdCgnICcsIG4pLmpvaW4oJycpO1xufVxuXG4vLyBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBwb3J0aW9uIG9mIGBpbnB1dFN0cmVhbWAgYXQgb2Zmc2V0IGBwb3NgLlxuLy8gVGhlIHJlc3VsdCB3aWxsIGNvbnRhaW4gZXhhY3RseSBgbGVuYCBjaGFyYWN0ZXJzLlxuZnVuY3Rpb24gZ2V0SW5wdXRFeGNlcnB0KGlucHV0U3RyZWFtLCBwb3MsIGxlbikge1xuICB2YXIgZXhjZXJwdCA9IGFzRXNjYXBlZFN0cmluZyhpbnB1dFN0cmVhbS5zb3VyY2VTbGljZShwb3MsIHBvcyArIGxlbikpO1xuXG4gIC8vIFBhZCB0aGUgb3V0cHV0IGlmIG5lY2Vzc2FyeS5cbiAgaWYgKGV4Y2VycHQubGVuZ3RoIDwgbGVuKSB7XG4gICAgcmV0dXJuIGV4Y2VycHQgKyBjb21tb24ucmVwZWF0KCcgJywgbGVuIC0gZXhjZXJwdC5sZW5ndGgpLmpvaW4oJycpO1xuICB9XG4gIHJldHVybiBleGNlcnB0O1xufVxuXG5mdW5jdGlvbiBhc0VzY2FwZWRTdHJpbmcob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIC8vIFJlcGxhY2Ugbm9uLXByaW50YWJsZSBjaGFyYWN0ZXJzIHdpdGggdmlzaWJsZSBzeW1ib2xzLlxuICAgIHJldHVybiBvYmpcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgRE9UX09QRVJBVE9SKVxuICAgICAgICAucmVwbGFjZSgvXFx0L2csIFNZTUJPTF9GT1JfSE9SSVpPTlRBTF9UQUJVTEFUSU9OKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csIFNZTUJPTF9GT1JfTElORV9GRUVEKVxuICAgICAgICAucmVwbGFjZSgvXFxyL2csIFNZTUJPTF9GT1JfQ0FSUklBR0VfUkVUVVJOKTtcbiAgfVxuICByZXR1cm4gU3RyaW5nKG9iaik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFRyYWNlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFRyYWNlKGlucHV0U3RyZWFtLCBwb3MsIGV4cHIsIHN1Y2NlZWRlZCwgYmluZGluZ3MsIG9wdENoaWxkcmVuKSB7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgdGhpcy5wb3MgPSBwb3M7XG4gIHRoaXMuaW50ZXJ2YWwgPSBuZXcgSW50ZXJ2YWwoaW5wdXRTdHJlYW0sIHBvcywgaW5wdXRTdHJlYW0ucG9zKTtcbiAgdGhpcy5leHByID0gZXhwcjtcbiAgdGhpcy5zdWNjZWVkZWQgPSBzdWNjZWVkZWQ7XG4gIHRoaXMuYmluZGluZ3MgPSBiaW5kaW5ncztcbiAgdGhpcy5jaGlsZHJlbiA9IG9wdENoaWxkcmVuIHx8IFtdO1xuXG4gIHRoaXMuaXNJbXBsaWNpdFNwYWNlcyA9IGZhbHNlO1xuICB0aGlzLmlzTGVmdFJlY3Vyc2l2ZSA9IGZhbHNlO1xuICB0aGlzLmlzTWVtb2l6ZWQgPSBmYWxzZTtcbiAgdGhpcy5pc1Jvb3ROb2RlID0gZmFsc2U7XG59XG5cbi8vIEEgdmFsdWUgdGhhdCBjYW4gYmUgcmV0dXJuZWQgZnJvbSB2aXNpdG9yIGZ1bmN0aW9ucyB0byBpbmRpY2F0ZSB0aGF0IGFcbi8vIG5vZGUgc2hvdWxkIG5vdCBiZSByZWN1cnNlZCBpbnRvLlxuVHJhY2UucHJvdG90eXBlLlNLSVAgPSB7fTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYWNlLnByb3RvdHlwZSwgJ2Rpc3BsYXlTdHJpbmcnLCB7XG4gIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmV4cHIudG9EaXNwbGF5U3RyaW5nKCk7IH1cbn0pO1xuXG5UcmFjZS5wcm90b3R5cGUuY2xvbmVXaXRoRXhwciA9IGZ1bmN0aW9uKGV4cHIpIHtcbiAgdmFyIGFucyA9IG5ldyBUcmFjZShcbiAgICAgIHRoaXMuaW5wdXRTdHJlYW0sIHRoaXMucG9zLCBleHByLCB0aGlzLnN1Y2NlZWRlZCwgdGhpcy5iaW5kaW5ncywgdGhpcy5jaGlsZHJlbik7XG4gIGFucy5pc0xlZnRSZWN1cnNpdmUgPSB0aGlzLmlzTGVmdFJlY3Vyc2l2ZTtcbiAgYW5zLmlzUm9vdE5vZGUgPSB0aGlzLmlzUm9vdE5vZGU7XG4gIGFucy5pc01lbW9pemVkID0gdHJ1ZTtcbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIHRoaXMgdHJhY2Ugbm9kZSBhbmQgYWxsIGl0cyBkZXNjZW5kZW50cywgY2FsbGluZyBhIHZpc2l0b3IgZnVuY3Rpb25cbi8vIGZvciBlYWNoIG5vZGUgdGhhdCBpcyB2aXNpdGVkLiBJZiBgdmlzdG9yT2JqT3JGbmAgaXMgYW4gb2JqZWN0LCB0aGVuIGl0cyAnZW50ZXInIHByb3BlcnR5XG4vLyBpcyBhIGZ1bmN0aW9uIHRvIGNhbGwgYmVmb3JlIHZpc2l0aW5nIHRoZSBjaGlsZHJlbiBvZiBhIG5vZGUsIGFuZCBpdHMgJ2V4aXQnIHByb3BlcnR5IGlzXG4vLyBhIGZ1bmN0aW9uIHRvIGNhbGwgYWZ0ZXJ3YXJkcy4gSWYgYHZpc2l0b3JPYmpPckZuYCBpcyBhIGZ1bmN0aW9uLCBpdCByZXByZXNlbnRzIHRoZSAnZW50ZXInXG4vLyBmdW5jdGlvbi5cbi8vXG4vLyBUaGUgZnVuY3Rpb25zIGFyZSBjYWxsZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6IHRoZSBUcmFjZSBub2RlLCBpdHMgcGFyZW50IFRyYWNlLCBhbmQgYSBudW1iZXJcbi8vIHJlcHJlc2VudGluZyB0aGUgZGVwdGggb2YgdGhlIG5vZGUgaW4gdGhlIHRyZWUuIChUaGUgcm9vdCBub2RlIGhhcyBkZXB0aCAwLikgYG9wdFRoaXNBcmdgLCBpZlxuLy8gc3BlY2lmaWVkLCBpcyB0aGUgdmFsdWUgdG8gdXNlIGZvciBgdGhpc2Agd2hlbiBleGVjdXRpbmcgdGhlIHZpc2l0b3IgZnVuY3Rpb25zLlxuVHJhY2UucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbih2aXNpdG9yT2JqT3JGbiwgb3B0VGhpc0FyZykge1xuICB2YXIgdmlzaXRvciA9IHZpc2l0b3JPYmpPckZuO1xuICBpZiAodHlwZW9mIHZpc2l0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2aXNpdG9yID0ge2VudGVyOiB2aXNpdG9yfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF93YWxrKG5vZGUsIHBhcmVudCwgZGVwdGgpIHtcbiAgICB2YXIgcmVjdXJzZSA9IHRydWU7XG4gICAgaWYgKHZpc2l0b3IuZW50ZXIpIHtcbiAgICAgIGlmICh2aXNpdG9yLmVudGVyLmNhbGwob3B0VGhpc0FyZywgbm9kZSwgcGFyZW50LCBkZXB0aCkgPT09IFRyYWNlLnByb3RvdHlwZS5TS0lQKSB7XG4gICAgICAgIHJlY3Vyc2UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlY3Vyc2UpIHtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCwgaSkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gbm9kZS5jaGlsZHJlbltpICsgMV07XG4gICAgICAgIGlmIChuZXh0Q2hpbGQgJiYgbmV4dENoaWxkLmV4cHIgPT09IGNoaWxkLmV4cHIgJiYgbmV4dENoaWxkLnBvcyA9PT0gY2hpbGQucG9zKSB7XG4gICAgICAgICAgLy8gU2tpcCB0aGlzIGNoaWxkIC0tIGl0IGlzIGFuIGludGVybWVkaWF0ZSBsZWZ0LXJlY3Vyc2l2ZSByZXN1bHQuXG4gICAgICAgICAgY29tbW9uLmFzc2VydChub2RlLmlzTGVmdFJlY3Vyc2l2ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3dhbGsoY2hpbGQsIG5vZGUsIGRlcHRoICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHZpc2l0b3IuZXhpdCkge1xuICAgICAgICB2aXNpdG9yLmV4aXQuY2FsbChvcHRUaGlzQXJnLCBub2RlLCBwYXJlbnQsIGRlcHRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHRoaXMuaXNSb290Tm9kZSkge1xuICAgIC8vIERvbid0IHZpc2l0IHRoZSByb290IG5vZGUgaXRzZWxmLCBvbmx5IGl0cyBjaGlsZHJlbi5cbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oYykgeyBfd2FsayhjLCBudWxsLCAwKTsgfSk7XG4gIH0gZWxzZSB7XG4gICAgX3dhbGsodGhpcywgbnVsbCwgMCk7XG4gIH1cbn07XG5cbi8vIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHJhY2UuXG4vLyBTYW1wbGU6XG4vLyAgICAgMTLii4Ur4ouFMuKLhSrii4UzIOKckyBleHAg4oeSICBcIjEyXCJcbi8vICAgICAxMuKLhSvii4Uy4ouFKuKLhTMgICDinJMgYWRkRXhwIChMUikg4oeSICBcIjEyXCJcbi8vICAgICAxMuKLhSvii4Uy4ouFKuKLhTMgICAgICAg4pyXIGFkZEV4cF9wbHVzXG5UcmFjZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNiID0gbmV3IGNvbW1vbi5TdHJpbmdCdWZmZXIoKTtcbiAgdGhpcy53YWxrKGZ1bmN0aW9uKG5vZGUsIHBhcmVudCwgZGVwdGgpIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlNLSVA7XG4gICAgfVxuICAgIHZhciBjdG9yTmFtZSA9IG5vZGUuZXhwci5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIC8vIERvbid0IHByaW50IGFueXRoaW5nIGZvciBBbHQgbm9kZXMuXG4gICAgaWYgKGN0b3JOYW1lID09PSAnQWx0Jykge1xuICAgICAgcmV0dXJuOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICAgIH1cbiAgICBzYi5hcHBlbmQoZ2V0SW5wdXRFeGNlcnB0KG5vZGUuaW5wdXRTdHJlYW0sIG5vZGUucG9zLCAxMCkgKyBzcGFjZXMoZGVwdGggKiAyICsgMSkpO1xuICAgIHNiLmFwcGVuZCgobm9kZS5zdWNjZWVkZWQgPyBDSEVDS19NQVJLIDogQkFMTE9UX1gpICsgJyAnICsgbm9kZS5kaXNwbGF5U3RyaW5nKTtcbiAgICBpZiAobm9kZS5pc0xlZnRSZWN1cnNpdmUpIHtcbiAgICAgIHNiLmFwcGVuZCgnIChMUiknKTtcbiAgICB9XG4gICAgaWYgKG5vZGUuc3VjY2VlZGVkKSB7XG4gICAgICB2YXIgY29udGVudHMgPSBhc0VzY2FwZWRTdHJpbmcobm9kZS5pbnRlcnZhbC5jb250ZW50cyk7XG4gICAgICBzYi5hcHBlbmQoJyAnICsgUklHSFRXQVJEU19ET1VCTEVfQVJST1cgKyAnICAnKTtcbiAgICAgIHNiLmFwcGVuZCh0eXBlb2YgY29udGVudHMgPT09ICdzdHJpbmcnID8gJ1wiJyArIGNvbnRlbnRzICsgJ1wiJyA6IGNvbnRlbnRzKTtcbiAgICB9XG4gICAgc2IuYXBwZW5kKCdcXG4nKTtcbiAgfS5iaW5kKHRoaXMpKTtcbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCd1dGlsLWV4dGVuZCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBTdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSGVscGVyc1xuXG52YXIgZXNjYXBlU3RyaW5nRm9yID0ge307XG5mb3IgKHZhciBjID0gMDsgYyA8IDEyODsgYysrKSB7XG4gIGVzY2FwZVN0cmluZ0ZvcltjXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG59XG5lc2NhcGVTdHJpbmdGb3JbXCInXCIuY2hhckNvZGVBdCgwKV0gID0gXCJcXFxcJ1wiO1xuZXNjYXBlU3RyaW5nRm9yWydcIicuY2hhckNvZGVBdCgwKV0gID0gJ1xcXFxcIic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcXFwnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxcXFxcJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxiJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcYic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcZicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXGYnO1xuZXNjYXBlU3RyaW5nRm9yWydcXG4nLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxuJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxyJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxccic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcdCcuY2hhckNvZGVBdCgwKV0gPSAnXFxcXHQnO1xuZXNjYXBlU3RyaW5nRm9yWydcXHUwMDBiJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcdic7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLmFic3RyYWN0ID0gZnVuY3Rpb24ob3B0TWV0aG9kTmFtZSkge1xuICB2YXIgbWV0aG9kTmFtZSA9IG9wdE1ldGhvZE5hbWUgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAndGhpcyBtZXRob2QgJyArIG1ldGhvZE5hbWUgKyAnIGlzIGFic3RyYWN0ISAnICtcbiAgICAgICcoaXQgaGFzIG5vIGltcGxlbWVudGF0aW9uIGluIGNsYXNzICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnKScpO1xuICB9O1xufTtcblxuZXhwb3J0cy5hc3NlcnQgPSBmdW5jdGlvbihjb25kLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxufTtcblxuLy8gRGVmaW5lIGEgbGF6aWx5LWNvbXB1dGVkLCBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lZCBgcHJvcE5hbWVgXG4vLyBvbiB0aGUgb2JqZWN0IGBvYmpgLiBgZ2V0dGVyRm5gIHdpbGwgYmUgY2FsbGVkIHRvIGNvbXB1dGUgdGhlIHZhbHVlIHRoZVxuLy8gZmlyc3QgdGltZSB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQuXG5leHBvcnRzLmRlZmluZUxhenlQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcE5hbWUsIGdldHRlckZuKSB7XG4gIHZhciBtZW1vO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wTmFtZSwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIW1lbW8pIHtcbiAgICAgICAgbWVtbyA9IGdldHRlckZuLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0cy5jbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xuICBpZiAob2JqKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgb2JqKTtcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBleHRlbmQ7XG5cbmV4cG9ydHMucmVwZWF0Rm4gPSBmdW5jdGlvbihmbiwgbikge1xuICB2YXIgYXJyID0gW107XG4gIHdoaWxlIChuLS0gPiAwKSB7XG4gICAgYXJyLnB1c2goZm4oKSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbmV4cG9ydHMucmVwZWF0U3RyID0gZnVuY3Rpb24oc3RyLCBuKSB7XG4gIHJldHVybiBuZXcgQXJyYXkobiArIDEpLmpvaW4oc3RyKTtcbn07XG5cbmV4cG9ydHMucmVwZWF0ID0gZnVuY3Rpb24oeCwgbikge1xuICByZXR1cm4gZXhwb3J0cy5yZXBlYXRGbihmdW5jdGlvbigpIHsgcmV0dXJuIHg7IH0sIG4pO1xufTtcblxuZXhwb3J0cy5nZXREdXBsaWNhdGVzID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgdmFyIGR1cGxpY2F0ZXMgPSBbXTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJyYXkubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB4ID0gYXJyYXlbaWR4XTtcbiAgICBpZiAoYXJyYXkubGFzdEluZGV4T2YoeCkgIT09IGlkeCAmJiBkdXBsaWNhdGVzLmluZGV4T2YoeCkgPCAwKSB7XG4gICAgICBkdXBsaWNhdGVzLnB1c2goeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkdXBsaWNhdGVzO1xufTtcblxuZXhwb3J0cy5jb3B5V2l0aG91dER1cGxpY2F0ZXMgPSBmdW5jdGlvbihhcnJheSkge1xuICB2YXIgbm9EdXBsaWNhdGVzID0gW107XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICBpZiAobm9EdXBsaWNhdGVzLmluZGV4T2YoZW50cnkpIDwgMCkge1xuICAgICAgbm9EdXBsaWNhdGVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBub0R1cGxpY2F0ZXM7XG59O1xuXG5leHBvcnRzLmlzU3ludGFjdGljID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdmFyIGZpcnN0Q2hhciA9IHJ1bGVOYW1lWzBdO1xuICByZXR1cm4gZmlyc3RDaGFyID09PSBmaXJzdENoYXIudG9VcHBlckNhc2UoKTtcbn07XG5cbmV4cG9ydHMuaXNMZXhpY2FsID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgcmV0dXJuICFleHBvcnRzLmlzU3ludGFjdGljKHJ1bGVOYW1lKTtcbn07XG5cbmV4cG9ydHMucGFkTGVmdCA9IGZ1bmN0aW9uKHN0ciwgbGVuLCBvcHRDaGFyKSB7XG4gIHZhciBjaCA9IG9wdENoYXIgfHwgJyAnO1xuICBpZiAoc3RyLmxlbmd0aCA8IGxlbikge1xuICAgIHJldHVybiBleHBvcnRzLnJlcGVhdFN0cihjaCwgbGVuIC0gc3RyLmxlbmd0aCkgKyBzdHI7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8vIFN0cmluZ0J1ZmZlclxuXG5leHBvcnRzLlN0cmluZ0J1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0cmluZ3MgPSBbXTtcbn07XG5cbmV4cG9ydHMuU3RyaW5nQnVmZmVyLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihzdHIpIHtcbiAgdGhpcy5zdHJpbmdzLnB1c2goc3RyKTtcbn07XG5cbmV4cG9ydHMuU3RyaW5nQnVmZmVyLnByb3RvdHlwZS5jb250ZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHJpbmdzLmpvaW4oJycpO1xufTtcblxuLy8gQ2hhcmFjdGVyIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nXG5cbmV4cG9ydHMuZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKGMsIG9wdERlbGltKSB7XG4gIHZhciBjaGFyQ29kZSA9IGMuY2hhckNvZGVBdCgwKTtcbiAgaWYgKChjID09PSAnXCInIHx8IGMgPT09IFwiJ1wiKSAmJiBvcHREZWxpbSAmJiBjICE9PSBvcHREZWxpbSkge1xuICAgIHJldHVybiBjO1xuICB9IGVsc2UgaWYgKGNoYXJDb2RlIDwgMTI4KSB7XG4gICAgcmV0dXJuIGVzY2FwZVN0cmluZ0ZvcltjaGFyQ29kZV07XG4gIH0gZWxzZSBpZiAoMTI4IDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDwgMjU2KSB7XG4gICAgcmV0dXJuICdcXFxceCcgKyBleHBvcnRzLnBhZExlZnQoY2hhckNvZGUudG9TdHJpbmcoMTYpLCAyLCAnMCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnXFxcXHUnICsgZXhwb3J0cy5wYWRMZWZ0KGNoYXJDb2RlLnRvU3RyaW5nKDE2KSwgNCwgJzAnKTtcbiAgfVxufTtcblxuZXhwb3J0cy51bmVzY2FwZUNoYXIgPSBmdW5jdGlvbihzKSB7XG4gIGlmIChzLmNoYXJBdCgwKSA9PT0gJ1xcXFwnKSB7XG4gICAgc3dpdGNoIChzLmNoYXJBdCgxKSkge1xuICAgICAgY2FzZSAnYic6IHJldHVybiAnXFxiJztcbiAgICAgIGNhc2UgJ2YnOiByZXR1cm4gJ1xcZic7XG4gICAgICBjYXNlICduJzogcmV0dXJuICdcXG4nO1xuICAgICAgY2FzZSAncic6IHJldHVybiAnXFxyJztcbiAgICAgIGNhc2UgJ3QnOiByZXR1cm4gJ1xcdCc7XG4gICAgICBjYXNlICd2JzogcmV0dXJuICdcXHYnO1xuICAgICAgY2FzZSAneCc6IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc3Vic3RyaW5nKDIsIDQpLCAxNikpO1xuICAgICAgY2FzZSAndSc6IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc3Vic3RyaW5nKDIsIDYpLCAxNikpO1xuICAgICAgZGVmYXVsdDogICByZXR1cm4gcy5jaGFyQXQoMSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgZm9yIHByb2R1Y2luZyBhIGRlc2NyaXB0aW9uIG9mIGFuIHVua25vd24gb2JqZWN0IGluIGEgc2FmZSB3YXkuXG4vLyBFc3BlY2lhbGx5IHVzZWZ1bCBmb3IgZXJyb3IgbWVzc2FnZXMgd2hlcmUgYW4gdW5leHBlY3RlZCB0eXBlIG9mIG9iamVjdCB3YXMgZW5jb3VudGVyZWQuXG5leHBvcnRzLnVuZXhwZWN0ZWRPYmpUb1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICBpZiAob2JqID09IG51bGwpIHtcbiAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gIH1cbiAgdmFyIGJhc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICB0cnkge1xuICAgIHZhciB0eXBlTmFtZTtcbiAgICBpZiAob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICB0eXBlTmFtZSA9IG9iai5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIH0gZWxzZSBpZiAoYmFzZVRvU3RyaW5nLmluZGV4T2YoJ1tvYmplY3QgJykgPT09IDApIHtcbiAgICAgIHR5cGVOYW1lID0gYmFzZVRvU3RyaW5nLnNsaWNlKDgsIC0xKTsgIC8vIEV4dHJhY3QgZS5nLiBcIkFycmF5XCIgZnJvbSBcIltvYmplY3QgQXJyYXldXCIuXG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGVOYW1lID0gdHlwZW9mIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVOYW1lICsgJzogJyArIEpTT04uc3RyaW5naWZ5KFN0cmluZyhvYmopKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBiYXNlVG9TdHJpbmc7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgnLi9OYW1lc3BhY2UnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIG9wdEludGVydmFsKSB7XG4gIHZhciBlO1xuICBpZiAob3B0SW50ZXJ2YWwpIHtcbiAgICBlID0gbmV3IEVycm9yKG9wdEludGVydmFsLmdldExpbmVBbmRDb2x1bW5NZXNzYWdlKCkgKyBtZXNzYWdlKTtcbiAgICBlLnNob3J0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgZS5pbnRlcnZhbCA9IG9wdEludGVydmFsO1xuICB9IGVsc2Uge1xuICAgIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGVycm9ycyBhYm91dCBpbnRlcnZhbHMgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXCJJbnRlcnZhbCBzb3VyY2VzIGRvbid0IG1hdGNoXCIpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBlcnJvcnMgYWJvdXQgZ3JhbW1hcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR3JhbW1hciBzeW50YXggZXJyb3JcblxuZnVuY3Rpb24gZ3JhbW1hclN5bnRheEVycm9yKG1hdGNoRmFpbHVyZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcigpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ21lc3NhZ2UnLCB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1hdGNoRmFpbHVyZS5tZXNzYWdlOyB9fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnc2hvcnRNZXNzYWdlJywge2dldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICdFeHBlY3RlZCAnICsgbWF0Y2hGYWlsdXJlLmdldEV4cGVjdGVkVGV4dCgpO1xuICB9fSk7XG4gIGUuaW50ZXJ2YWwgPSBtYXRjaEZhaWx1cmUuZ2V0SW50ZXJ2YWwoKTtcbiAgcmV0dXJuIGU7XG59XG5cbi8vIFVuZGVjbGFyZWQgZ3JhbW1hclxuXG5mdW5jdGlvbiB1bmRlY2xhcmVkR3JhbW1hcihncmFtbWFyTmFtZSwgbmFtZXNwYWNlLCBpbnRlcnZhbCkge1xuICB2YXIgbWVzc2FnZSA9IG5hbWVzcGFjZSA/XG4gICAgICAnR3JhbW1hciAnICsgZ3JhbW1hck5hbWUgKyAnIGlzIG5vdCBkZWNsYXJlZCBpbiBuYW1lc3BhY2UgJyArIE5hbWVzcGFjZS50b1N0cmluZyhuYW1lc3BhY2UpIDpcbiAgICAgICdVbmRlY2xhcmVkIGdyYW1tYXIgJyArIGdyYW1tYXJOYW1lO1xuICByZXR1cm4gY3JlYXRlRXJyb3IobWVzc2FnZSwgaW50ZXJ2YWwpO1xufVxuXG4vLyBEdXBsaWNhdGUgZ3JhbW1hciBkZWNsYXJhdGlvblxuXG5mdW5jdGlvbiBkdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24oZ3JhbW1hciwgbmFtZXNwYWNlKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcignR3JhbW1hciAnICsgZ3JhbW1hci5uYW1lICsgJyBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIHRoaXMgbmFtZXNwYWNlJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIHJ1bGVzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFVuZGVjbGFyZWQgcnVsZVxuXG5mdW5jdGlvbiB1bmRlY2xhcmVkUnVsZShydWxlTmFtZSwgZ3JhbW1hck5hbWUsIG9wdEludGVydmFsKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdSdWxlICcgKyBydWxlTmFtZSArICcgaXMgbm90IGRlY2xhcmVkIGluIGdyYW1tYXIgJyArIGdyYW1tYXJOYW1lLFxuICAgICAgb3B0SW50ZXJ2YWwpO1xufVxuXG4vLyBDYW5ub3Qgb3ZlcnJpZGUgdW5kZWNsYXJlZCBydWxlXG5cbmZ1bmN0aW9uIGNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGUocnVsZU5hbWUsIGdyYW1tYXJOYW1lLCBib2R5KSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdDYW5ub3Qgb3ZlcnJpZGUgcnVsZSAnICsgcnVsZU5hbWUgKyAnIGJlY2F1c2UgaXQgaXMgbm90IGRlY2xhcmVkIGluICcgKyBncmFtbWFyTmFtZSxcbiAgICAgIGJvZHkuZGVmaW5pdGlvbkludGVydmFsKTtcbn1cblxuLy8gQ2Fubm90IGV4dGVuZCB1bmRlY2xhcmVkIHJ1bGVcblxuZnVuY3Rpb24gY2Fubm90RXh0ZW5kVW5kZWNsYXJlZFJ1bGUocnVsZU5hbWUsIGdyYW1tYXJOYW1lLCBib2R5KSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdDYW5ub3QgZXh0ZW5kIHJ1bGUgJyArIHJ1bGVOYW1lICsgJyBiZWNhdXNlIGl0IGlzIG5vdCBkZWNsYXJlZCBpbiAnICsgZ3JhbW1hck5hbWUsXG4gICAgICBib2R5LmRlZmluaXRpb25JbnRlcnZhbCk7XG59XG5cbi8vIER1cGxpY2F0ZSBydWxlIGRlY2xhcmF0aW9uXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihydWxlTmFtZSwgb2ZmZW5kaW5nR3JhbW1hck5hbWUsIGRlY2xHcmFtbWFyTmFtZSwgYm9keSkge1xuICB2YXIgbWVzc2FnZSA9IFwiRHVwbGljYXRlIGRlY2xhcmF0aW9uIGZvciBydWxlICdcIiArIHJ1bGVOYW1lICtcbiAgICAgIFwiJyBpbiBncmFtbWFyICdcIiArIG9mZmVuZGluZ0dyYW1tYXJOYW1lICsgXCInXCI7XG4gIGlmIChvZmZlbmRpbmdHcmFtbWFyTmFtZSAhPT0gZGVjbEdyYW1tYXJOYW1lKSB7XG4gICAgbWVzc2FnZSArPSBcIiAob3JpZ2luYWxseSBkZWNsYXJlZCBpbiAnXCIgKyBkZWNsR3JhbW1hck5hbWUgKyBcIicpXCI7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGJvZHkuZGVmaW5pdGlvbkludGVydmFsKTtcbn1cblxuLy8gV3JvbmcgbnVtYmVyIG9mIHBhcmFtZXRlcnNcblxuZnVuY3Rpb24gd3JvbmdOdW1iZXJPZlBhcmFtZXRlcnMocnVsZU5hbWUsIGV4cGVjdGVkLCBhY3R1YWwsIGJvZHkpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ1dyb25nIG51bWJlciBvZiBwYXJhbWV0ZXJzIGZvciBydWxlICcgKyBydWxlTmFtZSArXG4gICAgICAgICAgJyAoZXhwZWN0ZWQgJyArIGV4cGVjdGVkICsgJywgZ290ICcgKyBhY3R1YWwgKyAnKScsXG4gICAgICBib2R5ICYmIGJvZHkuZGVmaW5pdGlvbkludGVydmFsKTtcbn1cblxuLy8gV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50c1xuXG5mdW5jdGlvbiB3cm9uZ051bWJlck9mQXJndW1lbnRzKHJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsLCBleHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIGZvciBydWxlICcgKyBydWxlTmFtZSArXG4gICAgICAgICAgJyAoZXhwZWN0ZWQgJyArIGV4cGVjdGVkICsgJywgZ290ICcgKyBhY3R1YWwgKyAnKScsXG4gICAgICBleHByLmludGVydmFsKTtcbn1cblxuLy8gRHVwbGljYXRlIHBhcmFtZXRlciBuYW1lc1xuXG5mdW5jdGlvbiBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcyhydWxlTmFtZSwgZHVwbGljYXRlcywgYm9keSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnRHVwbGljYXRlIHBhcmFtZXRlciBuYW1lcyBpbiBydWxlICcgKyBydWxlTmFtZSArICc6ICcgKyBkdXBsaWNhdGVzLmpvaW4oJywnKSxcbiAgICAgIGJvZHkuZGVmaW5pdGlvbkludGVydmFsKTtcbn1cblxuLy8gSW52YWxpZCBwYXJhbWV0ZXIgZXhwcmVzc2lvblxuXG5mdW5jdGlvbiBpbnZhbGlkUGFyYW1ldGVyKHJ1bGVOYW1lLCBleHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdJbnZhbGlkIHBhcmFtZXRlciB0byBydWxlICcgKyBydWxlTmFtZSArICc6ICcgKyBleHByICsgJyBoYXMgYXJpdHkgJyArIGV4cHIuZ2V0QXJpdHkoKSArXG4gICAgICAgICAgJywgYnV0IHBhcmFtZXRlciBleHByZXNzaW9ucyAnICsgJ211c3QgaGF2ZSBhcml0eSAxJyxcbiAgICAgIGV4cHIuaW50ZXJ2YWwpO1xufVxuXG4vLyBBcHBsaWNhdGlvbiBvZiBzeW50YWN0aWMgcnVsZSBmcm9tIGxleGljYWwgcnVsZVxuXG5mdW5jdGlvbiBhcHBsaWNhdGlvbk9mU3ludGFjdGljUnVsZUZyb21MZXhpY2FsQ29udGV4dChydWxlTmFtZSwgYXBwbHlFeHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdDYW5ub3QgYXBwbHkgc3ludGFjdGljIHJ1bGUgJyArIHJ1bGVOYW1lICsgJyBmcm9tIGhlcmUgKGluc2lkZSBhIGxleGljYWwgY29udGV4dCknLFxuICAgICAgYXBwbHlFeHByLmludGVydmFsKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gS2xlZW5lIG9wZXJhdG9ycyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBrbGVlbmVFeHBySGFzTnVsbGFibGVPcGVyYW5kKGtsZWVuZUV4cHIpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ051bGxhYmxlIGV4cHJlc3Npb24gJyArIGtsZWVuZUV4cHIuZXhwci5pbnRlcnZhbC5jb250ZW50cyArIFwiIGlzIG5vdCBhbGxvd2VkIGluc2lkZSAnXCIgK1xuICAgICAgICAgIGtsZWVuZUV4cHIub3BlcmF0b3IgKyBcIicgKHBvc3NpYmxlIGluZmluaXRlIGxvb3ApXCIsXG4gICAgICBrbGVlbmVFeHByLmV4cHIuaW50ZXJ2YWwpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBhcml0eSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBpbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgZXhwcikge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnUnVsZSAnICsgcnVsZU5hbWUgKyAnIGludm9sdmVzIGFuIGFsdGVybmF0aW9uIHdoaWNoIGhhcyBpbmNvbnNpc3RlbnQgYXJpdHkgJyArXG4gICAgICAgICAgJyhleHBlY3RlZCAnICsgZXhwZWN0ZWQgKyAnLCBnb3QgJyArIGFjdHVhbCArICcpJyxcbiAgICAgIGV4cHIuaW50ZXJ2YWwpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBwcm9wZXJ0aWVzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZVByb3BlcnR5TmFtZXMoZHVwbGljYXRlcykge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoJ09iamVjdCBwYXR0ZXJuIGhhcyBkdXBsaWNhdGUgcHJvcGVydHkgbmFtZXM6ICcgKyBkdXBsaWNhdGVzLmpvaW4oJywgJykpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBjb25zdHJ1Y3RvcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gaW52YWxpZENvbnN0cnVjdG9yQ2FsbChncmFtbWFyLCBjdG9yTmFtZSwgY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0F0dGVtcHQgdG8gaW52b2tlIGNvbnN0cnVjdG9yICcgKyBjdG9yTmFtZSArICcgd2l0aCBpbnZhbGlkIG9yIHVuZXhwZWN0ZWQgYXJndW1lbnRzJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGNvbnZlbmllbmNlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIG11bHRpcGxlRXJyb3JzKGVycm9ycykge1xuICB2YXIgbWVzc2FnZXMgPSBlcnJvcnMubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUubWVzc2FnZTsgfSk7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgIFsnRXJyb3JzOiddLmNvbmNhdChtZXNzYWdlcykuam9pbignXFxuLSAnKSxcbiAgICAgIGVycm9yc1swXS5pbnRlcnZhbCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXBwbGljYXRpb25PZlN5bnRhY3RpY1J1bGVGcm9tTGV4aWNhbENvbnRleHQ6IGFwcGxpY2F0aW9uT2ZTeW50YWN0aWNSdWxlRnJvbUxleGljYWxDb250ZXh0LFxuICBjYW5ub3RFeHRlbmRVbmRlY2xhcmVkUnVsZTogY2Fubm90RXh0ZW5kVW5kZWNsYXJlZFJ1bGUsXG4gIGNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGU6IGNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGUsXG4gIGR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbjogZHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uLFxuICBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lczogZHVwbGljYXRlUGFyYW1ldGVyTmFtZXMsXG4gIGR1cGxpY2F0ZVByb3BlcnR5TmFtZXM6IGR1cGxpY2F0ZVByb3BlcnR5TmFtZXMsXG4gIGR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbjogZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uLFxuICBpbmNvbnNpc3RlbnRBcml0eTogaW5jb25zaXN0ZW50QXJpdHksXG4gIGludGVydmFsU291cmNlc0RvbnRNYXRjaDogaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoLFxuICBpbnZhbGlkQ29uc3RydWN0b3JDYWxsOiBpbnZhbGlkQ29uc3RydWN0b3JDYWxsLFxuICBpbnZhbGlkUGFyYW1ldGVyOiBpbnZhbGlkUGFyYW1ldGVyLFxuICBncmFtbWFyU3ludGF4RXJyb3I6IGdyYW1tYXJTeW50YXhFcnJvcixcbiAga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZDoga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZCxcbiAgdW5kZWNsYXJlZEdyYW1tYXI6IHVuZGVjbGFyZWRHcmFtbWFyLFxuICB1bmRlY2xhcmVkUnVsZTogdW5kZWNsYXJlZFJ1bGUsXG4gIHdyb25nTnVtYmVyT2ZBcmd1bWVudHM6IHdyb25nTnVtYmVyT2ZBcmd1bWVudHMsXG4gIHdyb25nTnVtYmVyT2ZQYXJhbWV0ZXJzOiB3cm9uZ051bWJlck9mUGFyYW1ldGVycyxcblxuICB0aHJvd0Vycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICB9XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBtdWx0aXBsZUVycm9ycyhlcnJvcnMpO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qIGdsb2JhbCBkb2N1bWVudCwgWE1MSHR0cFJlcXVlc3QgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEJ1aWxkZXIgPSByZXF1aXJlKCcuL0J1aWxkZXInKTtcbnZhciBHcmFtbWFyID0gcmVxdWlyZSgnLi9HcmFtbWFyJyk7XG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgnLi9OYW1lc3BhY2UnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVGhlIG1ldGFncmFtbWFyLCBpLmUuIHRoZSBncmFtbWFyIGZvciBPaG0gZ3JhbW1hcnMuIEluaXRpYWxpemVkIGF0IHRoZVxuLy8gYm90dG9tIG9mIHRoaXMgZmlsZSBiZWNhdXNlIGxvYWRpbmcgdGhlIGdyYW1tYXIgcmVxdWlyZXMgT2htIGl0c2VsZi5cbnZhciBvaG1HcmFtbWFyO1xuXG4vLyBBbiBvYmplY3Qgd2hpY2ggbWFrZXMgaXQgcG9zc2libGUgdG8gc3R1YiBvdXQgdGhlIGRvY3VtZW50IEFQSSBmb3IgdGVzdGluZy5cbnZhciBkb2N1bWVudEludGVyZmFjZSA9IHtcbiAgcXVlcnlTZWxlY3RvcjogZnVuY3Rpb24oc2VsKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpOyB9XG59O1xuXG4vLyBDaGVjayBpZiBgb2JqYCBpcyBhIERPTSBlbGVtZW50LlxuZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xuICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICByZXR1cm4gb2JqID09PSB2b2lkIDA7XG59XG5cbnZhciBNQVhfQVJSQVlfSU5ERVggPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZShvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICByZXR1cm4gdHlwZW9mIGxlbmd0aCA9PT0gJ251bWJlcicgJiYgbGVuZ3RoID49IDAgJiYgbGVuZ3RoIDw9IE1BWF9BUlJBWV9JTkRFWDtcbn1cblxuLy8gVE9ETzoganVzdCB1c2UgdGhlIGpRdWVyeSB0aGluZ1xuZnVuY3Rpb24gbG9hZCh1cmwpIHtcbiAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXEub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG4gIHRyeSB7XG4gICAgcmVxLnNlbmQoKTtcbiAgICBpZiAocmVxLnN0YXR1cyA9PT0gMCB8fCByZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJldHVybiByZXEucmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cbiAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gbG9hZCB1cmwgJyArIHVybCk7XG59XG5cbi8vIFJldHVybnMgYSBHcmFtbWFyIGluc3RhbmNlIChpLmUuLCBhbiBvYmplY3Qgd2l0aCBhIGBtYXRjaGAgbWV0aG9kKSBmb3Jcbi8vIGB0cmVlYCwgd2hpY2ggaXMgdGhlIGNvbmNyZXRlIHN5bnRheCB0cmVlIG9mIGEgdXNlci13cml0dGVuIGdyYW1tYXIuXG4vLyBUaGUgZ3JhbW1hciB3aWxsIGJlIGFzc2lnbmVkIGludG8gYG5hbWVzcGFjZWAgdW5kZXIgdGhlIG5hbWUgb2YgdGhlIGdyYW1tYXJcbi8vIGFzIHNwZWNpZmllZCBpbiB0aGUgc291cmNlLlxuZnVuY3Rpb24gYnVpbGRHcmFtbWFyKG1hdGNoLCBuYW1lc3BhY2UsIG9wdE9obUdyYW1tYXJGb3JUZXN0aW5nKSB7XG4gIHZhciBidWlsZGVyID0gbmV3IEJ1aWxkZXIoKTtcbiAgdmFyIGRlY2w7XG4gIHZhciBjdXJyZW50UnVsZU5hbWU7XG4gIHZhciBjdXJyZW50UnVsZUZvcm1hbHM7XG4gIHZhciBvdmVycmlkaW5nID0gZmFsc2U7XG4gIHZhciBtZXRhR3JhbW1hciA9IG9wdE9obUdyYW1tYXJGb3JUZXN0aW5nIHx8IG9obUdyYW1tYXI7XG5cbiAgLy8gQSB2aXNpdG9yIHRoYXQgcHJvZHVjZXMgYSBHcmFtbWFyIGluc3RhbmNlIGZyb20gdGhlIENTVC5cbiAgdmFyIGhlbHBlcnMgPSBtZXRhR3JhbW1hci5zZW1hbnRpY3MoKS5hZGRPcGVyYXRpb24oJ3Zpc2l0Jywge1xuICAgIEdyYW1tYXI6IGZ1bmN0aW9uKG4sIHMsIG9wZW4sIHJzLCBjbG9zZSkge1xuICAgICAgdmFyIGdyYW1tYXJOYW1lID0gbi52aXNpdCgpO1xuICAgICAgZGVjbCA9IGJ1aWxkZXIubmV3R3JhbW1hcihncmFtbWFyTmFtZSwgbmFtZXNwYWNlKTtcbiAgICAgIHMudmlzaXQoKTtcbiAgICAgIHJzLnZpc2l0KCk7XG4gICAgICB2YXIgZyA9IGRlY2wuYnVpbGQoKTtcbiAgICAgIGcuZGVmaW5pdGlvbkludGVydmFsID0gdGhpcy5pbnRlcnZhbC50cmltbWVkKCk7XG4gICAgICBpZiAoZ3JhbW1hck5hbWUgaW4gbmFtZXNwYWNlKSB7XG4gICAgICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24oZywgbmFtZXNwYWNlKTtcbiAgICAgIH1cbiAgICAgIG5hbWVzcGFjZVtncmFtbWFyTmFtZV0gPSBnO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSxcblxuICAgIFN1cGVyR3JhbW1hcjogZnVuY3Rpb24oXywgbikge1xuICAgICAgdmFyIHN1cGVyR3JhbW1hck5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBpZiAoc3VwZXJHcmFtbWFyTmFtZSA9PT0gJ251bGwnKSB7XG4gICAgICAgIGRlY2wud2l0aFN1cGVyR3JhbW1hcihudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghbmFtZXNwYWNlIHx8ICEoc3VwZXJHcmFtbWFyTmFtZSBpbiBuYW1lc3BhY2UpKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3JzLnVuZGVjbGFyZWRHcmFtbWFyKHN1cGVyR3JhbW1hck5hbWUsIG5hbWVzcGFjZSwgbi5pbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVjbC53aXRoU3VwZXJHcmFtbWFyKG5hbWVzcGFjZVtzdXBlckdyYW1tYXJOYW1lXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIFJ1bGVfZGVmaW5lOiBmdW5jdGlvbihuLCBmcywgZCwgXywgYikge1xuICAgICAgY3VycmVudFJ1bGVOYW1lID0gbi52aXNpdCgpO1xuICAgICAgY3VycmVudFJ1bGVGb3JtYWxzID0gZnMudmlzaXQoKVswXSB8fCBbXTtcbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGRlZmF1bHQgc3RhcnQgcnVsZSB5ZXQsIHNldCBpdCBub3cuIFRoaXMgbXVzdCBiZSBkb25lIGJlZm9yZSB2aXNpdGluZ1xuICAgICAgLy8gdGhlIGJvZHksIGJlY2F1c2UgaXQgbWlnaHQgY29udGFpbiBhbiBpbmxpbmUgcnVsZSBkZWZpbml0aW9uLlxuICAgICAgaWYgKCFkZWNsLmRlZmF1bHRTdGFydFJ1bGUgJiYgZGVjbC5lbnN1cmVTdXBlckdyYW1tYXIoKSAhPT0gR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcykge1xuICAgICAgICBkZWNsLndpdGhEZWZhdWx0U3RhcnRSdWxlKGN1cnJlbnRSdWxlTmFtZSk7XG4gICAgICB9XG4gICAgICB2YXIgYm9keSA9IGIudmlzaXQoKTtcbiAgICAgIGJvZHkuZGVmaW5pdGlvbkludGVydmFsID0gdGhpcy5pbnRlcnZhbC50cmltbWVkKCk7XG4gICAgICB2YXIgZGVzY3JpcHRpb24gPSBkLnZpc2l0KClbMF07XG4gICAgICByZXR1cm4gZGVjbC5kZWZpbmUoY3VycmVudFJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uKTtcbiAgICB9LFxuICAgIFJ1bGVfb3ZlcnJpZGU6IGZ1bmN0aW9uKG4sIGZzLCBfLCBiKSB7XG4gICAgICBjdXJyZW50UnVsZU5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBjdXJyZW50UnVsZUZvcm1hbHMgPSBmcy52aXNpdCgpWzBdIHx8IFtdO1xuICAgICAgb3ZlcnJpZGluZyA9IHRydWU7XG4gICAgICB2YXIgYm9keSA9IGIudmlzaXQoKTtcbiAgICAgIGJvZHkuZGVmaW5pdGlvbkludGVydmFsID0gdGhpcy5pbnRlcnZhbC50cmltbWVkKCk7XG4gICAgICB2YXIgYW5zID0gZGVjbC5vdmVycmlkZShjdXJyZW50UnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSk7XG4gICAgICBvdmVycmlkaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gYW5zO1xuICAgIH0sXG4gICAgUnVsZV9leHRlbmQ6IGZ1bmN0aW9uKG4sIGZzLCBfLCBiKSB7XG4gICAgICBjdXJyZW50UnVsZU5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBjdXJyZW50UnVsZUZvcm1hbHMgPSBmcy52aXNpdCgpWzBdIHx8IFtdO1xuICAgICAgdmFyIGJvZHkgPSBiLnZpc2l0KCk7XG4gICAgICB2YXIgYW5zID0gZGVjbC5leHRlbmQoY3VycmVudFJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHkpO1xuICAgICAgZGVjbC5ydWxlQm9kaWVzW2N1cnJlbnRSdWxlTmFtZV0uZGVmaW5pdGlvbkludGVydmFsID0gdGhpcy5pbnRlcnZhbC50cmltbWVkKCk7XG4gICAgICByZXR1cm4gYW5zO1xuICAgIH0sXG4gICAgUnVsZUJvZHk6IGZ1bmN0aW9uKF8sIHRlcm1zKSB7XG4gICAgICB2YXIgYXJncyA9IHRlcm1zLnZpc2l0KCk7XG4gICAgICByZXR1cm4gYnVpbGRlci5hbHQuYXBwbHkoYnVpbGRlciwgYXJncykud2l0aEludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG5cbiAgICBGb3JtYWxzOiBmdW5jdGlvbihvcG9pbnR5LCBmcywgY3BvaW50eSkge1xuICAgICAgcmV0dXJuIGZzLnZpc2l0KCk7XG4gICAgfSxcblxuICAgIFBhcmFtczogZnVuY3Rpb24ob3BvaW50eSwgcHMsIGNwb2ludHkpIHtcbiAgICAgIHJldHVybiBwcy52aXNpdCgpO1xuICAgIH0sXG5cbiAgICBBbHQ6IGZ1bmN0aW9uKHNlcXMpIHtcbiAgICAgIHZhciBhcmdzID0gc2Vxcy52aXNpdCgpO1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYWx0LmFwcGx5KGJ1aWxkZXIsIGFyZ3MpLndpdGhJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9LFxuXG4gICAgVG9wTGV2ZWxUZXJtX2lubGluZTogZnVuY3Rpb24oYiwgbikge1xuICAgICAgdmFyIGlubGluZVJ1bGVOYW1lID0gY3VycmVudFJ1bGVOYW1lICsgJ18nICsgbi52aXNpdCgpO1xuICAgICAgdmFyIGJvZHkgPSBiLnZpc2l0KCk7XG4gICAgICBib2R5LmRlZmluaXRpb25JbnRlcnZhbCA9IHRoaXMuaW50ZXJ2YWwudHJpbW1lZCgpO1xuICAgICAgdmFyIGlzTmV3UnVsZURlY2xhcmF0aW9uID1cbiAgICAgICAgICAhKGRlY2wuc3VwZXJHcmFtbWFyICYmIGRlY2wuc3VwZXJHcmFtbWFyLnJ1bGVCb2RpZXNbaW5saW5lUnVsZU5hbWVdKTtcbiAgICAgIGlmIChvdmVycmlkaW5nICYmICFpc05ld1J1bGVEZWNsYXJhdGlvbikge1xuICAgICAgICBkZWNsLm92ZXJyaWRlKGlubGluZVJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVjbC5kZWZpbmUoaW5saW5lUnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSk7XG4gICAgICB9XG4gICAgICB2YXIgcGFyYW1zID0gY3VycmVudFJ1bGVGb3JtYWxzLm1hcChmdW5jdGlvbihmb3JtYWwpIHsgcmV0dXJuIGJ1aWxkZXIuYXBwKGZvcm1hbCk7IH0pO1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYXBwKGlubGluZVJ1bGVOYW1lLCBwYXJhbXMpLndpdGhJbnRlcnZhbChib2R5LmludGVydmFsKTtcbiAgICB9LFxuXG4gICAgU2VxOiBmdW5jdGlvbihleHByKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5zZXEuYXBwbHkoYnVpbGRlciwgZXhwci52aXNpdCgpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIEl0ZXJfc3RhcjogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuc3Rhcih4LnZpc2l0KCkpLndpdGhJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9LFxuICAgIEl0ZXJfcGx1czogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIucGx1cyh4LnZpc2l0KCkpLndpdGhJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9LFxuICAgIEl0ZXJfb3B0OiBmdW5jdGlvbih4LCBfKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5vcHQoeC52aXNpdCgpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIFByZWRfbm90OiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5ub3QoeC52aXNpdCgpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcbiAgICBQcmVkX2xvb2thaGVhZDogZnVuY3Rpb24oXywgeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubG9va2FoZWFkKHgudmlzaXQoKSkud2l0aEludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG5cbiAgICBMZXhfbGV4OiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5sZXgoeC52aXNpdCgpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIEJhc2VfYXBwbGljYXRpb246IGZ1bmN0aW9uKHJ1bGUsIHBzKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5hcHAocnVsZS52aXNpdCgpLCBwcy52aXNpdCgpWzBdIHx8IFtdKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcbiAgICBCYXNlX3JhbmdlOiBmdW5jdGlvbihmcm9tLCBfLCB0bykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIucmFuZ2UoZnJvbS52aXNpdCgpLCB0by52aXNpdCgpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcbiAgICBCYXNlX3Rlcm1pbmFsOiBmdW5jdGlvbihleHByKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci50ZXJtaW5hbChleHByLnZpc2l0KCkpLndpdGhJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9LFxuICAgIEJhc2VfcGFyZW46IGZ1bmN0aW9uKG9wZW4sIHgsIGNsb3NlKSB7XG4gICAgICByZXR1cm4geC52aXNpdCgpO1xuICAgIH0sXG5cbiAgICBydWxlRGVzY3I6IGZ1bmN0aW9uKG9wZW4sIHQsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gdC52aXNpdCgpO1xuICAgIH0sXG4gICAgcnVsZURlc2NyVGV4dDogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWwuY29udGVudHMudHJpbSgpO1xuICAgIH0sXG5cbiAgICBjYXNlTmFtZTogZnVuY3Rpb24oXywgc3BhY2UxLCBuLCBzcGFjZTIsIGVuZCkge1xuICAgICAgcmV0dXJuIG4udmlzaXQoKTtcbiAgICB9LFxuXG4gICAgbmFtZTogZnVuY3Rpb24oZmlyc3QsIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH0sXG4gICAgbmFtZUZpcnN0OiBmdW5jdGlvbihleHByKSB7fSxcbiAgICBuYW1lUmVzdDogZnVuY3Rpb24oZXhwcikge30sXG5cbiAgICB0ZXJtaW5hbDogZnVuY3Rpb24ob3BlbiwgY3MsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gY3MudmlzaXQoKS5tYXAoZnVuY3Rpb24oYykgeyByZXR1cm4gY29tbW9uLnVuZXNjYXBlQ2hhcihjKTsgfSkuam9pbignJyk7XG4gICAgfSxcblxuICAgIHRlcm1pbmFsQ2hhcjogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWwuY29udGVudHM7XG4gICAgfSxcblxuICAgIGVzY2FwZUNoYXI6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH0sXG5cbiAgICBOb25lbXB0eUxpc3RPZjogZnVuY3Rpb24oeCwgXywgeHMpIHtcbiAgICAgIHJldHVybiBbeC52aXNpdCgpXS5jb25jYXQoeHMudmlzaXQoKSk7XG4gICAgfSxcbiAgICBFbXB0eUxpc3RPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcblxuICAgIF90ZXJtaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmltaXRpdmVWYWx1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaGVscGVycyhtYXRjaCkudmlzaXQoKTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZUFuZExvYWQoc291cmNlLCBuYW1lc3BhY2UpIHtcbiAgdmFyIG0gPSBvaG1HcmFtbWFyLm1hdGNoKHNvdXJjZSwgJ0dyYW1tYXJzJyk7XG4gIGlmIChtLmZhaWxlZCgpKSB7XG4gICAgdGhyb3cgZXJyb3JzLmdyYW1tYXJTeW50YXhFcnJvcihtKTtcbiAgfVxuICByZXR1cm4gYnVpbGRHcmFtbWFyKG0sIG5hbWVzcGFjZSk7XG59XG5cbi8vIFJldHVybiB0aGUgY29udGVudHMgb2YgYSBzY3JpcHQgZWxlbWVudCwgZmV0Y2hpbmcgaXQgdmlhIFhIUiBpZiBuZWNlc3NhcnkuXG5mdW5jdGlvbiBnZXRTY3JpcHRFbGVtZW50Q29udGVudHMoZWwpIHtcbiAgaWYgKCFpc0VsZW1lbnQoZWwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBET00gTm9kZSwgZ290ICcgKyBjb21tb24udW5leHBlY3RlZE9ialRvU3RyaW5nKGVsKSk7XG4gIH1cbiAgaWYgKGVsLnR5cGUgIT09ICd0ZXh0L29obS1qcycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc2NyaXB0IHRhZyB3aXRoIHR5cGU9XCJ0ZXh0L29obS1qc1wiLCBnb3QgJyArIGVsKTtcbiAgfVxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSA/IGxvYWQoZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSkgOiBlbC5pbm5lckhUTUw7XG59XG5cbmZ1bmN0aW9uIGdyYW1tYXIoc291cmNlLCBvcHROYW1lc3BhY2UpIHtcbiAgdmFyIG5zID0gZ3JhbW1hcnMoc291cmNlLCBvcHROYW1lc3BhY2UpO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSBzb3VyY2UgY29udGFpbmVkIG5vIG1vcmUgdGhhbiBvbmUgZ3JhbW1hciBkZWZpbml0aW9uLlxuICB2YXIgZ3JhbW1hck5hbWVzID0gT2JqZWN0LmtleXMobnMpO1xuICBpZiAoZ3JhbW1hck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBncmFtbWFyIGRlZmluaXRpb24nKTtcbiAgfSBlbHNlIGlmIChncmFtbWFyTmFtZXMubGVuZ3RoID4gMSkge1xuICAgIHZhciBzZWNvbmRHcmFtbWFyID0gbnNbZ3JhbW1hck5hbWVzWzFdXTtcbiAgICB2YXIgaW50ZXJ2YWwgPSBzZWNvbmRHcmFtbWFyLmRlZmluaXRpb25JbnRlcnZhbDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIHV0aWwuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UoaW50ZXJ2YWwuaW5wdXRTdHJlYW0uc291cmNlLCBpbnRlcnZhbC5zdGFydElkeCkgK1xuICAgICAgICAnRm91bmQgbW9yZSB0aGFuIG9uZSBncmFtbWFyIGRlZmluaXRpb24gLS0gdXNlIG9obS5ncmFtbWFycygpIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIG5zW2dyYW1tYXJOYW1lc1swXV07ICAvLyBSZXR1cm4gdGhlIG9uZSBhbmQgb25seSBncmFtbWFyLlxufVxuXG5mdW5jdGlvbiBncmFtbWFycyhzb3VyY2UsIG9wdE5hbWVzcGFjZSkge1xuICB2YXIgbnMgPSBOYW1lc3BhY2UuZXh0ZW5kKE5hbWVzcGFjZS5hc05hbWVzcGFjZShvcHROYW1lc3BhY2UpKTtcbiAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gRm9yIGNvbnZlbmllbmNlLCBkZXRlY3QgTm9kZS5qcyBCdWZmZXIgb2JqZWN0cyBhbmQgYXV0b21hdGljYWxseSBjYWxsIHRvU3RyaW5nKCkuXG4gICAgaWYgKGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdFeHBlY3RlZCBzdHJpbmcgYXMgZmlyc3QgYXJndW1lbnQsIGdvdCAnICsgY29tbW9uLnVuZXhwZWN0ZWRPYmpUb1N0cmluZyhzb3VyY2UpKTtcbiAgICB9XG4gIH1cbiAgY29tcGlsZUFuZExvYWQoc291cmNlLCBucyk7XG4gIHJldHVybiBucztcbn1cblxuZnVuY3Rpb24gZ3JhbW1hckZyb21TY3JpcHRFbGVtZW50KG9wdE5vZGUpIHtcbiAgdmFyIG5vZGUgPSBvcHROb2RlO1xuICBpZiAoaXNVbmRlZmluZWQobm9kZSkpIHtcbiAgICB2YXIgbm9kZUxpc3QgPSBkb2N1bWVudEludGVyZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb2htLWpzXCJdJyk7XG4gICAgaWYgKG5vZGVMaXN0Lmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdFeHBlY3RlZCBleGFjdGx5IG9uZSBzY3JpcHQgdGFnIHdpdGggdHlwZT1cInRleHQvb2htLWpzXCIsIGZvdW5kICcgKyBub2RlTGlzdC5sZW5ndGgpO1xuICAgIH1cbiAgICBub2RlID0gbm9kZUxpc3RbMF07XG4gIH1cbiAgcmV0dXJuIGdyYW1tYXIoZ2V0U2NyaXB0RWxlbWVudENvbnRlbnRzKG5vZGUpKTtcbn1cblxuZnVuY3Rpb24gZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHMob3B0Tm9kZU9yTm9kZUxpc3QpIHtcbiAgLy8gU2ltcGxlIGNhc2U6IHRoZSBhcmd1bWVudCBpcyBhIERPTSBub2RlLlxuICBpZiAoaXNFbGVtZW50KG9wdE5vZGVPck5vZGVMaXN0KSkge1xuICAgIHJldHVybiBncmFtbWFycyhvcHROb2RlT3JOb2RlTGlzdCk7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCBpdCBtdXN0IGJlIGVpdGhlciB1bmRlZmluZWQgb3IgYSBOb2RlTGlzdC5cbiAgdmFyIG5vZGVMaXN0ID0gb3B0Tm9kZU9yTm9kZUxpc3Q7XG4gIGlmIChpc1VuZGVmaW5lZChub2RlTGlzdCkpIHtcbiAgICAvLyBGaW5kIGFsbCBzY3JpcHQgZWxlbWVudHMgd2l0aCB0eXBlPVwidGV4dC9vaG0tanNcIi5cbiAgICBub2RlTGlzdCA9IGRvY3VtZW50SW50ZXJmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vaG0tanNcIl0nKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZUxpc3QgPT09ICdzdHJpbmcnIHx8ICghaXNFbGVtZW50KG5vZGVMaXN0KSAmJiAhaXNBcnJheUxpa2Uobm9kZUxpc3QpKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgTm9kZSwgTm9kZUxpc3QsIG9yIEFycmF5LCBidXQgZ290ICcgKyBub2RlTGlzdCk7XG4gIH1cbiAgdmFyIG5zID0gTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgLy8gQ29weSB0aGUgbmV3IGdyYW1tYXJzIGludG8gYG5zYCB0byBrZWVwIHRoZSBuYW1lc3BhY2UgZmxhdC5cbiAgICBjb21tb24uZXh0ZW5kKG5zLCBncmFtbWFycyhnZXRTY3JpcHRFbGVtZW50Q29udGVudHMobm9kZUxpc3RbaV0pLCBucykpO1xuICB9XG4gIHJldHVybiBucztcbn1cblxuZnVuY3Rpb24gbWFrZVJlY2lwZShyZWNpcGUpIHtcbiAgaWYgKHR5cGVvZiByZWNpcGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gcmVjaXBlLmNhbGwobmV3IEJ1aWxkZXIoKSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZWNpcGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBzdHJpbmdpZmllZCBKU09OIHJlY2lwZVxuICAgICAgcmVjaXBlID0gSlNPTi5wYXJzZShyZWNpcGUpO1xuICAgIH1cbiAgICByZXR1cm4gKG5ldyBCdWlsZGVyKCkpLmZyb21SZWNpcGUocmVjaXBlKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gU3R1ZmYgdGhhdCB1c2VycyBzaG91bGQga25vdyBhYm91dFxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZU5hbWVzcGFjZTogTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSxcbiAgZ3JhbW1hcjogZ3JhbW1hcixcbiAgZ3JhbW1hcnM6IGdyYW1tYXJzLFxuICBncmFtbWFyRnJvbVNjcmlwdEVsZW1lbnQ6IGdyYW1tYXJGcm9tU2NyaXB0RWxlbWVudCxcbiAgZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHM6IGdyYW1tYXJzRnJvbVNjcmlwdEVsZW1lbnRzLFxuICBtYWtlUmVjaXBlOiBtYWtlUmVjaXBlLFxuICBvaG1HcmFtbWFyOiBudWxsLCAgLy8gSW5pdGlhbGl6ZWQgYmVsb3csIGFmdGVyIEdyYW1tYXIuQnVpbHRJblJ1bGVzLlxuICBwZXhwcnM6IHBleHBycyxcbiAgdXRpbDogdXRpbCxcbiAgZXh0cmFzOiByZXF1aXJlKCcuLi9leHRyYXMnKVxufTtcblxuLy8gU3R1ZmYgZm9yIHRlc3RpbmcsIGV0Yy5cbm1vZHVsZS5leHBvcnRzLl9idWlsZEdyYW1tYXIgPSBidWlsZEdyYW1tYXI7XG5tb2R1bGUuZXhwb3J0cy5fc2V0RG9jdW1lbnRJbnRlcmZhY2VGb3JUZXN0aW5nID0gZnVuY3Rpb24oZG9jKSB7IGRvY3VtZW50SW50ZXJmYWNlID0gZG9jOyB9O1xuXG4vLyBMYXRlIGluaXRpYWxpemF0aW9uIGZvciBzdHVmZiB0aGF0IGlzIGJvb3RzdHJhcHBlZC5cblxuR3JhbW1hci5CdWlsdEluUnVsZXMgPSByZXF1aXJlKCcuLi9kaXN0L2J1aWx0LWluLXJ1bGVzJyk7XG5cbnZhciBTZW1hbnRpY3MgPSByZXF1aXJlKCcuL1NlbWFudGljcycpO1xudmFyIG9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzR3JhbW1hciA9IHJlcXVpcmUoJy4uL2Rpc3Qvb3BlcmF0aW9ucy1hbmQtYXR0cmlidXRlcycpO1xuU2VtYW50aWNzLmluaXRCdWlsdEluU2VtYW50aWNzKEdyYW1tYXIuQnVpbHRJblJ1bGVzKTtcblNlbWFudGljcy5pbml0UHJvdG90eXBlUGFyc2VyKG9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzR3JhbW1hcik7ICAvLyByZXF1aXJlcyBCdWlsdEluU2VtYW50aWNzXG5cbm1vZHVsZS5leHBvcnRzLm9obUdyYW1tYXIgPSBvaG1HcmFtbWFyID0gcmVxdWlyZSgnLi4vZGlzdC9vaG0tZ3JhbW1hcicpO1xuR3JhbW1hci5pbml0QXBwbGljYXRpb25QYXJzZXIob2htR3JhbW1hciwgYnVpbGRHcmFtbWFyKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBOb2RlKGdyYW1tYXIsIGN0b3JOYW1lLCBjaGlsZHJlbiwgaW50ZXJ2YWwpIHtcbiAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgdGhpcy5jdG9yTmFtZSA9IGN0b3JOYW1lO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcbn1cblxuTm9kZS5wcm90b3R5cGUubnVtQ2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xufTtcblxuTm9kZS5wcm90b3R5cGUuY2hpbGRBdCA9IGZ1bmN0aW9uKGlkeCkge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbltpZHhdO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaW5kZXhPZkNoaWxkID0gZnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0aGlzLmNoaWxkcmVuLmluZGV4T2YoYXJnKTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmhhc0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNOb0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5oYXNDaGlsZHJlbigpO1xufTtcblxuTm9kZS5wcm90b3R5cGUub25seUNoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2Nhbm5vdCBnZXQgb25seSBjaGlsZCBvZiBhIG5vZGUgb2YgdHlwZSAnICsgdGhpcy5jdG9yTmFtZSArXG4gICAgICAgICcgKGl0IGhhcyAnICsgdGhpcy5udW1DaGlsZHJlbigpICsgJyBjaGlsZHJlbiknKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdENoaWxkKCk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmZpcnN0Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuaGFzTm9DaGlsZHJlbigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2Fubm90IGdldCBmaXJzdCBjaGlsZCBvZiBhICcgKyB0aGlzLmN0b3JOYW1lICsgJyBub2RlLCB3aGljaCBoYXMgbm8gY2hpbGRyZW4nKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KDApO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5sYXN0Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuaGFzTm9DaGlsZHJlbigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2Fubm90IGdldCBsYXN0IGNoaWxkIG9mIGEgJyArIHRoaXMuY3Rvck5hbWUgKyAnIG5vZGUsIHdoaWNoIGhhcyBubyBjaGlsZHJlbicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQXQodGhpcy5udW1DaGlsZHJlbigpIC0gMSk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmNoaWxkQmVmb3JlID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgdmFyIGNoaWxkSWR4ID0gdGhpcy5pbmRleE9mQ2hpbGQoY2hpbGQpO1xuICBpZiAoY2hpbGRJZHggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmNoaWxkQmVmb3JlKCkgY2FsbGVkIHcvIGFuIGFyZ3VtZW50IHRoYXQgaXMgbm90IGEgY2hpbGQnKTtcbiAgfSBlbHNlIGlmIChjaGlsZElkeCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGdldCBjaGlsZCBiZWZvcmUgZmlyc3QgY2hpbGQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KGNoaWxkSWR4IC0gMSk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmNoaWxkQWZ0ZXIgPSBmdW5jdGlvbihjaGlsZCkge1xuICB2YXIgY2hpbGRJZHggPSB0aGlzLmluZGV4T2ZDaGlsZChjaGlsZCk7XG4gIGlmIChjaGlsZElkeCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUuY2hpbGRBZnRlcigpIGNhbGxlZCB3LyBhbiBhcmd1bWVudCB0aGF0IGlzIG5vdCBhIGNoaWxkJyk7XG4gIH0gZWxzZSBpZiAoY2hpbGRJZHggPT09IHRoaXMubnVtQ2hpbGRyZW4oKSAtIDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBnZXQgY2hpbGQgYWZ0ZXIgbGFzdCBjaGlsZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQXQoY2hpbGRJZHggKyAxKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUuaXNUZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pc05vbnRlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmlzSXRlcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuTm9kZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHZhciByID0ge307XG4gIHJbdGhpcy5jdG9yTmFtZV0gPSB0aGlzLmNoaWxkcmVuO1xuICByZXR1cm4gcjtcbn07XG5cbi8vIFRlcm1pbmFsc1xuXG5mdW5jdGlvbiBUZXJtaW5hbE5vZGUoZ3JhbW1hciwgdmFsdWUsIGludGVydmFsKSB7XG4gIE5vZGUuY2FsbCh0aGlzLCBncmFtbWFyLCAnX3Rlcm1pbmFsJywgW10sIGludGVydmFsKTtcbiAgdGhpcy5wcmltaXRpdmVWYWx1ZSA9IHZhbHVlO1xufVxuaW5oZXJpdHMoVGVybWluYWxOb2RlLCBOb2RlKTtcblxuVGVybWluYWxOb2RlLnByb3RvdHlwZS5pc1Rlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLy8gTm9udGVybWluYWxzXG5cbmZ1bmN0aW9uIE5vbnRlcm1pbmFsTm9kZShncmFtbWFyLCBydWxlTmFtZSwgY2hpbGRyZW4sIGludGVydmFsKSB7XG4gIE5vZGUuY2FsbCh0aGlzLCBncmFtbWFyLCBydWxlTmFtZSwgY2hpbGRyZW4sIGludGVydmFsKTtcbn1cbmluaGVyaXRzKE5vbnRlcm1pbmFsTm9kZSwgTm9kZSk7XG5cbk5vbnRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNOb250ZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbk5vbnRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNMZXhpY2FsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb21tb24uaXNMZXhpY2FsKHRoaXMuY3Rvck5hbWUpO1xufTtcblxuTm9udGVybWluYWxOb2RlLnByb3RvdHlwZS5pc1N5bnRhY3RpYyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gY29tbW9uLmlzU3ludGFjdGljKHRoaXMuY3Rvck5hbWUpO1xufTtcblxuLy8gSXRlcmF0aW9uc1xuXG5mdW5jdGlvbiBJdGVyYXRpb25Ob2RlKGdyYW1tYXIsIGNoaWxkcmVuLCBpbnRlcnZhbCwgb3B0aW9uYWwpIHtcbiAgTm9kZS5jYWxsKHRoaXMsIGdyYW1tYXIsICdfaXRlcicsIGNoaWxkcmVuLCBpbnRlcnZhbCk7XG4gIHRoaXMub3B0aW9uYWwgPSBvcHRpb25hbDtcbn1cbmluaGVyaXRzKEl0ZXJhdGlvbk5vZGUsIE5vZGUpO1xuXG5JdGVyYXRpb25Ob2RlLnByb3RvdHlwZS5pc0l0ZXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkl0ZXJhdGlvbk5vZGUucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9uYWw7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5vZGU6IE5vZGUsXG4gIFRlcm1pbmFsTm9kZTogVGVybWluYWxOb2RlLFxuICBOb250ZXJtaW5hbE5vZGU6IE5vbnRlcm1pbmFsTm9kZSxcbiAgSXRlcmF0aW9uTm9kZTogSXRlcmF0aW9uTm9kZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBSZXR1cm4gdHJ1ZSBpZiB3ZSBzaG91bGQgc2tpcCBzcGFjZXMgcHJlY2VkaW5nIHRoaXMgZXhwcmVzc2lvbiBpbiBhIHN5bnRhY3RpYyBjb250ZXh0LlxuKi9cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ2FsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UnXG4pO1xuXG4vKlxuICBHZW5lcmFsbHksIHRoZXNlIGFyZSBhbGwgZmlyc3Qtb3JkZXIgZXhwcmVzc2lvbnMgdGhhdCBvcGVyYXRlIG9uIHN0cmluZ3MgYW5kICh3aXRoIHRoZVxuICBleGNlcHRpb24gb2YgQXBwbHkpIGRpcmVjdGx5IHJlYWQgZnJvbSB0aGUgaW5wdXQgc3RyZWFtLlxuKi9cbnBleHBycy5hbnkuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuZW5kLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLypcbiAgSGlnaGVyLW9yZGVyIGV4cHJlc3Npb25zIHRoYXQgZG9uJ3QgZGlyZWN0bHkgY29uc3VtZSBpbnB1dCwgYW5kIGV4cHJlc3Npb25zIHRoYXRcbiAgZG9uJ3Qgb3BlcmF0ZSBvbiBzdHJpbmcgaW5wdXQgc3RyZWFtcyAoZS5nLiBPYmogYW5kIEFycikuXG4qL1xucGV4cHJzLkFsdC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuSXRlci5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlNlcS5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGxleGlmeUNvdW50O1xuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgbGV4aWZ5Q291bnQgPSAwO1xuICB0aGlzLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ19hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCdcbik7XG5cbnBleHBycy5hbnkuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5lbmQuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5MZXgucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIGxleGlmeUNvdW50Kys7XG4gIHRoaXMuZXhwci5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICBsZXhpZnlDb3VudC0tO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy50ZXJtc1tpZHhdLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG4gIH1cbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgfVxufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgdGhpcy5leHByLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlQm9kaWVzW3RoaXMucnVsZU5hbWVdO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBydWxlIGV4aXN0cy4uLlxuICBpZiAoIWJvZHkpIHtcbiAgICB0aHJvdyBlcnJvcnMudW5kZWNsYXJlZFJ1bGUodGhpcy5ydWxlTmFtZSwgZ3JhbW1hci5uYW1lLCB0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIC8vIC4uLmFuZCB0aGF0IHRoaXMgYXBwbGljYXRpb24gaXMgYWxsb3dlZFxuICBpZiAoY29tbW9uLmlzU3ludGFjdGljKHRoaXMucnVsZU5hbWUpICYmICghY29tbW9uLmlzU3ludGFjdGljKHJ1bGVOYW1lKSB8fCBsZXhpZnlDb3VudCA+IDApKSB7XG4gICAgdGhyb3cgZXJyb3JzLmFwcGxpY2F0aW9uT2ZTeW50YWN0aWNSdWxlRnJvbUxleGljYWxDb250ZXh0KHRoaXMucnVsZU5hbWUsIHRoaXMpO1xuICB9XG5cbiAgLy8gLi4uYW5kIHRoYXQgdGhpcyBhcHBsaWNhdGlvbiBoYXMgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICB2YXIgYWN0dWFsID0gdGhpcy5hcmdzLmxlbmd0aDtcbiAgdmFyIGV4cGVjdGVkID0gZ3JhbW1hci5ydWxlRm9ybWFsc1t0aGlzLnJ1bGVOYW1lXS5sZW5ndGg7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgdGhyb3cgZXJyb3JzLndyb25nTnVtYmVyT2ZBcmd1bWVudHModGhpcy5ydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgdGhpcyk7XG4gIH1cblxuICAvLyAuLi5hbmQgdGhhdCBhbGwgb2YgdGhlIGFyZ3VtZW50IGV4cHJlc3Npb25zIG9ubHkgaGF2ZSB2YWxpZCBhcHBsaWNhdGlvbnMgYW5kIGhhdmUgYXJpdHkgMS5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLmFyZ3MuZm9yRWFjaChmdW5jdGlvbihhcmcpIHtcbiAgICBhcmcuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgICBpZiAoYXJnLmdldEFyaXR5KCkgIT09IDEpIHtcbiAgICAgIHRocm93IGVycm9ycy5pbnZhbGlkUGFyYW1ldGVyKHNlbGYucnVsZU5hbWUsIGFyZyk7XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gY29tbW9uLmFic3RyYWN0KFxuICAnYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHknXG4pO1xuXG5wZXhwcnMuYW55LmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5lbmQuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGlmICh0aGlzLnRlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgYXJpdHkgPSB0aGlzLnRlcm1zWzBdLmdldEFyaXR5KCk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB0ZXJtID0gdGhpcy50ZXJtc1tpZHhdO1xuICAgIHRlcm0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkoKTtcbiAgICB2YXIgb3RoZXJBcml0eSA9IHRlcm0uZ2V0QXJpdHkoKTtcbiAgICBpZiAoYXJpdHkgIT09IG90aGVyQXJpdHkpIHtcbiAgICAgIHRocm93IGVycm9ycy5pbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgYXJpdHksIG90aGVyQXJpdHksIHRlcm0pO1xuICAgIH1cbiAgfVxufTtcblxucGV4cHJzLkV4dGVuZC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBFeHRlbmQgaXMgYSBzcGVjaWFsIGNhc2Ugb2YgQWx0IHRoYXQncyBndWFyYW50ZWVkIHRvIGhhdmUgZXhhY3RseSB0d29cbiAgLy8gY2FzZXM6IFtleHRlbnNpb25zLCBvcmlnQm9keV0uXG4gIHZhciBhY3R1YWxBcml0eSA9IHRoaXMudGVybXNbMF0uZ2V0QXJpdHkoKTtcbiAgdmFyIGV4cGVjdGVkQXJpdHkgPSB0aGlzLnRlcm1zWzFdLmdldEFyaXR5KCk7XG4gIGlmIChhY3R1YWxBcml0eSAhPT0gZXhwZWN0ZWRBcml0eSkge1xuICAgIHRocm93IGVycm9ycy5pbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgZXhwZWN0ZWRBcml0eSwgYWN0dWFsQXJpdHksIHRoaXMudGVybXNbMF0pO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcCAobm90IHJlcXVpcmVkIGIvYyB0aGUgbmVzdGVkIGV4cHIgZG9lc24ndCBzaG93IHVwIGluIHRoZSBDU1QpXG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gVGhlIGFyaXRpZXMgb2YgdGhlIHBhcmFtZXRlciBleHByZXNzaW9ucyBpcyByZXF1aXJlZCB0byBiZSAxIGJ5XG4gIC8vIGBhc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCgpYC5cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ2Fzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSdcbik7XG5cbnBleHBycy5hbnkuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5lbmQuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgcnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMudGVybXNbaWR4XS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUoZ3JhbW1hciwgcnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICAvLyBOb3RlOiB0aGlzIGlzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIG1ldGhvZCBmb3IgYFN0YXJgIGFuZCBgUGx1c2AgZXhwcmVzc2lvbnMuXG4gIC8vIEl0IGlzIG92ZXJyaWRkZW4gZm9yIGBPcHRgIGJlbG93LlxuICB0aGlzLmV4cHIuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbiAgaWYgKHRoaXMuZXhwci5pc051bGxhYmxlKGdyYW1tYXIpKSB7XG4gICAgdGhyb3cgZXJyb3JzLmtsZWVuZUV4cHJIYXNOdWxsYWJsZU9wZXJhbmQodGhpcywgcnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgcnVsZU5hbWUpIHtcbiAgdGhpcy5hcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnKSB7XG4gICAgYXJnLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIG5vZGVzID0gcmVxdWlyZSgnLi9ub2RlcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmNoZWNrID0gY29tbW9uLmFic3RyYWN0KCdjaGVjaycpO1xuXG5wZXhwcnMuYW55LmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFscy5sZW5ndGggPj0gMTtcbn07XG5cbnBleHBycy5lbmQuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICAgdmFsc1swXS5pc1Rlcm1pbmFsKCkgJiZcbiAgICAgICAgIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09IHVuZGVmaW5lZDtcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICAgdmFsc1swXS5pc1Rlcm1pbmFsKCkgJiZcbiAgICAgICAgIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09IHRoaXMub2JqO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdHlwZW9mIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09IHR5cGVvZiB0aGlzLmZyb207XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFscy5sZW5ndGggPj0gMTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVybXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVybSA9IHRoaXMudGVybXNbaV07XG4gICAgaWYgKHRlcm0uY2hlY2soZ3JhbW1hciwgdmFscykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgdmFyIHBvcyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGZhY3RvciA9IHRoaXMuZmFjdG9yc1tpXTtcbiAgICBpZiAoZmFjdG9yLmNoZWNrKGdyYW1tYXIsIHZhbHMuc2xpY2UocG9zKSkpIHtcbiAgICAgIHBvcyArPSBmYWN0b3IuZ2V0QXJpdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgdmFyIGFyaXR5ID0gdGhpcy5nZXRBcml0eSgpO1xuICB2YXIgY29sdW1ucyA9IHZhbHMuc2xpY2UoMCwgYXJpdHkpO1xuICBpZiAoY29sdW1ucy5sZW5ndGggIT09IGFyaXR5KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciByb3dDb3VudCA9IGNvbHVtbnNbMF0ubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMTsgaSA8IGFyaXR5OyBpKyspIHtcbiAgICBpZiAoY29sdW1uc1tpXS5sZW5ndGggIT09IHJvd0NvdW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHJvd0NvdW50OyBpKyspIHtcbiAgICB2YXIgcm93ID0gW107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcml0eTsgaisrKSB7XG4gICAgICByb3cucHVzaChjb2x1bW5zW2pdW2ldKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgcm93KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuY2hlY2sgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgdmFscyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICBpZiAoISh2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICB2YWxzWzBdLmdyYW1tYXIgPT09IGdyYW1tYXIgJiZcbiAgICAgICAgdmFsc1swXS5jdG9yTmFtZSA9PT0gdGhpcy5ydWxlTmFtZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUT0RPOiB0aGluayBhYm91dCAqbm90KiBkb2luZyB0aGUgZm9sbG93aW5nIGNoZWNrcywgaS5lLiwgdHJ1c3RpbmcgdGhhdCB0aGUgcnVsZVxuICAvLyB3YXMgY29ycmVjdGx5IGNvbnN0cnVjdGVkLlxuICB2YXIgcnVsZU5vZGUgPSB2YWxzWzBdO1xuICB2YXIgYm9keSA9IGdyYW1tYXIucnVsZUJvZGllc1t0aGlzLnJ1bGVOYW1lXTtcbiAgcmV0dXJuIGJvZHkuY2hlY2soZ3JhbW1hciwgcnVsZU5vZGUuY2hpbGRyZW4pICYmIHJ1bGVOb2RlLm51bUNoaWxkcmVuKCkgPT09IGJvZHkuZ2V0QXJpdHkoKTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICAgdmFsc1swXS5pc1Rlcm1pbmFsKCkgJiZcbiAgICAgICAgIHR5cGVvZiB2YWxzWzBdLnByaW1pdGl2ZVZhbHVlID09PSAnc3RyaW5nJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgVHJhY2UgPSByZXF1aXJlKCcuL1RyYWNlJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBub2RlcyA9IHJlcXVpcmUoJy4vbm9kZXMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG52YXIgVGVybWluYWxOb2RlID0gbm9kZXMuVGVybWluYWxOb2RlO1xudmFyIE5vbnRlcm1pbmFsTm9kZSA9IG5vZGVzLk5vbnRlcm1pbmFsTm9kZTtcbnZhciBJdGVyYXRpb25Ob2RlID0gbm9kZXMuSXRlcmF0aW9uTm9kZTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIEV2YWx1YXRlIHRoZSBleHByZXNzaW9uIGFuZCByZXR1cm4gYHRydWVgIGlmIGl0IHN1Y2NlZWRzLCBgZmFsc2VgIG90aGVyd2lzZS4gVGhpcyBtZXRob2Qgc2hvdWxkXG4gIG9ubHkgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IGBTdGF0ZS5wcm90b3R5cGUuZXZhbChleHByKWAsIHdoaWNoIGFsc28gdXBkYXRlcyB0aGUgZGF0YSBzdHJ1Y3R1cmVzXG4gIHRoYXQgYXJlIHVzZWQgZm9yIHRyYWNpbmcuIChNYWtpbmcgdGhvc2UgdXBkYXRlcyBpbiBhIG1ldGhvZCBvZiBgU3RhdGVgIGVuYWJsZXMgdGhlIHRyYWNlLXNwZWNpZmljXG4gIGRhdGEgc3RydWN0dXJlcyB0byBiZSBcInNlY3JldHNcIiBvZiB0aGF0IGNsYXNzLCB3aGljaCBpcyBnb29kIGZvciBtb2R1bGFyaXR5LilcblxuICBUaGUgY29udHJhY3Qgb2YgdGhpcyBtZXRob2QgaXMgYXMgZm9sbG93czpcbiAgKiBXaGVuIHRoZSByZXR1cm4gdmFsdWUgaXMgYHRydWVgLFxuICAgIC0gdGhlIHN0YXRlIG9iamVjdCB3aWxsIGhhdmUgYGV4cHIuZ2V0QXJpdHkoKWAgbW9yZSBiaW5kaW5ncyB0aGFuIGl0IGRpZCBiZWZvcmUgdGhlIGNhbGwuXG4gICogV2hlbiB0aGUgcmV0dXJuIHZhbHVlIGlzIGBmYWxzZWAsXG4gICAgLSB0aGUgc3RhdGUgb2JqZWN0IG1heSBoYXZlIG1vcmUgYmluZGluZ3MgdGhhbiBpdCBkaWQgYmVmb3JlIHRoZSBjYWxsLCBhbmRcbiAgICAtIGl0cyBpbnB1dCBzdHJlYW0ncyBwb3NpdGlvbiBtYXkgYmUgYW55d2hlcmUuXG5cbiAgTm90ZSB0aGF0IGBTdGF0ZS5wcm90b3R5cGUuZXZhbChleHByKWAsIHVubGlrZSB0aGlzIG1ldGhvZCwgZ3VhcmFudGVlcyB0aGF0IG5laXRoZXIgdGhlIHN0YXRlXG4gIG9iamVjdCdzIGJpbmRpbmdzIG5vciBpdHMgaW5wdXQgc3RyZWFtJ3MgcG9zaXRpb24gd2lsbCBjaGFuZ2UgaWYgdGhlIGV4cHJlc3Npb24gZmFpbHMgdG8gbWF0Y2guXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS5ldmFsID0gY29tbW9uLmFic3RyYWN0KCdldmFsJyk7ICAvLyBmdW5jdGlvbihzdGF0ZSkgeyAuLi4gfVxuXG5wZXhwcnMuYW55LmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBjaCA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoKSB7XG4gICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIGNoLCBpbnRlcnZhbCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLmVuZC5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAoaW5wdXRTdHJlYW0uYXRFbmQoKSkge1xuICAgIHZhciBpbnRlcnZhbCA9IGlucHV0U3RyZWFtLmludGVydmFsKGlucHV0U3RyZWFtLnBvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIHVuZGVmaW5lZCwgaW50ZXJ2YWwpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKCFpbnB1dFN0cmVhbS5tYXRjaFN0cmluZyh0aGlzLm9iaikpIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcyk7XG4gICAgdmFyIHByaW1pdGl2ZVZhbHVlID0gdGhpcy5vYmo7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIHByaW1pdGl2ZVZhbHVlLCBpbnRlcnZhbCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBjaCA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoICYmIHRoaXMuZnJvbSA8PSBjaCAmJiBjaCA8PSB0aGlzLnRvKSB7XG4gICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIGNoLCBpbnRlcnZhbCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLmV2YWwoc3RhdGUuY3VycmVudEFwcGxpY2F0aW9uKCkuYXJnc1t0aGlzLmluZGV4XSk7XG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgc3RhdGUuZW50ZXJMZXhpZmllZENvbnRleHQoKTtcbiAgdmFyIGFucyA9IHN0YXRlLmV2YWwodGhpcy5leHByKTtcbiAgc3RhdGUuZXhpdExleGlmaWVkQ29udGV4dCgpO1xuICByZXR1cm4gYW5zO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIGlmIChzdGF0ZS5ldmFsKHRoaXMudGVybXNbaWR4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgZmFjdG9yID0gdGhpcy5mYWN0b3JzW2lkeF07XG4gICAgaWYgKCFzdGF0ZS5ldmFsKGZhY3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGFyaXR5ID0gdGhpcy5nZXRBcml0eSgpO1xuICB2YXIgY29scyA9IFtdO1xuICB3aGlsZSAoY29scy5sZW5ndGggPCBhcml0eSkge1xuICAgIGNvbHMucHVzaChbXSk7XG4gIH1cbiAgdmFyIG51bU1hdGNoZXMgPSAwO1xuICB2YXIgaWR4O1xuICB3aGlsZSAobnVtTWF0Y2hlcyA8IHRoaXMubWF4TnVtTWF0Y2hlcyAmJiBzdGF0ZS5ldmFsKHRoaXMuZXhwcikpIHtcbiAgICBudW1NYXRjaGVzKys7XG4gICAgdmFyIHJvdyA9IHN0YXRlLmJpbmRpbmdzLnNwbGljZShzdGF0ZS5iaW5kaW5ncy5sZW5ndGggLSBhcml0eSwgYXJpdHkpO1xuICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgcm93Lmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGNvbHNbaWR4XS5wdXNoKHJvd1tpZHhdKTtcbiAgICB9XG4gIH1cbiAgaWYgKG51bU1hdGNoZXMgPCB0aGlzLm1pbk51bU1hdGNoZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGludGVydmFsO1xuICBpZiAobnVtTWF0Y2hlcyA9PT0gMCkge1xuICAgIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcywgb3JpZ1Bvcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpcnN0Q29sID0gY29sc1swXTtcbiAgICB2YXIgbGFzdENvbCA9IGNvbHNbY29scy5sZW5ndGggLSAxXTtcbiAgICBpbnRlcnZhbCA9IGlucHV0U3RyZWFtLmludGVydmFsKFxuICAgICAgICBmaXJzdENvbFswXS5pbnRlcnZhbC5zdGFydElkeCxcbiAgICAgICAgbGFzdENvbFtsYXN0Q29sLmxlbmd0aCAtIDFdLmludGVydmFsLmVuZElkeCk7XG4gIH1cbiAgZm9yIChpZHggPSAwOyBpZHggPCBjb2xzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBzdGF0ZS5iaW5kaW5ncy5wdXNoKG5ldyBJdGVyYXRpb25Ob2RlKHN0YXRlLmdyYW1tYXIsIGNvbHNbaWR4XSwgaW50ZXJ2YWwsXG4gICAgICB0aGlzIGluc3RhbmNlb2YgcGV4cHJzLk9wdCkpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIC8qXG4gICAgVE9ETzpcbiAgICAtIFJpZ2h0IG5vdyB3ZSdyZSBqdXN0IHRocm93aW5nIGF3YXkgYWxsIG9mIHRoZSBmYWlsdXJlcyB0aGF0IGhhcHBlbiBpbnNpZGUgYSBgbm90YCwgYW5kXG4gICAgICByZWNvcmRpbmcgYHRoaXNgIGFzIGEgZmFpbGVkIGV4cHJlc3Npb24uXG4gICAgLSBEb3VibGUgbmVnYXRpb24gc2hvdWxkIGJlIGVxdWl2YWxlbnQgdG8gbG9va2FoZWFkLCBidXQgdGhhdCdzIG5vdCB0aGUgY2FzZSByaWdodCBub3cgd3J0XG4gICAgICBmYWlsdXJlcy4gRS5nLiwgfn4nZm9vJyBwcm9kdWNlcyBhIGZhaWx1cmUgZm9yIH5+J2ZvbycsIGJ1dCBtYXliZSBpdCBzaG91bGQgcHJvZHVjZVxuICAgICAgYSBmYWlsdXJlIGZvciAnZm9vJyBpbnN0ZWFkLlxuICAqL1xuXG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGZhaWx1cmVzSW5mbyA9IHN0YXRlLmdldEZhaWx1cmVzSW5mbygpO1xuXG4gIHZhciBhbnMgPSBzdGF0ZS5ldmFsKHRoaXMuZXhwcik7XG5cbiAgc3RhdGUucmVzdG9yZUZhaWx1cmVzSW5mbyhmYWlsdXJlc0luZm8pO1xuICBpZiAoYW5zKSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAoc3RhdGUuZXZhbCh0aGlzLmV4cHIpKSB7XG4gICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBjYWxsZXIgPSBzdGF0ZS5jdXJyZW50QXBwbGljYXRpb24oKTtcbiAgdmFyIGFjdHVhbHMgPSBjYWxsZXIgPyBjYWxsZXIuYXJncyA6IFtdO1xuICB2YXIgYXBwID0gdGhpcy5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpO1xuXG4gIHZhciBwb3NJbmZvID0gc3RhdGUuZ2V0Q3VycmVudFBvc0luZm8oKTtcbiAgaWYgKHBvc0luZm8uaXNBY3RpdmUoYXBwKSkge1xuICAgIC8vIFRoaXMgcnVsZSBpcyBhbHJlYWR5IGFjdGl2ZSBhdCB0aGlzIHBvc2l0aW9uLCBpLmUuLCBpdCBpcyBsZWZ0LXJlY3Vyc2l2ZS5cbiAgICByZXR1cm4gYXBwLmhhbmRsZUN5Y2xlKHN0YXRlKTtcbiAgfVxuXG4gIHZhciBtZW1vS2V5ID0gYXBwLnRvTWVtb0tleSgpO1xuICB2YXIgbWVtb1JlYyA9IHBvc0luZm8ubWVtb1ttZW1vS2V5XTtcbiAgcmV0dXJuIG1lbW9SZWMgJiYgcG9zSW5mby5zaG91bGRVc2VNZW1vaXplZFJlc3VsdChtZW1vUmVjKSA/XG4gICAgICBzdGF0ZS51c2VNZW1vaXplZFJlc3VsdChtZW1vUmVjKSA6XG4gICAgICBhcHAucmVhbGx5RXZhbChzdGF0ZSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmhhbmRsZUN5Y2xlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIHBvc0luZm8gPSBzdGF0ZS5nZXRDdXJyZW50UG9zSW5mbygpO1xuICB2YXIgY3VycmVudExlZnRSZWN1cnNpb24gPSBwb3NJbmZvLmN1cnJlbnRMZWZ0UmVjdXJzaW9uO1xuICB2YXIgbWVtb0tleSA9IHRoaXMudG9NZW1vS2V5KCk7XG4gIHZhciBtZW1vUmVjID0gcG9zSW5mby5tZW1vW21lbW9LZXldO1xuXG4gIGlmIChjdXJyZW50TGVmdFJlY3Vyc2lvbiAmJiBjdXJyZW50TGVmdFJlY3Vyc2lvbi5oZWFkQXBwbGljYXRpb24udG9NZW1vS2V5KCkgPT09IG1lbW9LZXkpIHtcbiAgICAvLyBXZSBhbHJlYWR5IGtub3cgYWJvdXQgdGhpcyBsZWZ0IHJlY3Vyc2lvbiwgYnV0IGl0J3MgcG9zc2libGUgdGhlcmUgYXJlIFwiaW52b2x2ZWRcbiAgICAvLyBhcHBsaWNhdGlvbnNcIiB0aGF0IHdlIGRvbid0IGFscmVhZHkga25vdyBhYm91dCwgc28uLi5cbiAgICBtZW1vUmVjLnVwZGF0ZUludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cygpO1xuICB9IGVsc2UgaWYgKCFtZW1vUmVjKSB7XG4gICAgLy8gTmV3IGxlZnQgcmVjdXJzaW9uIGRldGVjdGVkISBNZW1vaXplIGEgZmFpbHVyZSB0byB0cnkgdG8gZ2V0IGEgc2VlZCBwYXJzZS5cbiAgICBtZW1vUmVjID0gcG9zSW5mby5tZW1vW21lbW9LZXldID0ge3BvczogLTEsIHZhbHVlOiBmYWxzZX07XG4gICAgcG9zSW5mby5zdGFydExlZnRSZWN1cnNpb24odGhpcywgbWVtb1JlYyk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlLnVzZU1lbW9pemVkUmVzdWx0KG1lbW9SZWMpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5yZWFsbHlFdmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgb3JpZ1Bvc0luZm8gPSBzdGF0ZS5nZXRDdXJyZW50UG9zSW5mbygpO1xuICB2YXIgYm9keSA9IHN0YXRlLmdyYW1tYXIucnVsZUJvZGllc1t0aGlzLnJ1bGVOYW1lXTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gc3RhdGUuZ3JhbW1hci5ydWxlRGVzY3JpcHRpb25zW3RoaXMucnVsZU5hbWVdO1xuXG4gIG9yaWdQb3NJbmZvLmVudGVyKHRoaXMpO1xuXG4gIGlmIChkZXNjcmlwdGlvbikge1xuICAgIHZhciBvcmlnRmFpbHVyZXNJbmZvID0gc3RhdGUuZ2V0RmFpbHVyZXNJbmZvKCk7XG4gIH1cblxuICB2YXIgdmFsdWUgPSB0aGlzLmV2YWxPbmNlKGJvZHksIHN0YXRlKTtcbiAgdmFyIGN1cnJlbnRMUiA9IG9yaWdQb3NJbmZvLmN1cnJlbnRMZWZ0UmVjdXJzaW9uO1xuICB2YXIgbWVtb0tleSA9IHRoaXMudG9NZW1vS2V5KCk7XG4gIHZhciBpc0hlYWRPZkxlZnRSZWN1cnNpb24gPSBjdXJyZW50TFIgJiYgY3VycmVudExSLmhlYWRBcHBsaWNhdGlvbi50b01lbW9LZXkoKSA9PT0gbWVtb0tleTtcbiAgdmFyIG1lbW9pemVkID0gdHJ1ZTtcblxuICBpZiAoaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uKSB7XG4gICAgdmFsdWUgPSB0aGlzLmdyb3dTZWVkUmVzdWx0KGJvZHksIHN0YXRlLCBvcmlnUG9zLCBjdXJyZW50TFIsIHZhbHVlKTtcbiAgICBvcmlnUG9zSW5mby5lbmRMZWZ0UmVjdXJzaW9uKCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudExSICYmIGN1cnJlbnRMUi5pc0ludm9sdmVkKG1lbW9LZXkpKSB7XG4gICAgLy8gRG9uJ3QgbWVtb2l6ZSB0aGUgcmVzdWx0XG4gICAgbWVtb2l6ZWQgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBvcmlnUG9zSW5mby5tZW1vW21lbW9LZXldID0ge1xuICAgICAgcG9zOiBpbnB1dFN0cmVhbS5wb3MsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBmYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb246IHN0YXRlLmNsb25lUmlnaHRtb3N0RmFpbHVyZXMoKVxuICAgIH07XG4gIH1cblxuICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICBzdGF0ZS5yZXN0b3JlRmFpbHVyZXNJbmZvKG9yaWdGYWlsdXJlc0luZm8pO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChtZW1vaXplZCkge1xuICAgICAgb3JpZ1Bvc0luZm8ubWVtb1ttZW1vS2V5XS5mYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb24gPSBzdGF0ZS5jbG9uZVJpZ2h0bW9zdEZhaWx1cmVzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVjb3JkIHRyYWNlIGluZm9ybWF0aW9uIGluIHRoZSBtZW1vIHRhYmxlLCBzbyB0aGF0IGl0IGlzIGF2YWlsYWJsZSBpZiB0aGUgbWVtb2l6ZWQgcmVzdWx0XG4gIC8vIGlzIHVzZWQgbGF0ZXIuXG4gIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSAmJiBvcmlnUG9zSW5mby5tZW1vW21lbW9LZXldKSB7XG4gICAgdmFyIHN1Y2NlZWRlZCA9ICEhdmFsdWU7XG4gICAgdmFyIGVudHJ5ID0gc3RhdGUuZ2V0VHJhY2VFbnRyeShvcmlnUG9zLCB0aGlzLCBzdWNjZWVkZWQsIHN1Y2NlZWRlZCA/IFt2YWx1ZV0gOiBbXSk7XG4gICAgZW50cnkuaXNMZWZ0UmVjdXJzaXZlID0gaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uO1xuICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0udHJhY2VFbnRyeSA9IGVudHJ5O1xuICB9XG5cbiAgb3JpZ1Bvc0luZm8uZXhpdCgpO1xuXG4gIGlmICh2YWx1ZSkge1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2godmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5ldmFsT25jZSA9IGZ1bmN0aW9uKGV4cHIsIHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcblxuICBpZiAoc3RhdGUuZXZhbChleHByKSkge1xuICAgIHZhciBhcml0eSA9IGV4cHIuZ2V0QXJpdHkoKTtcbiAgICB2YXIgYmluZGluZ3MgPSBzdGF0ZS5iaW5kaW5ncy5zcGxpY2Uoc3RhdGUuYmluZGluZ3MubGVuZ3RoIC0gYXJpdHksIGFyaXR5KTtcbiAgICB2YXIgYW5zID1cbiAgICAgICAgbmV3IE5vbnRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCB0aGlzLnJ1bGVOYW1lLCBiaW5kaW5ncywgaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1BvcykpO1xuICAgIHJldHVybiBhbnM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmdyb3dTZWVkUmVzdWx0ID0gZnVuY3Rpb24oYm9keSwgc3RhdGUsIG9yaWdQb3MsIGxyTWVtb1JlYywgbmV3VmFsdWUpIHtcbiAgaWYgKCFuZXdWYWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbHJNZW1vUmVjLnBvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICBsck1lbW9SZWMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBsck1lbW9SZWMuZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uID0gc3RhdGUuY2xvbmVSaWdodG1vc3RGYWlsdXJlcygpO1xuXG4gICAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgICAvLyBCZWZvcmUgZXZhbHVhdGluZyB0aGUgYm9keSBhZ2FpbiwgYWRkIGEgdHJhY2Ugbm9kZSBmb3IgdGhpcyBhcHBsaWNhdGlvbiB0byB0aGUgbWVtbyBlbnRyeS5cbiAgICAgIC8vIEl0cyBvbmx5IGNoaWxkIGlzIHRoZSB0cmFjZSBub2RlIGZyb20gYG5ld1ZhbHVlYCwgd2hpY2ggd2lsbCBhbHdheXMgYmUgdGhlIGxhc3QgZWxlbWVudFxuICAgICAgLy8gaW4gYHN0YXRlLnRyYWNlYC5cbiAgICAgIHZhciBjaGlsZHJlbiA9IHN0YXRlLnRyYWNlLnNsaWNlKC0xKTtcbiAgICAgIGxyTWVtb1JlYy50cmFjZUVudHJ5ID0gbmV3IFRyYWNlKFxuICAgICAgICAgIHN0YXRlLmlucHV0U3RyZWFtLCBvcmlnUG9zLCB0aGlzLCB0cnVlLCBbbmV3VmFsdWVdLCBjaGlsZHJlbik7XG4gICAgfVxuICAgIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gICAgbmV3VmFsdWUgPSB0aGlzLmV2YWxPbmNlKGJvZHksIHN0YXRlKTtcbiAgICBpZiAoaW5wdXRTdHJlYW0ucG9zIDw9IGxyTWVtb1JlYy5wb3MpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkpIHtcbiAgICBzdGF0ZS50cmFjZS5wb3AoKTsgIC8vIERyb3AgbGFzdCB0cmFjZSBlbnRyeSBzaW5jZSBgdmFsdWVgIHdhcyB1bnVzZWQuXG4gICAgbHJNZW1vUmVjLnRyYWNlRW50cnkgPSBudWxsO1xuICB9XG4gIGlucHV0U3RyZWFtLnBvcyA9IGxyTWVtb1JlYy5wb3M7XG4gIHJldHVybiBsck1lbW9SZWMudmFsdWU7XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBjaCA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoICYmIHRoaXMucGF0dGVybi50ZXN0KGNoKSkge1xuICAgIHZhciBpbnRlcnZhbCA9IGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MpO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IFRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCBjaCwgaW50ZXJ2YWwpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5nZXRBcml0eSA9IGNvbW1vbi5hYnN0cmFjdCgnZ2V0QXJpdHknKTtcblxucGV4cHJzLmFueS5nZXRBcml0eSA9XG5wZXhwcnMuZW5kLmdldEFyaXR5ID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZ2V0QXJpdHkgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5nZXRBcml0eSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmdldEFyaXR5ID1cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZ2V0QXJpdHkgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRoaXMgaXMgb2sgYi9jIGFsbCB0ZXJtcyBtdXN0IGhhdmUgdGhlIHNhbWUgYXJpdHkgLS0gdGhpcyBwcm9wZXJ0eSBpc1xuICAvLyBjaGVja2VkIGJ5IHRoZSBHcmFtbWFyIGNvbnN0cnVjdG9yLlxuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFyaXR5ID0gMDtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBhcml0eSArPSB0aGlzLmZhY3RvcnNbaWR4XS5nZXRBcml0eSgpO1xuICB9XG4gIHJldHVybiBhcml0eTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByLmdldEFyaXR5KCk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMDtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmdldEFyaXR5ID1cbnBleHBycy5MZXgucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QXJpdHkoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgQ2FsbGVkIGF0IGdyYW1tYXIgY3JlYXRpb24gdGltZSB0byByZXdyaXRlIGEgcnVsZSBib2R5LCByZXBsYWNpbmcgZWFjaCByZWZlcmVuY2UgdG8gYSBmb3JtYWxcbiAgcGFyYW1ldGVyIHdpdGggYSBgUGFyYW1gIG5vZGUuIFJldHVybnMgYSBQRXhwciAtLSBlaXRoZXIgYSBuZXcgb25lLCBvciB0aGUgb3JpZ2luYWwgb25lIGlmXG4gIGl0IHdhcyBtb2RpZmllZCBpbiBwbGFjZS5cbiovXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGNvbW1vbi5hYnN0cmFjdCgnaW50cm9kdWNlUGFyYW1zJyk7XG5cbnBleHBycy5hbnkuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5lbmQuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy50ZXJtcy5mb3JFYWNoKGZ1bmN0aW9uKHRlcm0sIGlkeCwgdGVybXMpIHtcbiAgICB0ZXJtc1tpZHhdID0gdGVybS5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy5mYWN0b3JzLmZvckVhY2goZnVuY3Rpb24oZmFjdG9yLCBpZHgsIGZhY3RvcnMpIHtcbiAgICBmYWN0b3JzW2lkeF0gPSBmYWN0b3IuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5Ob3QucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICB0aGlzLmV4cHIgPSB0aGlzLmV4cHIuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICB2YXIgaW5kZXggPSBmb3JtYWxzLmluZGV4T2YodGhpcy5ydWxlTmFtZSk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgaWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBUT0RPOiBTaG91bGQgdGhpcyBiZSBzdXBwb3J0ZWQ/IFNlZSBpc3N1ZSAjNjQuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcml6ZWQgcnVsZXMgY2Fubm90IGJlIHBhc3NlZCBhcyBhcmd1bWVudHMgdG8gYW5vdGhlciBydWxlLicpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5QYXJhbShpbmRleCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnLCBpZHgsIGFyZ3MpIHtcbiAgICAgIGFyZ3NbaWR4XSA9IGFyZy5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhpcyBwYXJzaW5nIGV4cHJlc3Npb24gbWF5IGFjY2VwdCB3aXRob3V0IGNvbnN1bWluZyBhbnkgaW5wdXQuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmlzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiB0aGlzLl9pc051bGxhYmxlKGdyYW1tYXIsIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufTtcblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGNvbW1vbi5hYnN0cmFjdCgnX2lzTnVsbGFibGUnKTtcblxucGV4cHJzLmFueS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuX2lzTnVsbGFibGUgPVxucGV4cHJzLlBsdXMucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5lbmQuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBUaGlzIGlzIGFuIG92ZXItc2ltcGxpZmljYXRpb246IGl0J3Mgb25seSBjb3JyZWN0IGlmIHRoZSBpbnB1dCBpcyBhIHN0cmluZy4gSWYgaXQncyBhbiBhcnJheVxuICAgIC8vIG9yIGFuIG9iamVjdCwgdGhlbiB0aGUgZW1wdHkgc3RyaW5nIHBhcnNpbmcgZXhwcmVzc2lvbiBpcyBub3QgbnVsbGFibGUuXG4gICAgcmV0dXJuIHRoaXMub2JqID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRoaXMudGVybXMuc29tZShmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLl9pc051bGxhYmxlKGdyYW1tYXIsIG1lbW8pOyB9KTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdGhpcy5mYWN0b3JzLmV2ZXJ5KGZ1bmN0aW9uKGZhY3RvcikgeyByZXR1cm4gZmFjdG9yLl9pc051bGxhYmxlKGdyYW1tYXIsIG1lbW8pOyB9KTtcbn07XG5cbnBleHBycy5TdGFyLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuT3B0LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHZhciBrZXkgPSB0aGlzLnRvTWVtb0tleSgpO1xuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtZW1vLCBrZXkpKSB7XG4gICAgdmFyIGJvZHkgPSBncmFtbWFyLnJ1bGVCb2RpZXNbdGhpcy5ydWxlTmFtZV07XG4gICAgdmFyIGlubGluZWQgPSBib2R5LnN1YnN0aXR1dGVQYXJhbXModGhpcy5hcmdzKTtcbiAgICBtZW1vW2tleV0gPSBmYWxzZTsgIC8vIFByZXZlbnQgaW5maW5pdGUgcmVjdXJzaW9uIGZvciByZWN1cnNpdmUgcnVsZXMuXG4gICAgbWVtb1trZXldID0gaW5saW5lZC5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbiAgfVxuICByZXR1cm4gbWVtb1trZXldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBnZXRNZXRhSW5mbyhleHByLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgdmFyIG1ldGFJbmZvID0ge307XG4gIGlmIChleHByLmludGVydmFsICYmIGdyYW1tYXJJbnRlcnZhbCkge1xuICAgIHZhciBhZGp1c3RlZCA9IGV4cHIuaW50ZXJ2YWwucmVsYXRpdmVUbyhncmFtbWFySW50ZXJ2YWwpO1xuICAgIG1ldGFJbmZvLnNvdXJjZUludGVydmFsID0gW2FkanVzdGVkLnN0YXJ0SWR4LCBhZGp1c3RlZC5lbmRJZHhdO1xuICB9XG4gIHJldHVybiBtZXRhSW5mbztcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gY29tbW9uLmFic3RyYWN0KCdvdXRwdXRSZWNpcGUnKTtcblxucGV4cHJzLmFueS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFsnYW55JywgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKV07XG59O1xuXG5wZXhwcnMuZW5kLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gWydlbmQnLCBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpXTtcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3Rlcm1pbmFsJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMub2JqXG4gIF07XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICdyYW5nZScsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmZyb20sXG4gICAgdGhpcy50b1xuICBdO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAncGFyYW0nLFxuICAgIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbCksXG4gICAgdGhpcy5pbmRleFxuICBdO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ2FsdCcsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKVxuICBdLmNvbmNhdCh0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7XG4gICAgcmV0dXJuIHRlcm0ub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCk7XG4gIH0pKTtcbn07XG5cbnBleHBycy5FeHRlbmQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICB2YXIgZXh0ZW5zaW9uID0gdGhpcy50ZXJtc1swXTsgLy8gW2V4dGVuc2lvbiwgb3JnaW5hbF1cbiAgcmV0dXJuIGV4dGVuc2lvbi5vdXRwdXRSZWNpcGUoZm9ybWFscywgZ3JhbW1hckludGVydmFsKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICdzZXEnLFxuICAgIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbClcbiAgXS5jb25jYXQodGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmYWN0b3IpIHtcbiAgICByZXR1cm4gZmFjdG9yLm91dHB1dFJlY2lwZShmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpO1xuICB9KSk7XG59O1xuXG5wZXhwcnMuU3Rhci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID1cbnBleHBycy5QbHVzLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLk9wdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID1cbnBleHBycy5Ob3QucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLkxleC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbClcbiAgXTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ2FwcCcsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLnJ1bGVOYW1lLFxuICAgIHRoaXMuYXJncy5tYXAoZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gYXJnLm91dHB1dFJlY2lwZShmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpO1xuICAgIH0pXG4gIF07XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICd1bmljb2RlQ2hhcicsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmNhdGVnb3J5XG4gIF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIFJldHVybnMgYSBQRXhwciB0aGF0IHJlc3VsdHMgZnJvbSByZWN1cnNpdmVseSByZXBsYWNpbmcgZXZlcnkgZm9ybWFsIHBhcmFtZXRlciAoaS5lLiwgaW5zdGFuY2VcbiAgb2YgYFBhcmFtYCkgaW5zaWRlIHRoaXMgUEV4cHIgd2l0aCBpdHMgYWN0dWFsIHZhbHVlIGZyb20gYGFjdHVhbHNgIChhbiBBcnJheSkuXG5cbiAgVGhlIHJlY2VpdmVyIG11c3Qgbm90IGJlIG1vZGlmaWVkOyBhIG5ldyBQRXhwciBtdXN0IGJlIHJldHVybmVkIGlmIGFueSByZXBsYWNlbWVudCBpcyBuZWNlc3NhcnkuXG4qL1xuLy8gZnVuY3Rpb24oYWN0dWFscykgeyAuLi4gfVxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gY29tbW9uLmFic3RyYWN0KCdzdWJzdGl0dXRlUGFyYW1zJyk7XG5cbnBleHBycy5hbnkuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuZW5kLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgcmV0dXJuIGFjdHVhbHNbdGhpcy5pbmRleF07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gbmV3IHBleHBycy5BbHQoXG4gICAgICB0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscyk7IH0pKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiBuZXcgcGV4cHJzLlNlcShcbiAgICAgIHRoaXMuZmFjdG9ycy5tYXAoZnVuY3Rpb24oZmFjdG9yKSB7IHJldHVybiBmYWN0b3Iuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTsgfSkpO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5MZXgucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmV4cHIuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIGlmICh0aGlzLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gQXZvaWQgbWFraW5nIGEgY29weSBvZiB0aGlzIGFwcGxpY2F0aW9uLCBhcyBhbiBvcHRpbWl6YXRpb25cbiAgICByZXR1cm4gdGhpcztcbiAgfSBlbHNlIHtcbiAgICB2YXIgYXJncyA9IHRoaXMuYXJncy5tYXAoZnVuY3Rpb24oYXJnKSB7IHJldHVybiBhcmcuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTsgfSk7XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuQXBwbHkodGhpcy5ydWxlTmFtZSwgYXJncyk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG52YXIgY29weVdpdGhvdXREdXBsaWNhdGVzID0gY29tbW9uLmNvcHlXaXRob3V0RHVwbGljYXRlcztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGlzUmVzdHJpY3RlZEpTSWRlbnRpZmllcihzdHIpIHtcbiAgcmV0dXJuIC9eW2EtekEtWl8kXVswLTlhLXpBLVpfJF0qJC8udGVzdChzdHIpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgUmV0dXJucyBhIGxpc3Qgb2Ygc3RyaW5ncyB0aGF0IHdpbGwgYmUgdXNlZCBhcyB0aGUgZGVmYXVsdCBhcmd1bWVudCBuYW1lcyBmb3IgaXRzIHJlY2VpdmVyXG4gIChhIHBleHByKSBpbiBhIHNlbWFudGljIGFjdGlvbi4gVGhpcyBpcyB1c2VkIGV4Y2x1c2l2ZWx5IGJ5IHRoZSBTZW1hbnRpY3MgRWRpdG9yLlxuXG4gIGBmaXJzdEFyZ0luZGV4YCBpcyB0aGUgMS1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgYXJndW1lbnQgbmFtZSB0aGF0IHdpbGwgYmUgZ2VuZXJhdGVkIGZvciB0aGlzXG4gIHBleHByLiBJdCBlbmFibGVzIHVzIHRvIG5hbWUgYXJndW1lbnRzIHBvc2l0aW9uYWxseSwgZS5nLiwgaWYgdGhlIHNlY29uZCBhcmd1bWVudCBpcyBhXG4gIG5vbi1hbHBoYW51bWVyaWMgdGVybWluYWwgbGlrZSBcIitcIiwgaXQgd2lsbCBiZSBuYW1lZCAnJDInLlxuXG4gIEhlcmUgaXMgYSBtb3JlIGVsYWJvcmF0ZSBleGFtcGxlIHRoYXQgaWxsdXN0cmF0ZXMgaG93IHRoaXMgbWV0aG9kIHdvcmtzOlxuICBgKGEgXCIrXCIgYikudG9Bcmd1bWVudE5hbWVMaXN0KDEpYCBldmFsdWF0ZXMgdG8gYFsnYScsICckMicsICdiJ11gIHdpdGggdGhlIGZvbGxvd2luZyByZWN1cnNpdmVcbiAgY2FsbHM6XG5cbiAgICAoYSkudG9Bcmd1bWVudE5hbWVMaXN0KDEpIC0+IFsnYSddLFxuICAgIChcIitcIikudG9Bcmd1bWVudE5hbWVMaXN0KDIpIC0+IFsnJDInXSxcbiAgICAoYikudG9Bcmd1bWVudE5hbWVMaXN0KDMpIC0+IFsnYiddXG5cbiAgTm90ZXM6XG4gICogVGhpcyBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCBvbiB3ZWxsLWZvcm1lZCBleHByZXNzaW9ucywgZS5nLiwgdGhlIHJlY2VpdmVyIG11c3RcbiAgICBub3QgaGF2ZSBhbnkgQWx0IHN1Yi1leHByZXNzaW9ucyB3aXRoIGluY29uc2lzdGVudCBhcml0aWVzLlxuICAqIGUuZ2V0QXJpdHkoKSA9PT0gZS50b0FyZ3VtZW50TmFtZUxpc3QoMSkubGVuZ3RoXG4qL1xuLy8gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCkgeyAuLi4gfVxucGV4cHJzLlBFeHByLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBjb21tb24uYWJzdHJhY3QoJ3RvQXJndW1lbnROYW1lTGlzdCcpO1xuXG5wZXhwcnMuYW55LnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgpIHtcbiAgcmV0dXJuIFsnYW55J107XG59O1xuXG5wZXhwcnMuZW5kLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgpIHtcbiAgcmV0dXJuIFsnZW5kJ107XG59O1xuXG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycgJiYgL15bX2EtekEtWjAtOV0rJC8udGVzdCh0aGlzLm9iaikpIHtcbiAgICAvLyBJZiB0aGlzIHRlcm1pbmFsIGlzIGEgdmFsaWQgc3VmZml4IGZvciBhIEpTIGlkZW50aWZpZXIsIGp1c3QgcHJlcGVuZCBpdCB3aXRoICdfJ1xuICAgIHJldHVybiBbJ18nICsgdGhpcy5vYmpdO1xuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSwgbmFtZSBpdCBwb3NpdGlvbmFsbHkuXG4gICAgcmV0dXJuIFsnJCcgKyBmaXJzdEFyZ0luZGV4XTtcbiAgfVxufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIHZhciBhcmdOYW1lID0gdGhpcy5mcm9tICsgJ190b18nICsgdGhpcy50bztcbiAgLy8gSWYgdGhlIGBhcmdOYW1lYCBpcyBub3QgdmFsaWQgdGhlbiB0cnkgdG8gcHJlcGVuZCBhIGBfYC5cbiAgaWYgKCFpc1Jlc3RyaWN0ZWRKU0lkZW50aWZpZXIoYXJnTmFtZSkpIHtcbiAgICBhcmdOYW1lID0gJ18nICsgYXJnTmFtZTtcbiAgfVxuICAvLyBJZiB0aGUgYGFyZ05hbWVgIHN0aWxsIG5vdCB2YWxpZCBhZnRlciBwcmVwZW5kaW5nIGEgYF9gLCB0aGVuIG5hbWUgaXQgcG9zaXRpb25hbGx5LlxuICBpZiAoIWlzUmVzdHJpY3RlZEpTSWRlbnRpZmllcihhcmdOYW1lKSkge1xuICAgIGFyZ05hbWUgPSAnJCcgKyBmaXJzdEFyZ0luZGV4O1xuICB9XG4gIHJldHVybiBbYXJnTmFtZV07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIC8vIGB0ZXJtQXJnTmFtZUxpc3RzYCBpcyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaCByb3cgaXMgdGhlXG4gIC8vIGFyZ3VtZW50IG5hbWUgbGlzdCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEgdGVybSBpbiB0aGlzIGFsdGVybmF0aW9uLlxuICB2YXIgdGVybUFyZ05hbWVMaXN0cyA9IHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHtcbiAgICByZXR1cm4gdGVybS50b0FyZ3VtZW50TmFtZUxpc3QoZmlyc3RBcmdJbmRleCk7XG4gIH0pO1xuXG4gIHZhciBhcmd1bWVudE5hbWVMaXN0ID0gW107XG4gIHZhciBudW1BcmdzID0gdGVybUFyZ05hbWVMaXN0c1swXS5sZW5ndGg7XG4gIGZvciAodmFyIGNvbElkeCA9IDA7IGNvbElkeCA8IG51bUFyZ3M7IGNvbElkeCsrKSB7XG4gICAgdmFyIGNvbCA9IFtdO1xuICAgIGZvciAodmFyIHJvd0lkeCA9IDA7IHJvd0lkeCA8IHRoaXMudGVybXMubGVuZ3RoOyByb3dJZHgrKykge1xuICAgICAgY29sLnB1c2godGVybUFyZ05hbWVMaXN0c1tyb3dJZHhdW2NvbElkeF0pO1xuICAgIH1cbiAgICB2YXIgdW5pcXVlTmFtZXMgPSBjb3B5V2l0aG91dER1cGxpY2F0ZXMoY29sKTtcbiAgICBhcmd1bWVudE5hbWVMaXN0LnB1c2godW5pcXVlTmFtZXMuam9pbignX29yXycpKTtcbiAgfVxuXG4gIHJldHVybiBhcmd1bWVudE5hbWVMaXN0O1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCkge1xuICAvLyBHZW5lcmF0ZSB0aGUgYXJndW1lbnQgbmFtZSBsaXN0LCB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IGR1cGxpY2F0ZXMuXG4gIHZhciBhcmd1bWVudE5hbWVMaXN0ID0gW107XG4gIHRoaXMuZmFjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGZhY3Rvcikge1xuICAgIHZhciBmYWN0b3JBcmd1bWVudE5hbWVMaXN0ID0gZmFjdG9yLnRvQXJndW1lbnROYW1lTGlzdChmaXJzdEFyZ0luZGV4KTtcbiAgICBhcmd1bWVudE5hbWVMaXN0ID0gYXJndW1lbnROYW1lTGlzdC5jb25jYXQoZmFjdG9yQXJndW1lbnROYW1lTGlzdCk7XG5cbiAgICAvLyBTaGlmdCB0aGUgZmlyc3RBcmdJbmRleCB0byB0YWtlIHRoaXMgZmFjdG9yJ3MgYXJndW1lbnQgbmFtZXMgaW50byBhY2NvdW50LlxuICAgIGZpcnN0QXJnSW5kZXggKz0gZmFjdG9yQXJndW1lbnROYW1lTGlzdC5sZW5ndGg7XG4gIH0pO1xuXG4gIC8vIGBjb3VudGAgaXMgdXNlZCB0byByZWNvcmQgdGhlIG51bWJlciBvZiB0aW1lcyBlYWNoIGFyZ3VtZW50IG5hbWUgb2NjdXJzIGluIHRoZSBsaXN0LFxuICAvLyB0aGlzIGlzIHVzZWZ1bCBmb3IgY2hlY2tpbmcgZHVwbGljYXRlZCBhcmd1bWVudCBuYW1lLiBJdCBtYXBzIGFyZ3VtZW50IG5hbWVzIHRvIGludHMuXG4gIHZhciBjb3VudCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGFyZ3VtZW50TmFtZUxpc3QuZm9yRWFjaChmdW5jdGlvbihhcmdOYW1lKSB7XG4gICAgY291bnRbYXJnTmFtZV0gPSAoY291bnRbYXJnTmFtZV0gfHwgMCkgKyAxO1xuICB9KTtcblxuICAvLyBBcHBlbmQgc3Vic2NyaXB0cyAoJ18xJywgJ18yJywgLi4uKSB0byBkdXBsaWNhdGUgYXJndW1lbnQgbmFtZXMuXG4gIE9iamVjdC5rZXlzKGNvdW50KS5mb3JFYWNoKGZ1bmN0aW9uKGR1cEFyZ05hbWUpIHtcbiAgICBpZiAoY291bnRbZHVwQXJnTmFtZV0gPD0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbmFtZSBzaG93cyB1cCBtb3JlIHRoYW4gb25jZSwgc28gYWRkIHN1YnNjcmlwdHMuXG4gICAgdmFyIHN1YnNjcmlwdCA9IDE7XG4gICAgYXJndW1lbnROYW1lTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGFyZ05hbWUsIGlkeCkge1xuICAgICAgaWYgKGFyZ05hbWUgPT09IGR1cEFyZ05hbWUpIHtcbiAgICAgICAgYXJndW1lbnROYW1lTGlzdFtpZHhdID0gYXJnTmFtZSArICdfJyArIHN1YnNjcmlwdCsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gYXJndW1lbnROYW1lTGlzdDtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgpLm1hcChmdW5jdGlvbihleHByQXJndW1lbnRTdHJpbmcpIHtcbiAgICByZXR1cm4gZXhwckFyZ3VtZW50U3RyaW5nW2V4cHJBcmd1bWVudFN0cmluZy5sZW5ndGggLSAxXSA9PT0gJ3MnID9cbiAgICAgICAgZXhwckFyZ3VtZW50U3RyaW5nICsgJ2VzJyA6XG4gICAgICAgIGV4cHJBcmd1bWVudFN0cmluZyArICdzJztcbiAgfSk7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgpLm1hcChmdW5jdGlvbihhcmdOYW1lKSB7XG4gICAgcmV0dXJuICdvcHQnICsgYXJnTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgYXJnTmFtZS5zbGljZSgxKTtcbiAgfSk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4KSB7XG4gIHJldHVybiBbdGhpcy5ydWxlTmFtZV07XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgpIHtcbiAgcmV0dXJuICckJyArIGZpcnN0QXJnSW5kZXg7XG59O1xuXG4vLyBcIlZhbHVlIHBleHByc1wiIChWYWx1ZSwgU3RyLCBBcnIsIE9iaikgYXJlIGdvaW5nIGF3YXkgc29vbiwgc28gd2UgZG9uJ3Qgd29ycnkgYWJvdXQgdGhlbSBoZXJlLlxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBQRXhwciwgZm9yIHVzZSBhcyBhIFVJIGxhYmVsLCBldGMuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGNvbW1vbi5hYnN0cmFjdCgndG9EaXNwbGF5U3RyaW5nJyk7XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuU2VxLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5MZXgucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgIHJldHVybiB0aGlzLmludGVydmFsLnRyaW1tZWQoKS5jb250ZW50cztcbiAgfVxuICByZXR1cm4gJ1snICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJ10nO1xufTtcblxucGV4cHJzLmFueS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdhbnknO1xufTtcblxucGV4cHJzLmVuZC50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdlbmQnO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmZyb20pICsgJy4uJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG8pO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcjJyArIHRoaXMuaW5kZXg7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdVbmljb2RlIHsnICsgdGhpcy5jYXRlZ29yeSArICd9IGNoYXJhY3Rlcic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEZhaWx1cmUgPSByZXF1aXJlKCcuL0ZhaWx1cmUnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRmFpbHVyZSA9IGNvbW1vbi5hYnN0cmFjdCgndG9GYWlsdXJlJyk7XG5cbnBleHBycy5hbnkudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2FueSBvYmplY3QnLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5lbmQudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2VuZCBvZiBpbnB1dCcsICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCB0aGlzLm9iaiwgJ3N0cmluZycpO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIC8vIFRPRE86IGNvbWUgdXAgd2l0aCBzb21ldGhpbmcgYmV0dGVyXG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZyb20pICsgJy4uJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG8pLCAnY29kZScpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLmV4cHIgPT09IHBleHBycy5hbnkgP1xuICAgICAgJ25vdGhpbmcnIDpcbiAgICAgICdub3QgJyArIHRoaXMuZXhwci50b0ZhaWx1cmUoZ3JhbW1hcik7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBkZXNjcmlwdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0gZ3JhbW1hci5ydWxlRGVzY3JpcHRpb25zW3RoaXMucnVsZU5hbWVdO1xuICBpZiAoIWRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIGFydGljbGUgPSAoL15bYWVpb3VBRUlPVV0vLnRlc3QodGhpcy5ydWxlTmFtZSkgPyAnYW4nIDogJ2EnKTtcbiAgICBkZXNjcmlwdGlvbiA9IGFydGljbGUgKyAnICcgKyB0aGlzLnJ1bGVOYW1lO1xuICB9XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBkZXNjcmlwdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIHRoaXMudG9EaXNwbGF5U3RyaW5nKCksICdkZXNjcmlwdGlvbicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBlMS50b1N0cmluZygpID09PSBlMi50b1N0cmluZygpID09PiBlMSBhbmQgZTIgYXJlIHNlbWFudGljYWxseSBlcXVpdmFsZW50LlxuICBOb3RlIHRoYXQgdGhpcyBpcyBub3QgYW4gaWZmICg8PT0+KTogZS5nLixcbiAgKH5cImJcIiBcImFcIikudG9TdHJpbmcoKSAhPT0gKFwiYVwiKS50b1N0cmluZygpLCBldmVuIHRob3VnaFxuICB+XCJiXCIgXCJhXCIgYW5kIFwiYVwiIGFyZSBpbnRlcmNoYW5nZWFibGUgaW4gYW55IGdyYW1tYXIsXG4gIGJvdGggaW4gdGVybXMgb2YgdGhlIGxhbmd1YWdlcyB0aGV5IGFjY2VwdCBhbmQgdGhlaXIgYXJpdGllcy5cbiovXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvU3RyaW5nID0gY29tbW9uLmFic3RyYWN0KCd0b1N0cmluZycpO1xuXG5wZXhwcnMuYW55LnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnYW55Jztcbn07XG5cbnBleHBycy5lbmQudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdlbmQnO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5mcm9tKSArICcuLicgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnRvKTtcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICckJyArIHRoaXMuaW5kZXg7XG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJyMoJyArIHRoaXMuZXhwci50b1N0cmluZygpICsgJyknO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudGVybXMubGVuZ3RoID09PSAxID9cbiAgICB0aGlzLnRlcm1zWzBdLnRvU3RyaW5nKCkgOlxuICAgICcoJyArIHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHsgcmV0dXJuIHRlcm0udG9TdHJpbmcoKTsgfSkuam9pbignIHwgJykgKyAnKSc7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5mYWN0b3JzLmxlbmd0aCA9PT0gMSA/XG4gICAgdGhpcy5mYWN0b3JzWzBdLnRvU3RyaW5nKCkgOlxuICAgICcoJyArIHRoaXMuZmFjdG9ycy5tYXAoZnVuY3Rpb24oZmFjdG9yKSB7IHJldHVybiBmYWN0b3IudG9TdHJpbmcoKTsgfSkuam9pbignICcpICsgJyknO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIgKyB0aGlzLm9wZXJhdG9yO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICd+JyArIHRoaXMuZXhwcjtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJicgKyB0aGlzLmV4cHI7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmFyZ3MubGVuZ3RoID4gMCkge1xuICAgIHZhciBwcyA9IHRoaXMuYXJncy5tYXAoZnVuY3Rpb24oYXJnKSB7IHJldHVybiBhcmcudG9TdHJpbmcoKTsgfSk7XG4gICAgcmV0dXJuIHRoaXMucnVsZU5hbWUgKyAnPCcgKyBwcy5qb2luKCcsJykgKyAnPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMucnVsZU5hbWU7XG4gIH1cbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdcXFxccHsnICsgdGhpcy5jYXRlZ29yeSArICd9Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgVW5pY29kZUNhdGVnb3JpZXMgPSByZXF1aXJlKCcuLi90aGlyZF9wYXJ0eS9Vbmljb2RlQ2F0ZWdvcmllcycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBHZW5lcmFsIHN0dWZmXG5cbmZ1bmN0aW9uIFBFeHByKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJQRXhwciBjYW5ub3QgYmUgaW5zdGFudGlhdGVkIC0tIGl0J3MgYWJzdHJhY3RcIik7XG59XG5cbi8vIFNldCB0aGUgYGludGVydmFsYCBwcm9wZXJ0eSB0byB0aGUgaW50ZXJ2YWwgY29udGFpbmluZyB0aGUgc291cmNlIGZvciB0aGlzIGV4cHJlc3Npb24uXG5QRXhwci5wcm90b3R5cGUud2l0aEludGVydmFsID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgaWYgKGludGVydmFsKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsLnRyaW1tZWQoKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIEFueVxuXG52YXIgYW55ID0gT2JqZWN0LmNyZWF0ZShQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBFbmRcblxudmFyIGVuZCA9IE9iamVjdC5jcmVhdGUoUEV4cHIucHJvdG90eXBlKTtcblxuLy8gVGVybWluYWxzXG5cbmZ1bmN0aW9uIFRlcm1pbmFsKG9iaikge1xuICB0aGlzLm9iaiA9IG9iajtcbn1cbmluaGVyaXRzKFRlcm1pbmFsLCBQRXhwcik7XG5cbi8vIFJhbmdlc1xuXG5mdW5jdGlvbiBSYW5nZShmcm9tLCB0bykge1xuICB0aGlzLmZyb20gPSBmcm9tO1xuICB0aGlzLnRvID0gdG87XG59XG5pbmhlcml0cyhSYW5nZSwgUEV4cHIpO1xuXG4vLyBQYXJhbWV0ZXJzXG5cbmZ1bmN0aW9uIFBhcmFtKGluZGV4KSB7XG4gIHRoaXMuaW5kZXggPSBpbmRleDtcbn1cbmluaGVyaXRzKFBhcmFtLCBQRXhwcik7XG5cbi8vIEFsdGVybmF0aW9uXG5cbmZ1bmN0aW9uIEFsdCh0ZXJtcykge1xuICB0aGlzLnRlcm1zID0gdGVybXM7XG59XG5pbmhlcml0cyhBbHQsIFBFeHByKTtcblxuLy8gRXh0ZW5kIGlzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbCBvZiBydWxlIGV4dGVuc2lvblxuXG5mdW5jdGlvbiBFeHRlbmQoc3VwZXJHcmFtbWFyLCBuYW1lLCBib2R5KSB7XG4gIHRoaXMuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmJvZHkgPSBib2R5O1xuICB2YXIgb3JpZ0JvZHkgPSBzdXBlckdyYW1tYXIucnVsZUJvZGllc1tuYW1lXTtcbiAgdGhpcy50ZXJtcyA9IFtib2R5LCBvcmlnQm9keV07XG59XG5pbmhlcml0cyhFeHRlbmQsIEFsdCk7XG5cbi8vIFNlcXVlbmNlc1xuXG5mdW5jdGlvbiBTZXEoZmFjdG9ycykge1xuICB0aGlzLmZhY3RvcnMgPSBmYWN0b3JzO1xufVxuaW5oZXJpdHMoU2VxLCBQRXhwcik7XG5cbi8vIEl0ZXJhdG9ycyBhbmQgb3B0aW9uYWxzXG5cbmZ1bmN0aW9uIEl0ZXIoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoSXRlciwgUEV4cHIpO1xuXG5mdW5jdGlvbiBTdGFyKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKFN0YXIsIEl0ZXIpO1xuXG5mdW5jdGlvbiBQbHVzKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKFBsdXMsIEl0ZXIpO1xuXG5mdW5jdGlvbiBPcHQoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoT3B0LCBJdGVyKTtcblxuU3Rhci5wcm90b3R5cGUub3BlcmF0b3IgPSAnKic7XG5QbHVzLnByb3RvdHlwZS5vcGVyYXRvciA9ICcrJztcbk9wdC5wcm90b3R5cGUub3BlcmF0b3IgPSAnPyc7XG5cblN0YXIucHJvdG90eXBlLm1pbk51bU1hdGNoZXMgPSAwO1xuUGx1cy5wcm90b3R5cGUubWluTnVtTWF0Y2hlcyA9IDE7XG5PcHQucHJvdG90eXBlLm1pbk51bU1hdGNoZXMgPSAwO1xuXG5TdGFyLnByb3RvdHlwZS5tYXhOdW1NYXRjaGVzID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuUGx1cy5wcm90b3R5cGUubWF4TnVtTWF0Y2hlcyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbk9wdC5wcm90b3R5cGUubWF4TnVtTWF0Y2hlcyA9IDE7XG5cbi8vIFByZWRpY2F0ZXNcblxuZnVuY3Rpb24gTm90KGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKE5vdCwgUEV4cHIpO1xuXG5mdW5jdGlvbiBMb29rYWhlYWQoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoTG9va2FoZWFkLCBQRXhwcik7XG5cbi8vIFwiTGV4aWZpY2F0aW9uXCJcblxuZnVuY3Rpb24gTGV4KGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKExleCwgUEV4cHIpO1xuXG4vLyBBcnJheSBkZWNvbXBvc2l0aW9uXG5cbmZ1bmN0aW9uIEFycihleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhBcnIsIFBFeHByKTtcblxuLy8gU3RyaW5nIGRlY29tcG9zaXRpb25cblxuZnVuY3Rpb24gU3RyKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKFN0ciwgUEV4cHIpO1xuXG4vLyBPYmplY3QgZGVjb21wb3NpdGlvblxuXG5mdW5jdGlvbiBPYmoocHJvcGVydGllcywgaXNMZW5pZW50KSB7XG4gIHZhciBuYW1lcyA9IHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uKHByb3BlcnR5KSB7IHJldHVybiBwcm9wZXJ0eS5uYW1lOyB9KTtcbiAgdmFyIGR1cGxpY2F0ZXMgPSBjb21tb24uZ2V0RHVwbGljYXRlcyhuYW1lcyk7XG4gIGlmIChkdXBsaWNhdGVzLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBlcnJvcnMuZHVwbGljYXRlUHJvcGVydHlOYW1lcyhkdXBsaWNhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIHRoaXMuaXNMZW5pZW50ID0gaXNMZW5pZW50O1xuICB9XG59XG5pbmhlcml0cyhPYmosIFBFeHByKTtcblxuLy8gUnVsZSBhcHBsaWNhdGlvblxuXG5mdW5jdGlvbiBBcHBseShydWxlTmFtZSwgb3B0QXJncykge1xuICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gIHRoaXMuYXJncyA9IG9wdEFyZ3MgfHwgW107XG59XG5pbmhlcml0cyhBcHBseSwgUEV4cHIpO1xuXG5BcHBseS5wcm90b3R5cGUuaXNTeW50YWN0aWMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGNvbW1vbi5pc1N5bnRhY3RpYyh0aGlzLnJ1bGVOYW1lKTtcbn07XG5cbi8vIFRoaXMgbWV0aG9kIGp1c3QgY2FjaGVzIHRoZSByZXN1bHQgb2YgYHRoaXMudG9TdHJpbmcoKWAgaW4gYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eS5cbkFwcGx5LnByb3RvdHlwZS50b01lbW9LZXkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9tZW1vS2V5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfbWVtb0tleScsIHt2YWx1ZTogdGhpcy50b1N0cmluZygpfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX21lbW9LZXk7XG59O1xuXG4vLyBVbmljb2RlIGNoYXJhY3RlclxuXG5mdW5jdGlvbiBVbmljb2RlQ2hhcihjYXRlZ29yeSkge1xuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gIHRoaXMucGF0dGVybiA9IFVuaWNvZGVDYXRlZ29yaWVzW2NhdGVnb3J5XTtcbn1cbmluaGVyaXRzKFVuaWNvZGVDaGFyLCBQRXhwcik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLlBFeHByID0gUEV4cHI7XG5leHBvcnRzLmFueSA9IGFueTtcbmV4cG9ydHMuZW5kID0gZW5kO1xuZXhwb3J0cy5UZXJtaW5hbCA9IFRlcm1pbmFsO1xuZXhwb3J0cy5SYW5nZSA9IFJhbmdlO1xuZXhwb3J0cy5QYXJhbSA9IFBhcmFtO1xuZXhwb3J0cy5BbHQgPSBBbHQ7XG5leHBvcnRzLkV4dGVuZCA9IEV4dGVuZDtcbmV4cG9ydHMuU2VxID0gU2VxO1xuZXhwb3J0cy5JdGVyID0gSXRlcjtcbmV4cG9ydHMuU3RhciA9IFN0YXI7XG5leHBvcnRzLlBsdXMgPSBQbHVzO1xuZXhwb3J0cy5PcHQgPSBPcHQ7XG5leHBvcnRzLk5vdCA9IE5vdDtcbmV4cG9ydHMuTG9va2FoZWFkID0gTG9va2FoZWFkO1xuZXhwb3J0cy5MZXggPSBMZXg7XG5leHBvcnRzLkFyciA9IEFycjtcbmV4cG9ydHMuU3RyID0gU3RyO1xuZXhwb3J0cy5PYmogPSBPYmo7XG5leHBvcnRzLkFwcGx5ID0gQXBwbHk7XG5leHBvcnRzLlVuaWNvZGVDaGFyID0gVW5pY29kZUNoYXI7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHRlbnNpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5yZXF1aXJlKCcuL3BleHBycy1hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlJyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCcpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHknKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtY2hlY2snKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWV2YWwnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWdldEFyaXR5Jyk7XG5yZXF1aXJlKCcuL3BleHBycy1vdXRwdXRSZWNpcGUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWludHJvZHVjZVBhcmFtcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtaXNOdWxsYWJsZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtc3Vic3RpdHV0ZVBhcmFtcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9EaXNwbGF5U3RyaW5nJyk7XG5yZXF1aXJlKCcuL3BleHBycy10b0FyZ3VtZW50TmFtZUxpc3QnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLXRvRmFpbHVyZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9TdHJpbmcnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR2l2ZW4gYW4gYXJyYXkgb2YgbnVtYmVycyBgYXJyYCwgcmV0dXJuIGFuIGFycmF5IG9mIHRoZSBudW1iZXJzIGFzIHN0cmluZ3MsXG4vLyByaWdodC1qdXN0aWZpZWQgYW5kIHBhZGRlZCB0byB0aGUgc2FtZSBsZW5ndGguXG5mdW5jdGlvbiBwYWROdW1iZXJzVG9FcXVhbExlbmd0aChhcnIpIHtcbiAgdmFyIG1heExlbiA9IDA7XG4gIHZhciBzdHJpbmdzID0gYXJyLm1hcChmdW5jdGlvbihuKSB7XG4gICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKTtcbiAgICBtYXhMZW4gPSBNYXRoLm1heChtYXhMZW4sIHN0ci5sZW5ndGgpO1xuICAgIHJldHVybiBzdHI7XG4gIH0pO1xuICByZXR1cm4gc3RyaW5ncy5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gY29tbW9uLnBhZExlZnQocywgbWF4TGVuKTsgfSk7XG59XG5cbi8vIFByb2R1Y2UgYSBuZXcgc3RyaW5nIHRoYXQgd291bGQgYmUgdGhlIHJlc3VsdCBvZiBjb3B5aW5nIHRoZSBjb250ZW50c1xuLy8gb2YgdGhlIHN0cmluZyBgc3JjYCBvbnRvIGBkZXN0YCBhdCBvZmZzZXQgYG9mZmVzdGAuXG5mdW5jdGlvbiBzdHJjcHkoZGVzdCwgc3JjLCBvZmZzZXQpIHtcbiAgdmFyIG9yaWdEZXN0TGVuID0gZGVzdC5sZW5ndGg7XG4gIHZhciBzdGFydCA9IGRlc3Quc2xpY2UoMCwgb2Zmc2V0KTtcbiAgdmFyIGVuZCA9IGRlc3Quc2xpY2Uob2Zmc2V0ICsgc3JjLmxlbmd0aCk7XG4gIHJldHVybiAoc3RhcnQgKyBzcmMgKyBlbmQpLnN1YnN0cigwLCBvcmlnRGVzdExlbik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBSZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuXG4vLyBvZmZzZXQgaW4gYHN0cmAuXG5leHBvcnRzLmdldExpbmVBbmRDb2x1bW4gPSBmdW5jdGlvbihzdHIsIG9mZnNldCkge1xuICB2YXIgbGluZU51bSA9IDE7XG4gIHZhciBjb2xOdW0gPSAxO1xuXG4gIHZhciBjdXJyT2Zmc2V0ID0gMDtcbiAgdmFyIGxpbmVTdGFydE9mZnNldCA9IDA7XG5cbiAgdmFyIG5leHRMaW5lID0gbnVsbDtcbiAgdmFyIHByZXZMaW5lID0gbnVsbDtcbiAgdmFyIHByZXZMaW5lU3RhcnRPZmZzZXQgPSAtMTtcblxuICB3aGlsZSAoY3Vyck9mZnNldCA8IG9mZnNldCkge1xuICAgIHZhciBjID0gc3RyLmNoYXJBdChjdXJyT2Zmc2V0KyspO1xuICAgIGlmIChjID09PSAnXFxuJykge1xuICAgICAgbGluZU51bSsrO1xuICAgICAgY29sTnVtID0gMTtcbiAgICAgIHByZXZMaW5lU3RhcnRPZmZzZXQgPSBsaW5lU3RhcnRPZmZzZXQ7XG4gICAgICBsaW5lU3RhcnRPZmZzZXQgPSBjdXJyT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAoYyAhPT0gJ1xccicpIHtcbiAgICAgIGNvbE51bSsrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGVuZCBvZiB0aGUgdGFyZ2V0IGxpbmUuXG4gIHZhciBsaW5lRW5kT2Zmc2V0ID0gc3RyLmluZGV4T2YoJ1xcbicsIGxpbmVTdGFydE9mZnNldCk7XG4gIGlmIChsaW5lRW5kT2Zmc2V0ID09PSAtMSkge1xuICAgIGxpbmVFbmRPZmZzZXQgPSBzdHIubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgbmV4dCBsaW5lLlxuICAgIHZhciBuZXh0TGluZUVuZE9mZnNldCA9IHN0ci5pbmRleE9mKCdcXG4nLCBsaW5lRW5kT2Zmc2V0ICsgMSk7XG4gICAgbmV4dExpbmUgPSBuZXh0TGluZUVuZE9mZnNldCA9PT0gLTEgPyBzdHIuc2xpY2UobGluZUVuZE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0ci5zbGljZShsaW5lRW5kT2Zmc2V0LCBuZXh0TGluZUVuZE9mZnNldCk7XG4gICAgLy8gU3RyaXAgbGVhZGluZyBhbmQgdHJhaWxpbmcgRU9MIGNoYXIocykuXG4gICAgbmV4dExpbmUgPSBuZXh0TGluZS5yZXBsYWNlKC9eXFxyP1xcbi8sICcnKS5yZXBsYWNlKC9cXHIkLywgJycpO1xuICB9XG5cbiAgLy8gR2V0IHRoZSBwcmV2aW91cyBsaW5lLlxuICBpZiAocHJldkxpbmVTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgcHJldkxpbmUgPSBzdHIuc2xpY2UocHJldkxpbmVTdGFydE9mZnNldCwgbGluZVN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccj9cXG4kLywgJycpOyAgLy8gU3RyaXAgdHJhaWxpbmcgRU9MIGNoYXIocykuXG4gIH1cblxuICAvLyBHZXQgdGhlIHRhcmdldCBsaW5lLCBzdHJpcHBpbmcgYSB0cmFpbGluZyBjYXJyaWFnZSByZXR1cm4gaWYgbmVjZXNzYXJ5LlxuICB2YXIgbGluZSA9IHN0ci5zbGljZShsaW5lU3RhcnRPZmZzZXQsIGxpbmVFbmRPZmZzZXQpLnJlcGxhY2UoL1xcciQvLCAnJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lTnVtOiBsaW5lTnVtLFxuICAgIGNvbE51bTogY29sTnVtLFxuICAgIGxpbmU6IGxpbmUsXG4gICAgcHJldkxpbmU6IHByZXZMaW5lLFxuICAgIG5leHRMaW5lOiBuZXh0TGluZVxuICB9O1xufTtcblxuLy8gUmV0dXJuIGEgbmljZWx5LWZvcm1hdHRlZCBzdHJpbmcgZGVzY3JpYmluZyB0aGUgbGluZSBhbmQgY29sdW1uIGZvciB0aGVcbi8vIGdpdmVuIG9mZnNldCBpbiBgc3RyYC5cbmV4cG9ydHMuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UgPSBmdW5jdGlvbihzdHIsIG9mZnNldCAvKiAuLi5yYW5nZXMgKi8pIHtcbiAgdmFyIHJlcGVhdFN0ciA9IGNvbW1vbi5yZXBlYXRTdHI7XG5cbiAgdmFyIGxpbmVBbmRDb2wgPSBleHBvcnRzLmdldExpbmVBbmRDb2x1bW4oc3RyLCBvZmZzZXQpO1xuICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICBzYi5hcHBlbmQoJ0xpbmUgJyArIGxpbmVBbmRDb2wubGluZU51bSArICcsIGNvbCAnICsgbGluZUFuZENvbC5jb2xOdW0gKyAnOlxcbicpO1xuXG4gIC8vIEFuIGFycmF5IG9mIHRoZSBwcmV2aW91cywgY3VycmVudCwgYW5kIG5leHQgbGluZSBudW1iZXJzIGFzIHN0cmluZ3Mgb2YgZXF1YWwgbGVuZ3RoLlxuICB2YXIgbGluZU51bWJlcnMgPSBwYWROdW1iZXJzVG9FcXVhbExlbmd0aChbXG4gICAgICBsaW5lQW5kQ29sLnByZXZMaW5lID09IG51bGwgPyAwIDogbGluZUFuZENvbC5saW5lTnVtIC0gMSxcbiAgICAgIGxpbmVBbmRDb2wubGluZU51bSxcbiAgICAgIGxpbmVBbmRDb2wubmV4dExpbmUgPT0gbnVsbCA/IDAgOiBsaW5lQW5kQ29sLmxpbmVOdW0gKyAxXG4gIF0pO1xuXG4gIC8vIEhlbHBlciBmb3IgYXBwZW5kaW5nIGZvcm1hdHRpbmcgaW5wdXQgbGluZXMgdG8gdGhlIGJ1ZmZlci5cbiAgZnVuY3Rpb24gYXBwZW5kTGluZShudW0sIGNvbnRlbnQsIHByZWZpeCkge1xuICAgIHNiLmFwcGVuZChwcmVmaXggKyBsaW5lTnVtYmVyc1tudW1dICsgJyB8ICcgKyBjb250ZW50ICsgJ1xcbicpO1xuICB9XG5cbiAgLy8gSW5jbHVkZSB0aGUgcHJldmlvdXMgbGluZSBmb3IgY29udGV4dCBpZiBwb3NzaWJsZS5cbiAgaWYgKGxpbmVBbmRDb2wucHJldkxpbmUgIT0gbnVsbCkge1xuICAgIGFwcGVuZExpbmUoMCwgbGluZUFuZENvbC5wcmV2TGluZSwgJyAgJyk7XG4gIH1cbiAgLy8gTGluZSB0aGF0IHRoZSBlcnJvciBvY2N1cnJlZCBvbi5cbiAgYXBwZW5kTGluZSgxLCBsaW5lQW5kQ29sLmxpbmUsICc+ICcpO1xuXG4gIC8vIEJ1aWxkIHVwIHRoZSBsaW5lIHRoYXQgcG9pbnRzIHRvIHRoZSBvZmZzZXQgYW5kIHBvc3NpYmxlIGluZGljYXRlcyBvbmUgb3IgbW9yZSByYW5nZXMuXG4gIC8vIFN0YXJ0IHdpdGggYSBibGFuayBsaW5lLCBhbmQgaW5kaWNhdGUgZWFjaCByYW5nZSBieSBvdmVybGF5aW5nIGEgc3RyaW5nIG9mIGB+YCBjaGFycy5cbiAgdmFyIGxpbmVMZW4gPSBsaW5lQW5kQ29sLmxpbmUubGVuZ3RoO1xuICB2YXIgaW5kaWNhdGlvbkxpbmUgPSByZXBlYXRTdHIoJyAnLCBsaW5lTGVuICsgMSk7XG4gIHZhciByYW5nZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBzdGFydElkeCA9IHJhbmdlc1tpXVswXTtcbiAgICB2YXIgZW5kSWR4ID0gcmFuZ2VzW2ldWzFdO1xuICAgIGNvbW1vbi5hc3NlcnQoc3RhcnRJZHggPj0gMCAmJiBzdGFydElkeCA8PSBlbmRJZHgsICdyYW5nZSBzdGFydCBtdXN0IGJlID49IDAgYW5kIDw9IGVuZCcpO1xuXG4gICAgdmFyIGxpbmVTdGFydE9mZnNldCA9IG9mZnNldCAtIGxpbmVBbmRDb2wuY29sTnVtICsgMTtcbiAgICBzdGFydElkeCA9IE1hdGgubWF4KDAsIHN0YXJ0SWR4IC0gbGluZVN0YXJ0T2Zmc2V0KTtcbiAgICBlbmRJZHggPSBNYXRoLm1pbihlbmRJZHggLSBsaW5lU3RhcnRPZmZzZXQsIGxpbmVMZW4pO1xuXG4gICAgaW5kaWNhdGlvbkxpbmUgPSBzdHJjcHkoaW5kaWNhdGlvbkxpbmUsIHJlcGVhdFN0cignficsIGVuZElkeCAtIHN0YXJ0SWR4KSwgc3RhcnRJZHgpO1xuICB9XG4gIHZhciBndXR0ZXJXaWR0aCA9IDIgKyBsaW5lTnVtYmVyc1sxXS5sZW5ndGggKyAzO1xuICBzYi5hcHBlbmQocmVwZWF0U3RyKCcgJywgZ3V0dGVyV2lkdGgpKTtcbiAgaW5kaWNhdGlvbkxpbmUgPSBzdHJjcHkoaW5kaWNhdGlvbkxpbmUsICdeJywgbGluZUFuZENvbC5jb2xOdW0gLSAxKTtcbiAgc2IuYXBwZW5kKGluZGljYXRpb25MaW5lLnJlcGxhY2UoLyArJC8sICcnKSArICdcXG4nKTtcblxuICAvLyBJbmNsdWRlIHRoZSBuZXh0IGxpbmUgZm9yIGNvbnRleHQgaWYgcG9zc2libGUuXG4gIGlmIChsaW5lQW5kQ29sLm5leHRMaW5lICE9IG51bGwpIHtcbiAgICBhcHBlbmRMaW5lKDIsIGxpbmVBbmRDb2wubmV4dExpbmUsICcgICcpO1xuICB9XG4gIHJldHVybiBzYi5jb250ZW50cygpO1xufTtcbiIsIi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90dmN1dHNlbS9lcy1sYWIvYmxvYi9tYXN0ZXIvc3JjL3BhcnNlci91bmljb2RlLmpzLlxuLy8gVGhlc2UgYXJlIGp1c3QgY2F0ZWdvcmllcyB0aGF0IGFyZSB1c2VkIGluIEVTNS5cbi8vIFRoZSBmdWxsIGxpc3Qgb2YgVW5pY29kZSBjYXRlZ29yaWVzIGlzIGhlcmU6IGh0dHA6Ly93d3cuZmlsZWZvcm1hdC5pbmZvL2luZm8vdW5pY29kZS9jYXRlZ29yeS9pbmRleC5odG0uXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gTGV0dGVyc1xuICBMdTogL1tcXHUwMDQxLVxcdTAwNUFdfFtcXHUwMEMwLVxcdTAwRDZdfFtcXHUwMEQ4LVxcdTAwREVdfFtcXHUwMTAwLVxcdTAxMDBdfFtcXHUwMTAyLVxcdTAxMDJdfFtcXHUwMTA0LVxcdTAxMDRdfFtcXHUwMTA2LVxcdTAxMDZdfFtcXHUwMTA4LVxcdTAxMDhdfFtcXHUwMTBBLVxcdTAxMEFdfFtcXHUwMTBDLVxcdTAxMENdfFtcXHUwMTBFLVxcdTAxMEVdfFtcXHUwMTEwLVxcdTAxMTBdfFtcXHUwMTEyLVxcdTAxMTJdfFtcXHUwMTE0LVxcdTAxMTRdfFtcXHUwMTE2LVxcdTAxMTZdfFtcXHUwMTE4LVxcdTAxMThdfFtcXHUwMTFBLVxcdTAxMUFdfFtcXHUwMTFDLVxcdTAxMUNdfFtcXHUwMTFFLVxcdTAxMUVdfFtcXHUwMTIwLVxcdTAxMjBdfFtcXHUwMTIyLVxcdTAxMjJdfFtcXHUwMTI0LVxcdTAxMjRdfFtcXHUwMTI2LVxcdTAxMjZdfFtcXHUwMTI4LVxcdTAxMjhdfFtcXHUwMTJBLVxcdTAxMkFdfFtcXHUwMTJDLVxcdTAxMkNdfFtcXHUwMTJFLVxcdTAxMkVdfFtcXHUwMTMwLVxcdTAxMzBdfFtcXHUwMTMyLVxcdTAxMzJdfFtcXHUwMTM0LVxcdTAxMzRdfFtcXHUwMTM2LVxcdTAxMzZdfFtcXHUwMTM5LVxcdTAxMzldfFtcXHUwMTNCLVxcdTAxM0JdfFtcXHUwMTNELVxcdTAxM0RdfFtcXHUwMTNGLVxcdTAxM0ZdfFtcXHUwMTQxLVxcdTAxNDFdfFtcXHUwMTQzLVxcdTAxNDNdfFtcXHUwMTQ1LVxcdTAxNDVdfFtcXHUwMTQ3LVxcdTAxNDddfFtcXHUwMTRBLVxcdTAxNEFdfFtcXHUwMTRDLVxcdTAxNENdfFtcXHUwMTRFLVxcdTAxNEVdfFtcXHUwMTUwLVxcdTAxNTBdfFtcXHUwMTUyLVxcdTAxNTJdfFtcXHUwMTU0LVxcdTAxNTRdfFtcXHUwMTU2LVxcdTAxNTZdfFtcXHUwMTU4LVxcdTAxNThdfFtcXHUwMTVBLVxcdTAxNUFdfFtcXHUwMTVDLVxcdTAxNUNdfFtcXHUwMTVFLVxcdTAxNUVdfFtcXHUwMTYwLVxcdTAxNjBdfFtcXHUwMTYyLVxcdTAxNjJdfFtcXHUwMTY0LVxcdTAxNjRdfFtcXHUwMTY2LVxcdTAxNjZdfFtcXHUwMTY4LVxcdTAxNjhdfFtcXHUwMTZBLVxcdTAxNkFdfFtcXHUwMTZDLVxcdTAxNkNdfFtcXHUwMTZFLVxcdTAxNkVdfFtcXHUwMTcwLVxcdTAxNzBdfFtcXHUwMTcyLVxcdTAxNzJdfFtcXHUwMTc0LVxcdTAxNzRdfFtcXHUwMTc2LVxcdTAxNzZdfFtcXHUwMTc4LVxcdTAxNzldfFtcXHUwMTdCLVxcdTAxN0JdfFtcXHUwMTdELVxcdTAxN0RdfFtcXHUwMTgxLVxcdTAxODJdfFtcXHUwMTg0LVxcdTAxODRdfFtcXHUwMTg2LVxcdTAxODddfFtcXHUwMTg5LVxcdTAxOEJdfFtcXHUwMThFLVxcdTAxOTFdfFtcXHUwMTkzLVxcdTAxOTRdfFtcXHUwMTk2LVxcdTAxOThdfFtcXHUwMTlDLVxcdTAxOURdfFtcXHUwMTlGLVxcdTAxQTBdfFtcXHUwMUEyLVxcdTAxQTJdfFtcXHUwMUE0LVxcdTAxQTRdfFtcXHUwMUE2LVxcdTAxQTddfFtcXHUwMUE5LVxcdTAxQTldfFtcXHUwMUFDLVxcdTAxQUNdfFtcXHUwMUFFLVxcdTAxQUZdfFtcXHUwMUIxLVxcdTAxQjNdfFtcXHUwMUI1LVxcdTAxQjVdfFtcXHUwMUI3LVxcdTAxQjhdfFtcXHUwMUJDLVxcdTAxQkNdfFtcXHUwMUM0LVxcdTAxQzRdfFtcXHUwMUM3LVxcdTAxQzddfFtcXHUwMUNBLVxcdTAxQ0FdfFtcXHUwMUNELVxcdTAxQ0RdfFtcXHUwMUNGLVxcdTAxQ0ZdfFtcXHUwMUQxLVxcdTAxRDFdfFtcXHUwMUQzLVxcdTAxRDNdfFtcXHUwMUQ1LVxcdTAxRDVdfFtcXHUwMUQ3LVxcdTAxRDddfFtcXHUwMUQ5LVxcdTAxRDldfFtcXHUwMURCLVxcdTAxREJdfFtcXHUwMURFLVxcdTAxREVdfFtcXHUwMUUwLVxcdTAxRTBdfFtcXHUwMUUyLVxcdTAxRTJdfFtcXHUwMUU0LVxcdTAxRTRdfFtcXHUwMUU2LVxcdTAxRTZdfFtcXHUwMUU4LVxcdTAxRThdfFtcXHUwMUVBLVxcdTAxRUFdfFtcXHUwMUVDLVxcdTAxRUNdfFtcXHUwMUVFLVxcdTAxRUVdfFtcXHUwMUYxLVxcdTAxRjFdfFtcXHUwMUY0LVxcdTAxRjRdfFtcXHUwMUZBLVxcdTAxRkFdfFtcXHUwMUZDLVxcdTAxRkNdfFtcXHUwMUZFLVxcdTAxRkVdfFtcXHUwMjAwLVxcdTAyMDBdfFtcXHUwMjAyLVxcdTAyMDJdfFtcXHUwMjA0LVxcdTAyMDRdfFtcXHUwMjA2LVxcdTAyMDZdfFtcXHUwMjA4LVxcdTAyMDhdfFtcXHUwMjBBLVxcdTAyMEFdfFtcXHUwMjBDLVxcdTAyMENdfFtcXHUwMjBFLVxcdTAyMEVdfFtcXHUwMjEwLVxcdTAyMTBdfFtcXHUwMjEyLVxcdTAyMTJdfFtcXHUwMjE0LVxcdTAyMTRdfFtcXHUwMjE2LVxcdTAyMTZdfFtcXHUwMzg2LVxcdTAzODZdfFtcXHUwMzg4LVxcdTAzOEFdfFtcXHUwMzhDLVxcdTAzOENdfFtcXHUwMzhFLVxcdTAzOEZdfFtcXHUwMzkxLVxcdTAzQTFdfFtcXHUwM0EzLVxcdTAzQUJdfFtcXHUwM0QyLVxcdTAzRDRdfFtcXHUwM0RBLVxcdTAzREFdfFtcXHUwM0RDLVxcdTAzRENdfFtcXHUwM0RFLVxcdTAzREVdfFtcXHUwM0UwLVxcdTAzRTBdfFtcXHUwM0UyLVxcdTAzRTJdfFtcXHUwM0U0LVxcdTAzRTRdfFtcXHUwM0U2LVxcdTAzRTZdfFtcXHUwM0U4LVxcdTAzRThdfFtcXHUwM0VBLVxcdTAzRUFdfFtcXHUwM0VDLVxcdTAzRUNdfFtcXHUwM0VFLVxcdTAzRUVdfFtcXHUwNDAxLVxcdTA0MENdfFtcXHUwNDBFLVxcdTA0MkZdfFtcXHUwNDYwLVxcdTA0NjBdfFtcXHUwNDYyLVxcdTA0NjJdfFtcXHUwNDY0LVxcdTA0NjRdfFtcXHUwNDY2LVxcdTA0NjZdfFtcXHUwNDY4LVxcdTA0NjhdfFtcXHUwNDZBLVxcdTA0NkFdfFtcXHUwNDZDLVxcdTA0NkNdfFtcXHUwNDZFLVxcdTA0NkVdfFtcXHUwNDcwLVxcdTA0NzBdfFtcXHUwNDcyLVxcdTA0NzJdfFtcXHUwNDc0LVxcdTA0NzRdfFtcXHUwNDc2LVxcdTA0NzZdfFtcXHUwNDc4LVxcdTA0NzhdfFtcXHUwNDdBLVxcdTA0N0FdfFtcXHUwNDdDLVxcdTA0N0NdfFtcXHUwNDdFLVxcdTA0N0VdfFtcXHUwNDgwLVxcdTA0ODBdfFtcXHUwNDkwLVxcdTA0OTBdfFtcXHUwNDkyLVxcdTA0OTJdfFtcXHUwNDk0LVxcdTA0OTRdfFtcXHUwNDk2LVxcdTA0OTZdfFtcXHUwNDk4LVxcdTA0OThdfFtcXHUwNDlBLVxcdTA0OUFdfFtcXHUwNDlDLVxcdTA0OUNdfFtcXHUwNDlFLVxcdTA0OUVdfFtcXHUwNEEwLVxcdTA0QTBdfFtcXHUwNEEyLVxcdTA0QTJdfFtcXHUwNEE0LVxcdTA0QTRdfFtcXHUwNEE2LVxcdTA0QTZdfFtcXHUwNEE4LVxcdTA0QThdfFtcXHUwNEFBLVxcdTA0QUFdfFtcXHUwNEFDLVxcdTA0QUNdfFtcXHUwNEFFLVxcdTA0QUVdfFtcXHUwNEIwLVxcdTA0QjBdfFtcXHUwNEIyLVxcdTA0QjJdfFtcXHUwNEI0LVxcdTA0QjRdfFtcXHUwNEI2LVxcdTA0QjZdfFtcXHUwNEI4LVxcdTA0QjhdfFtcXHUwNEJBLVxcdTA0QkFdfFtcXHUwNEJDLVxcdTA0QkNdfFtcXHUwNEJFLVxcdTA0QkVdfFtcXHUwNEMxLVxcdTA0QzFdfFtcXHUwNEMzLVxcdTA0QzNdfFtcXHUwNEM3LVxcdTA0QzddfFtcXHUwNENCLVxcdTA0Q0JdfFtcXHUwNEQwLVxcdTA0RDBdfFtcXHUwNEQyLVxcdTA0RDJdfFtcXHUwNEQ0LVxcdTA0RDRdfFtcXHUwNEQ2LVxcdTA0RDZdfFtcXHUwNEQ4LVxcdTA0RDhdfFtcXHUwNERBLVxcdTA0REFdfFtcXHUwNERDLVxcdTA0RENdfFtcXHUwNERFLVxcdTA0REVdfFtcXHUwNEUwLVxcdTA0RTBdfFtcXHUwNEUyLVxcdTA0RTJdfFtcXHUwNEU0LVxcdTA0RTRdfFtcXHUwNEU2LVxcdTA0RTZdfFtcXHUwNEU4LVxcdTA0RThdfFtcXHUwNEVBLVxcdTA0RUFdfFtcXHUwNEVFLVxcdTA0RUVdfFtcXHUwNEYwLVxcdTA0RjBdfFtcXHUwNEYyLVxcdTA0RjJdfFtcXHUwNEY0LVxcdTA0RjRdfFtcXHUwNEY4LVxcdTA0RjhdfFtcXHUwNTMxLVxcdTA1NTZdfFtcXHUxMEEwLVxcdTEwQzVdfFtcXHUxRTAwLVxcdTFFMDBdfFtcXHUxRTAyLVxcdTFFMDJdfFtcXHUxRTA0LVxcdTFFMDRdfFtcXHUxRTA2LVxcdTFFMDZdfFtcXHUxRTA4LVxcdTFFMDhdfFtcXHUxRTBBLVxcdTFFMEFdfFtcXHUxRTBDLVxcdTFFMENdfFtcXHUxRTBFLVxcdTFFMEVdfFtcXHUxRTEwLVxcdTFFMTBdfFtcXHUxRTEyLVxcdTFFMTJdfFtcXHUxRTE0LVxcdTFFMTRdfFtcXHUxRTE2LVxcdTFFMTZdfFtcXHUxRTE4LVxcdTFFMThdfFtcXHUxRTFBLVxcdTFFMUFdfFtcXHUxRTFDLVxcdTFFMUNdfFtcXHUxRTFFLVxcdTFFMUVdfFtcXHUxRTIwLVxcdTFFMjBdfFtcXHUxRTIyLVxcdTFFMjJdfFtcXHUxRTI0LVxcdTFFMjRdfFtcXHUxRTI2LVxcdTFFMjZdfFtcXHUxRTI4LVxcdTFFMjhdfFtcXHUxRTJBLVxcdTFFMkFdfFtcXHUxRTJDLVxcdTFFMkNdfFtcXHUxRTJFLVxcdTFFMkVdfFtcXHUxRTMwLVxcdTFFMzBdfFtcXHUxRTMyLVxcdTFFMzJdfFtcXHUxRTM0LVxcdTFFMzRdfFtcXHUxRTM2LVxcdTFFMzZdfFtcXHUxRTM4LVxcdTFFMzhdfFtcXHUxRTNBLVxcdTFFM0FdfFtcXHUxRTNDLVxcdTFFM0NdfFtcXHUxRTNFLVxcdTFFM0VdfFtcXHUxRTQwLVxcdTFFNDBdfFtcXHUxRTQyLVxcdTFFNDJdfFtcXHUxRTQ0LVxcdTFFNDRdfFtcXHUxRTQ2LVxcdTFFNDZdfFtcXHUxRTQ4LVxcdTFFNDhdfFtcXHUxRTRBLVxcdTFFNEFdfFtcXHUxRTRDLVxcdTFFNENdfFtcXHUxRTRFLVxcdTFFNEVdfFtcXHUxRTUwLVxcdTFFNTBdfFtcXHUxRTUyLVxcdTFFNTJdfFtcXHUxRTU0LVxcdTFFNTRdfFtcXHUxRTU2LVxcdTFFNTZdfFtcXHUxRTU4LVxcdTFFNThdfFtcXHUxRTVBLVxcdTFFNUFdfFtcXHUxRTVDLVxcdTFFNUNdfFtcXHUxRTVFLVxcdTFFNUVdfFtcXHUxRTYwLVxcdTFFNjBdfFtcXHUxRTYyLVxcdTFFNjJdfFtcXHUxRTY0LVxcdTFFNjRdfFtcXHUxRTY2LVxcdTFFNjZdfFtcXHUxRTY4LVxcdTFFNjhdfFtcXHUxRTZBLVxcdTFFNkFdfFtcXHUxRTZDLVxcdTFFNkNdfFtcXHUxRTZFLVxcdTFFNkVdfFtcXHUxRTcwLVxcdTFFNzBdfFtcXHUxRTcyLVxcdTFFNzJdfFtcXHUxRTc0LVxcdTFFNzRdfFtcXHUxRTc2LVxcdTFFNzZdfFtcXHUxRTc4LVxcdTFFNzhdfFtcXHUxRTdBLVxcdTFFN0FdfFtcXHUxRTdDLVxcdTFFN0NdfFtcXHUxRTdFLVxcdTFFN0VdfFtcXHUxRTgwLVxcdTFFODBdfFtcXHUxRTgyLVxcdTFFODJdfFtcXHUxRTg0LVxcdTFFODRdfFtcXHUxRTg2LVxcdTFFODZdfFtcXHUxRTg4LVxcdTFFODhdfFtcXHUxRThBLVxcdTFFOEFdfFtcXHUxRThDLVxcdTFFOENdfFtcXHUxRThFLVxcdTFFOEVdfFtcXHUxRTkwLVxcdTFFOTBdfFtcXHUxRTkyLVxcdTFFOTJdfFtcXHUxRTk0LVxcdTFFOTRdfFtcXHUxRUEwLVxcdTFFQTBdfFtcXHUxRUEyLVxcdTFFQTJdfFtcXHUxRUE0LVxcdTFFQTRdfFtcXHUxRUE2LVxcdTFFQTZdfFtcXHUxRUE4LVxcdTFFQThdfFtcXHUxRUFBLVxcdTFFQUFdfFtcXHUxRUFDLVxcdTFFQUNdfFtcXHUxRUFFLVxcdTFFQUVdfFtcXHUxRUIwLVxcdTFFQjBdfFtcXHUxRUIyLVxcdTFFQjJdfFtcXHUxRUI0LVxcdTFFQjRdfFtcXHUxRUI2LVxcdTFFQjZdfFtcXHUxRUI4LVxcdTFFQjhdfFtcXHUxRUJBLVxcdTFFQkFdfFtcXHUxRUJDLVxcdTFFQkNdfFtcXHUxRUJFLVxcdTFFQkVdfFtcXHUxRUMwLVxcdTFFQzBdfFtcXHUxRUMyLVxcdTFFQzJdfFtcXHUxRUM0LVxcdTFFQzRdfFtcXHUxRUM2LVxcdTFFQzZdfFtcXHUxRUM4LVxcdTFFQzhdfFtcXHUxRUNBLVxcdTFFQ0FdfFtcXHUxRUNDLVxcdTFFQ0NdfFtcXHUxRUNFLVxcdTFFQ0VdfFtcXHUxRUQwLVxcdTFFRDBdfFtcXHUxRUQyLVxcdTFFRDJdfFtcXHUxRUQ0LVxcdTFFRDRdfFtcXHUxRUQ2LVxcdTFFRDZdfFtcXHUxRUQ4LVxcdTFFRDhdfFtcXHUxRURBLVxcdTFFREFdfFtcXHUxRURDLVxcdTFFRENdfFtcXHUxRURFLVxcdTFFREVdfFtcXHUxRUUwLVxcdTFFRTBdfFtcXHUxRUUyLVxcdTFFRTJdfFtcXHUxRUU0LVxcdTFFRTRdfFtcXHUxRUU2LVxcdTFFRTZdfFtcXHUxRUU4LVxcdTFFRThdfFtcXHUxRUVBLVxcdTFFRUFdfFtcXHUxRUVDLVxcdTFFRUNdfFtcXHUxRUVFLVxcdTFFRUVdfFtcXHUxRUYwLVxcdTFFRjBdfFtcXHUxRUYyLVxcdTFFRjJdfFtcXHUxRUY0LVxcdTFFRjRdfFtcXHUxRUY2LVxcdTFFRjZdfFtcXHUxRUY4LVxcdTFFRjhdfFtcXHUxRjA4LVxcdTFGMEZdfFtcXHUxRjE4LVxcdTFGMURdfFtcXHUxRjI4LVxcdTFGMkZdfFtcXHUxRjM4LVxcdTFGM0ZdfFtcXHUxRjQ4LVxcdTFGNERdfFtcXHUxRjU5LVxcdTFGNTldfFtcXHUxRjVCLVxcdTFGNUJdfFtcXHUxRjVELVxcdTFGNURdfFtcXHUxRjVGLVxcdTFGNUZdfFtcXHUxRjY4LVxcdTFGNkZdfFtcXHUxRjg4LVxcdTFGOEZdfFtcXHUxRjk4LVxcdTFGOUZdfFtcXHUxRkE4LVxcdTFGQUZdfFtcXHUxRkI4LVxcdTFGQkNdfFtcXHUxRkM4LVxcdTFGQ0NdfFtcXHUxRkQ4LVxcdTFGREJdfFtcXHUxRkU4LVxcdTFGRUNdfFtcXHUxRkY4LVxcdTFGRkNdfFtcXHUyMTAyLVxcdTIxMDJdfFtcXHUyMTA3LVxcdTIxMDddfFtcXHUyMTBCLVxcdTIxMERdfFtcXHUyMTEwLVxcdTIxMTJdfFtcXHUyMTE1LVxcdTIxMTVdfFtcXHUyMTE5LVxcdTIxMURdfFtcXHUyMTI0LVxcdTIxMjRdfFtcXHUyMTI2LVxcdTIxMjZdfFtcXHUyMTI4LVxcdTIxMjhdfFtcXHUyMTJBLVxcdTIxMkRdfFtcXHUyMTMwLVxcdTIxMzFdfFtcXHUyMTMzLVxcdTIxMzNdfFtcXHVGRjIxLVxcdUZGM0FdLyxcbiAgTGw6IC9bXFx1MDA2MS1cXHUwMDdBXXxbXFx1MDBBQS1cXHUwMEFBXXxbXFx1MDBCNS1cXHUwMEI1XXxbXFx1MDBCQS1cXHUwMEJBXXxbXFx1MDBERi1cXHUwMEY2XXxbXFx1MDBGOC1cXHUwMEZGXXxbXFx1MDEwMS1cXHUwMTAxXXxbXFx1MDEwMy1cXHUwMTAzXXxbXFx1MDEwNS1cXHUwMTA1XXxbXFx1MDEwNy1cXHUwMTA3XXxbXFx1MDEwOS1cXHUwMTA5XXxbXFx1MDEwQi1cXHUwMTBCXXxbXFx1MDEwRC1cXHUwMTBEXXxbXFx1MDEwRi1cXHUwMTBGXXxbXFx1MDExMS1cXHUwMTExXXxbXFx1MDExMy1cXHUwMTEzXXxbXFx1MDExNS1cXHUwMTE1XXxbXFx1MDExNy1cXHUwMTE3XXxbXFx1MDExOS1cXHUwMTE5XXxbXFx1MDExQi1cXHUwMTFCXXxbXFx1MDExRC1cXHUwMTFEXXxbXFx1MDExRi1cXHUwMTFGXXxbXFx1MDEyMS1cXHUwMTIxXXxbXFx1MDEyMy1cXHUwMTIzXXxbXFx1MDEyNS1cXHUwMTI1XXxbXFx1MDEyNy1cXHUwMTI3XXxbXFx1MDEyOS1cXHUwMTI5XXxbXFx1MDEyQi1cXHUwMTJCXXxbXFx1MDEyRC1cXHUwMTJEXXxbXFx1MDEyRi1cXHUwMTJGXXxbXFx1MDEzMS1cXHUwMTMxXXxbXFx1MDEzMy1cXHUwMTMzXXxbXFx1MDEzNS1cXHUwMTM1XXxbXFx1MDEzNy1cXHUwMTM4XXxbXFx1MDEzQS1cXHUwMTNBXXxbXFx1MDEzQy1cXHUwMTNDXXxbXFx1MDEzRS1cXHUwMTNFXXxbXFx1MDE0MC1cXHUwMTQwXXxbXFx1MDE0Mi1cXHUwMTQyXXxbXFx1MDE0NC1cXHUwMTQ0XXxbXFx1MDE0Ni1cXHUwMTQ2XXxbXFx1MDE0OC1cXHUwMTQ5XXxbXFx1MDE0Qi1cXHUwMTRCXXxbXFx1MDE0RC1cXHUwMTREXXxbXFx1MDE0Ri1cXHUwMTRGXXxbXFx1MDE1MS1cXHUwMTUxXXxbXFx1MDE1My1cXHUwMTUzXXxbXFx1MDE1NS1cXHUwMTU1XXxbXFx1MDE1Ny1cXHUwMTU3XXxbXFx1MDE1OS1cXHUwMTU5XXxbXFx1MDE1Qi1cXHUwMTVCXXxbXFx1MDE1RC1cXHUwMTVEXXxbXFx1MDE1Ri1cXHUwMTVGXXxbXFx1MDE2MS1cXHUwMTYxXXxbXFx1MDE2My1cXHUwMTYzXXxbXFx1MDE2NS1cXHUwMTY1XXxbXFx1MDE2Ny1cXHUwMTY3XXxbXFx1MDE2OS1cXHUwMTY5XXxbXFx1MDE2Qi1cXHUwMTZCXXxbXFx1MDE2RC1cXHUwMTZEXXxbXFx1MDE2Ri1cXHUwMTZGXXxbXFx1MDE3MS1cXHUwMTcxXXxbXFx1MDE3My1cXHUwMTczXXxbXFx1MDE3NS1cXHUwMTc1XXxbXFx1MDE3Ny1cXHUwMTc3XXxbXFx1MDE3QS1cXHUwMTdBXXxbXFx1MDE3Qy1cXHUwMTdDXXxbXFx1MDE3RS1cXHUwMTgwXXxbXFx1MDE4My1cXHUwMTgzXXxbXFx1MDE4NS1cXHUwMTg1XXxbXFx1MDE4OC1cXHUwMTg4XXxbXFx1MDE4Qy1cXHUwMThEXXxbXFx1MDE5Mi1cXHUwMTkyXXxbXFx1MDE5NS1cXHUwMTk1XXxbXFx1MDE5OS1cXHUwMTlCXXxbXFx1MDE5RS1cXHUwMTlFXXxbXFx1MDFBMS1cXHUwMUExXXxbXFx1MDFBMy1cXHUwMUEzXXxbXFx1MDFBNS1cXHUwMUE1XXxbXFx1MDFBOC1cXHUwMUE4XXxbXFx1MDFBQi1cXHUwMUFCXXxbXFx1MDFBRC1cXHUwMUFEXXxbXFx1MDFCMC1cXHUwMUIwXXxbXFx1MDFCNC1cXHUwMUI0XXxbXFx1MDFCNi1cXHUwMUI2XXxbXFx1MDFCOS1cXHUwMUJBXXxbXFx1MDFCRC1cXHUwMUJEXXxbXFx1MDFDNi1cXHUwMUM2XXxbXFx1MDFDOS1cXHUwMUM5XXxbXFx1MDFDQy1cXHUwMUNDXXxbXFx1MDFDRS1cXHUwMUNFXXxbXFx1MDFEMC1cXHUwMUQwXXxbXFx1MDFEMi1cXHUwMUQyXXxbXFx1MDFENC1cXHUwMUQ0XXxbXFx1MDFENi1cXHUwMUQ2XXxbXFx1MDFEOC1cXHUwMUQ4XXxbXFx1MDFEQS1cXHUwMURBXXxbXFx1MDFEQy1cXHUwMUREXXxbXFx1MDFERi1cXHUwMURGXXxbXFx1MDFFMS1cXHUwMUUxXXxbXFx1MDFFMy1cXHUwMUUzXXxbXFx1MDFFNS1cXHUwMUU1XXxbXFx1MDFFNy1cXHUwMUU3XXxbXFx1MDFFOS1cXHUwMUU5XXxbXFx1MDFFQi1cXHUwMUVCXXxbXFx1MDFFRC1cXHUwMUVEXXxbXFx1MDFFRi1cXHUwMUYwXXxbXFx1MDFGMy1cXHUwMUYzXXxbXFx1MDFGNS1cXHUwMUY1XXxbXFx1MDFGQi1cXHUwMUZCXXxbXFx1MDFGRC1cXHUwMUZEXXxbXFx1MDFGRi1cXHUwMUZGXXxbXFx1MDIwMS1cXHUwMjAxXXxbXFx1MDIwMy1cXHUwMjAzXXxbXFx1MDIwNS1cXHUwMjA1XXxbXFx1MDIwNy1cXHUwMjA3XXxbXFx1MDIwOS1cXHUwMjA5XXxbXFx1MDIwQi1cXHUwMjBCXXxbXFx1MDIwRC1cXHUwMjBEXXxbXFx1MDIwRi1cXHUwMjBGXXxbXFx1MDIxMS1cXHUwMjExXXxbXFx1MDIxMy1cXHUwMjEzXXxbXFx1MDIxNS1cXHUwMjE1XXxbXFx1MDIxNy1cXHUwMjE3XXxbXFx1MDI1MC1cXHUwMkE4XXxbXFx1MDM5MC1cXHUwMzkwXXxbXFx1MDNBQy1cXHUwM0NFXXxbXFx1MDNEMC1cXHUwM0QxXXxbXFx1MDNENS1cXHUwM0Q2XXxbXFx1MDNFMy1cXHUwM0UzXXxbXFx1MDNFNS1cXHUwM0U1XXxbXFx1MDNFNy1cXHUwM0U3XXxbXFx1MDNFOS1cXHUwM0U5XXxbXFx1MDNFQi1cXHUwM0VCXXxbXFx1MDNFRC1cXHUwM0VEXXxbXFx1MDNFRi1cXHUwM0YyXXxbXFx1MDQzMC1cXHUwNDRGXXxbXFx1MDQ1MS1cXHUwNDVDXXxbXFx1MDQ1RS1cXHUwNDVGXXxbXFx1MDQ2MS1cXHUwNDYxXXxbXFx1MDQ2My1cXHUwNDYzXXxbXFx1MDQ2NS1cXHUwNDY1XXxbXFx1MDQ2Ny1cXHUwNDY3XXxbXFx1MDQ2OS1cXHUwNDY5XXxbXFx1MDQ2Qi1cXHUwNDZCXXxbXFx1MDQ2RC1cXHUwNDZEXXxbXFx1MDQ2Ri1cXHUwNDZGXXxbXFx1MDQ3MS1cXHUwNDcxXXxbXFx1MDQ3My1cXHUwNDczXXxbXFx1MDQ3NS1cXHUwNDc1XXxbXFx1MDQ3Ny1cXHUwNDc3XXxbXFx1MDQ3OS1cXHUwNDc5XXxbXFx1MDQ3Qi1cXHUwNDdCXXxbXFx1MDQ3RC1cXHUwNDdEXXxbXFx1MDQ3Ri1cXHUwNDdGXXxbXFx1MDQ4MS1cXHUwNDgxXXxbXFx1MDQ5MS1cXHUwNDkxXXxbXFx1MDQ5My1cXHUwNDkzXXxbXFx1MDQ5NS1cXHUwNDk1XXxbXFx1MDQ5Ny1cXHUwNDk3XXxbXFx1MDQ5OS1cXHUwNDk5XXxbXFx1MDQ5Qi1cXHUwNDlCXXxbXFx1MDQ5RC1cXHUwNDlEXXxbXFx1MDQ5Ri1cXHUwNDlGXXxbXFx1MDRBMS1cXHUwNEExXXxbXFx1MDRBMy1cXHUwNEEzXXxbXFx1MDRBNS1cXHUwNEE1XXxbXFx1MDRBNy1cXHUwNEE3XXxbXFx1MDRBOS1cXHUwNEE5XXxbXFx1MDRBQi1cXHUwNEFCXXxbXFx1MDRBRC1cXHUwNEFEXXxbXFx1MDRBRi1cXHUwNEFGXXxbXFx1MDRCMS1cXHUwNEIxXXxbXFx1MDRCMy1cXHUwNEIzXXxbXFx1MDRCNS1cXHUwNEI1XXxbXFx1MDRCNy1cXHUwNEI3XXxbXFx1MDRCOS1cXHUwNEI5XXxbXFx1MDRCQi1cXHUwNEJCXXxbXFx1MDRCRC1cXHUwNEJEXXxbXFx1MDRCRi1cXHUwNEJGXXxbXFx1MDRDMi1cXHUwNEMyXXxbXFx1MDRDNC1cXHUwNEM0XXxbXFx1MDRDOC1cXHUwNEM4XXxbXFx1MDRDQy1cXHUwNENDXXxbXFx1MDREMS1cXHUwNEQxXXxbXFx1MDREMy1cXHUwNEQzXXxbXFx1MDRENS1cXHUwNEQ1XXxbXFx1MDRENy1cXHUwNEQ3XXxbXFx1MDREOS1cXHUwNEQ5XXxbXFx1MDREQi1cXHUwNERCXXxbXFx1MDRERC1cXHUwNEREXXxbXFx1MDRERi1cXHUwNERGXXxbXFx1MDRFMS1cXHUwNEUxXXxbXFx1MDRFMy1cXHUwNEUzXXxbXFx1MDRFNS1cXHUwNEU1XXxbXFx1MDRFNy1cXHUwNEU3XXxbXFx1MDRFOS1cXHUwNEU5XXxbXFx1MDRFQi1cXHUwNEVCXXxbXFx1MDRFRi1cXHUwNEVGXXxbXFx1MDRGMS1cXHUwNEYxXXxbXFx1MDRGMy1cXHUwNEYzXXxbXFx1MDRGNS1cXHUwNEY1XXxbXFx1MDRGOS1cXHUwNEY5XXxbXFx1MDU2MS1cXHUwNTg3XXxbXFx1MTBEMC1cXHUxMEY2XXxbXFx1MUUwMS1cXHUxRTAxXXxbXFx1MUUwMy1cXHUxRTAzXXxbXFx1MUUwNS1cXHUxRTA1XXxbXFx1MUUwNy1cXHUxRTA3XXxbXFx1MUUwOS1cXHUxRTA5XXxbXFx1MUUwQi1cXHUxRTBCXXxbXFx1MUUwRC1cXHUxRTBEXXxbXFx1MUUwRi1cXHUxRTBGXXxbXFx1MUUxMS1cXHUxRTExXXxbXFx1MUUxMy1cXHUxRTEzXXxbXFx1MUUxNS1cXHUxRTE1XXxbXFx1MUUxNy1cXHUxRTE3XXxbXFx1MUUxOS1cXHUxRTE5XXxbXFx1MUUxQi1cXHUxRTFCXXxbXFx1MUUxRC1cXHUxRTFEXXxbXFx1MUUxRi1cXHUxRTFGXXxbXFx1MUUyMS1cXHUxRTIxXXxbXFx1MUUyMy1cXHUxRTIzXXxbXFx1MUUyNS1cXHUxRTI1XXxbXFx1MUUyNy1cXHUxRTI3XXxbXFx1MUUyOS1cXHUxRTI5XXxbXFx1MUUyQi1cXHUxRTJCXXxbXFx1MUUyRC1cXHUxRTJEXXxbXFx1MUUyRi1cXHUxRTJGXXxbXFx1MUUzMS1cXHUxRTMxXXxbXFx1MUUzMy1cXHUxRTMzXXxbXFx1MUUzNS1cXHUxRTM1XXxbXFx1MUUzNy1cXHUxRTM3XXxbXFx1MUUzOS1cXHUxRTM5XXxbXFx1MUUzQi1cXHUxRTNCXXxbXFx1MUUzRC1cXHUxRTNEXXxbXFx1MUUzRi1cXHUxRTNGXXxbXFx1MUU0MS1cXHUxRTQxXXxbXFx1MUU0My1cXHUxRTQzXXxbXFx1MUU0NS1cXHUxRTQ1XXxbXFx1MUU0Ny1cXHUxRTQ3XXxbXFx1MUU0OS1cXHUxRTQ5XXxbXFx1MUU0Qi1cXHUxRTRCXXxbXFx1MUU0RC1cXHUxRTREXXxbXFx1MUU0Ri1cXHUxRTRGXXxbXFx1MUU1MS1cXHUxRTUxXXxbXFx1MUU1My1cXHUxRTUzXXxbXFx1MUU1NS1cXHUxRTU1XXxbXFx1MUU1Ny1cXHUxRTU3XXxbXFx1MUU1OS1cXHUxRTU5XXxbXFx1MUU1Qi1cXHUxRTVCXXxbXFx1MUU1RC1cXHUxRTVEXXxbXFx1MUU1Ri1cXHUxRTVGXXxbXFx1MUU2MS1cXHUxRTYxXXxbXFx1MUU2My1cXHUxRTYzXXxbXFx1MUU2NS1cXHUxRTY1XXxbXFx1MUU2Ny1cXHUxRTY3XXxbXFx1MUU2OS1cXHUxRTY5XXxbXFx1MUU2Qi1cXHUxRTZCXXxbXFx1MUU2RC1cXHUxRTZEXXxbXFx1MUU2Ri1cXHUxRTZGXXxbXFx1MUU3MS1cXHUxRTcxXXxbXFx1MUU3My1cXHUxRTczXXxbXFx1MUU3NS1cXHUxRTc1XXxbXFx1MUU3Ny1cXHUxRTc3XXxbXFx1MUU3OS1cXHUxRTc5XXxbXFx1MUU3Qi1cXHUxRTdCXXxbXFx1MUU3RC1cXHUxRTdEXXxbXFx1MUU3Ri1cXHUxRTdGXXxbXFx1MUU4MS1cXHUxRTgxXXxbXFx1MUU4My1cXHUxRTgzXXxbXFx1MUU4NS1cXHUxRTg1XXxbXFx1MUU4Ny1cXHUxRTg3XXxbXFx1MUU4OS1cXHUxRTg5XXxbXFx1MUU4Qi1cXHUxRThCXXxbXFx1MUU4RC1cXHUxRThEXXxbXFx1MUU4Ri1cXHUxRThGXXxbXFx1MUU5MS1cXHUxRTkxXXxbXFx1MUU5My1cXHUxRTkzXXxbXFx1MUU5NS1cXHUxRTlCXXxbXFx1MUVBMS1cXHUxRUExXXxbXFx1MUVBMy1cXHUxRUEzXXxbXFx1MUVBNS1cXHUxRUE1XXxbXFx1MUVBNy1cXHUxRUE3XXxbXFx1MUVBOS1cXHUxRUE5XXxbXFx1MUVBQi1cXHUxRUFCXXxbXFx1MUVBRC1cXHUxRUFEXXxbXFx1MUVBRi1cXHUxRUFGXXxbXFx1MUVCMS1cXHUxRUIxXXxbXFx1MUVCMy1cXHUxRUIzXXxbXFx1MUVCNS1cXHUxRUI1XXxbXFx1MUVCNy1cXHUxRUI3XXxbXFx1MUVCOS1cXHUxRUI5XXxbXFx1MUVCQi1cXHUxRUJCXXxbXFx1MUVCRC1cXHUxRUJEXXxbXFx1MUVCRi1cXHUxRUJGXXxbXFx1MUVDMS1cXHUxRUMxXXxbXFx1MUVDMy1cXHUxRUMzXXxbXFx1MUVDNS1cXHUxRUM1XXxbXFx1MUVDNy1cXHUxRUM3XXxbXFx1MUVDOS1cXHUxRUM5XXxbXFx1MUVDQi1cXHUxRUNCXXxbXFx1MUVDRC1cXHUxRUNEXXxbXFx1MUVDRi1cXHUxRUNGXXxbXFx1MUVEMS1cXHUxRUQxXXxbXFx1MUVEMy1cXHUxRUQzXXxbXFx1MUVENS1cXHUxRUQ1XXxbXFx1MUVENy1cXHUxRUQ3XXxbXFx1MUVEOS1cXHUxRUQ5XXxbXFx1MUVEQi1cXHUxRURCXXxbXFx1MUVERC1cXHUxRUREXXxbXFx1MUVERi1cXHUxRURGXXxbXFx1MUVFMS1cXHUxRUUxXXxbXFx1MUVFMy1cXHUxRUUzXXxbXFx1MUVFNS1cXHUxRUU1XXxbXFx1MUVFNy1cXHUxRUU3XXxbXFx1MUVFOS1cXHUxRUU5XXxbXFx1MUVFQi1cXHUxRUVCXXxbXFx1MUVFRC1cXHUxRUVEXXxbXFx1MUVFRi1cXHUxRUVGXXxbXFx1MUVGMS1cXHUxRUYxXXxbXFx1MUVGMy1cXHUxRUYzXXxbXFx1MUVGNS1cXHUxRUY1XXxbXFx1MUVGNy1cXHUxRUY3XXxbXFx1MUVGOS1cXHUxRUY5XXxbXFx1MUYwMC1cXHUxRjA3XXxbXFx1MUYxMC1cXHUxRjE1XXxbXFx1MUYyMC1cXHUxRjI3XXxbXFx1MUYzMC1cXHUxRjM3XXxbXFx1MUY0MC1cXHUxRjQ1XXxbXFx1MUY1MC1cXHUxRjU3XXxbXFx1MUY2MC1cXHUxRjY3XXxbXFx1MUY3MC1cXHUxRjdEXXxbXFx1MUY4MC1cXHUxRjg3XXxbXFx1MUY5MC1cXHUxRjk3XXxbXFx1MUZBMC1cXHUxRkE3XXxbXFx1MUZCMC1cXHUxRkI0XXxbXFx1MUZCNi1cXHUxRkI3XXxbXFx1MUZCRS1cXHUxRkJFXXxbXFx1MUZDMi1cXHUxRkM0XXxbXFx1MUZDNi1cXHUxRkM3XXxbXFx1MUZEMC1cXHUxRkQzXXxbXFx1MUZENi1cXHUxRkQ3XXxbXFx1MUZFMC1cXHUxRkU3XXxbXFx1MUZGMi1cXHUxRkY0XXxbXFx1MUZGNi1cXHUxRkY3XXxbXFx1MjA3Ri1cXHUyMDdGXXxbXFx1MjEwQS1cXHUyMTBBXXxbXFx1MjEwRS1cXHUyMTBGXXxbXFx1MjExMy1cXHUyMTEzXXxbXFx1MjExOC1cXHUyMTE4XXxbXFx1MjEyRS1cXHUyMTJGXXxbXFx1MjEzNC1cXHUyMTM0XXxbXFx1RkIwMC1cXHVGQjA2XXxbXFx1RkIxMy1cXHVGQjE3XXxbXFx1RkY0MS1cXHVGRjVBXS8sXG4gIEx0OiAvW1xcdTAxQzUtXFx1MDFDNV18W1xcdTAxQzgtXFx1MDFDOF18W1xcdTAxQ0ItXFx1MDFDQl18W1xcdTAxRjItXFx1MDFGMl0vLFxuICBMbTogL1tcXHUwMkIwLVxcdTAyQjhdfFtcXHUwMkJCLVxcdTAyQzFdfFtcXHUwMkQwLVxcdTAyRDFdfFtcXHUwMkUwLVxcdTAyRTRdfFtcXHUwMzdBLVxcdTAzN0FdfFtcXHUwNTU5LVxcdTA1NTldfFtcXHUwNjQwLVxcdTA2NDBdfFtcXHUwNkU1LVxcdTA2RTZdfFtcXHUwRTQ2LVxcdTBFNDZdfFtcXHUwRUM2LVxcdTBFQzZdfFtcXHUzMDA1LVxcdTMwMDVdfFtcXHUzMDMxLVxcdTMwMzVdfFtcXHUzMDlELVxcdTMwOUVdfFtcXHUzMEZDLVxcdTMwRkVdfFtcXHVGRjcwLVxcdUZGNzBdfFtcXHVGRjlFLVxcdUZGOUZdLyxcbiAgTG86IC9bXFx1MDFBQS1cXHUwMUFBXXxbXFx1MDFCQi1cXHUwMUJCXXxbXFx1MDFCRS1cXHUwMUMzXXxbXFx1MDNGMy1cXHUwM0YzXXxbXFx1MDRDMC1cXHUwNEMwXXxbXFx1MDVEMC1cXHUwNUVBXXxbXFx1MDVGMC1cXHUwNUYyXXxbXFx1MDYyMS1cXHUwNjNBXXxbXFx1MDY0MS1cXHUwNjRBXXxbXFx1MDY3MS1cXHUwNkI3XXxbXFx1MDZCQS1cXHUwNkJFXXxbXFx1MDZDMC1cXHUwNkNFXXxbXFx1MDZEMC1cXHUwNkQzXXxbXFx1MDZENS1cXHUwNkQ1XXxbXFx1MDkwNS1cXHUwOTM5XXxbXFx1MDkzRC1cXHUwOTNEXXxbXFx1MDk1MC1cXHUwOTUwXXxbXFx1MDk1OC1cXHUwOTYxXXxbXFx1MDk4NS1cXHUwOThDXXxbXFx1MDk4Ri1cXHUwOTkwXXxbXFx1MDk5My1cXHUwOUE4XXxbXFx1MDlBQS1cXHUwOUIwXXxbXFx1MDlCMi1cXHUwOUIyXXxbXFx1MDlCNi1cXHUwOUI5XXxbXFx1MDlEQy1cXHUwOUREXXxbXFx1MDlERi1cXHUwOUUxXXxbXFx1MDlGMC1cXHUwOUYxXXxbXFx1MEEwNS1cXHUwQTBBXXxbXFx1MEEwRi1cXHUwQTEwXXxbXFx1MEExMy1cXHUwQTI4XXxbXFx1MEEyQS1cXHUwQTMwXXxbXFx1MEEzMi1cXHUwQTMzXXxbXFx1MEEzNS1cXHUwQTM2XXxbXFx1MEEzOC1cXHUwQTM5XXxbXFx1MEE1OS1cXHUwQTVDXXxbXFx1MEE1RS1cXHUwQTVFXXxbXFx1MEE3Mi1cXHUwQTc0XXxbXFx1MEE4NS1cXHUwQThCXXxbXFx1MEE4RC1cXHUwQThEXXxbXFx1MEE4Ri1cXHUwQTkxXXxbXFx1MEE5My1cXHUwQUE4XXxbXFx1MEFBQS1cXHUwQUIwXXxbXFx1MEFCMi1cXHUwQUIzXXxbXFx1MEFCNS1cXHUwQUI5XXxbXFx1MEFCRC1cXHUwQUJEXXxbXFx1MEFEMC1cXHUwQUQwXXxbXFx1MEFFMC1cXHUwQUUwXXxbXFx1MEIwNS1cXHUwQjBDXXxbXFx1MEIwRi1cXHUwQjEwXXxbXFx1MEIxMy1cXHUwQjI4XXxbXFx1MEIyQS1cXHUwQjMwXXxbXFx1MEIzMi1cXHUwQjMzXXxbXFx1MEIzNi1cXHUwQjM5XXxbXFx1MEIzRC1cXHUwQjNEXXxbXFx1MEI1Qy1cXHUwQjVEXXxbXFx1MEI1Ri1cXHUwQjYxXXxbXFx1MEI4NS1cXHUwQjhBXXxbXFx1MEI4RS1cXHUwQjkwXXxbXFx1MEI5Mi1cXHUwQjk1XXxbXFx1MEI5OS1cXHUwQjlBXXxbXFx1MEI5Qy1cXHUwQjlDXXxbXFx1MEI5RS1cXHUwQjlGXXxbXFx1MEJBMy1cXHUwQkE0XXxbXFx1MEJBOC1cXHUwQkFBXXxbXFx1MEJBRS1cXHUwQkI1XXxbXFx1MEJCNy1cXHUwQkI5XXxbXFx1MEMwNS1cXHUwQzBDXXxbXFx1MEMwRS1cXHUwQzEwXXxbXFx1MEMxMi1cXHUwQzI4XXxbXFx1MEMyQS1cXHUwQzMzXXxbXFx1MEMzNS1cXHUwQzM5XXxbXFx1MEM2MC1cXHUwQzYxXXxbXFx1MEM4NS1cXHUwQzhDXXxbXFx1MEM4RS1cXHUwQzkwXXxbXFx1MEM5Mi1cXHUwQ0E4XXxbXFx1MENBQS1cXHUwQ0IzXXxbXFx1MENCNS1cXHUwQ0I5XXxbXFx1MENERS1cXHUwQ0RFXXxbXFx1MENFMC1cXHUwQ0UxXXxbXFx1MEQwNS1cXHUwRDBDXXxbXFx1MEQwRS1cXHUwRDEwXXxbXFx1MEQxMi1cXHUwRDI4XXxbXFx1MEQyQS1cXHUwRDM5XXxbXFx1MEQ2MC1cXHUwRDYxXXxbXFx1MEUwMS1cXHUwRTMwXXxbXFx1MEUzMi1cXHUwRTMzXXxbXFx1MEU0MC1cXHUwRTQ1XXxbXFx1MEU4MS1cXHUwRTgyXXxbXFx1MEU4NC1cXHUwRTg0XXxbXFx1MEU4Ny1cXHUwRTg4XXxbXFx1MEU4QS1cXHUwRThBXXxbXFx1MEU4RC1cXHUwRThEXXxbXFx1MEU5NC1cXHUwRTk3XXxbXFx1MEU5OS1cXHUwRTlGXXxbXFx1MEVBMS1cXHUwRUEzXXxbXFx1MEVBNS1cXHUwRUE1XXxbXFx1MEVBNy1cXHUwRUE3XXxbXFx1MEVBQS1cXHUwRUFCXXxbXFx1MEVBRC1cXHUwRUIwXXxbXFx1MEVCMi1cXHUwRUIzXXxbXFx1MEVCRC1cXHUwRUJEXXxbXFx1MEVDMC1cXHUwRUM0XXxbXFx1MEVEQy1cXHUwRUREXXxbXFx1MEYwMC1cXHUwRjAwXXxbXFx1MEY0MC1cXHUwRjQ3XXxbXFx1MEY0OS1cXHUwRjY5XXxbXFx1MEY4OC1cXHUwRjhCXXxbXFx1MTEwMC1cXHUxMTU5XXxbXFx1MTE1Ri1cXHUxMUEyXXxbXFx1MTFBOC1cXHUxMUY5XXxbXFx1MjEzNS1cXHUyMTM4XXxbXFx1MzAwNi1cXHUzMDA2XXxbXFx1MzA0MS1cXHUzMDk0XXxbXFx1MzBBMS1cXHUzMEZBXXxbXFx1MzEwNS1cXHUzMTJDXXxbXFx1MzEzMS1cXHUzMThFXXxbXFx1NEUwMC1cXHU5RkE1XXxbXFx1QUMwMC1cXHVEN0EzXXxbXFx1RjkwMC1cXHVGQTJEXXxbXFx1RkIxRi1cXHVGQjI4XXxbXFx1RkIyQS1cXHVGQjM2XXxbXFx1RkIzOC1cXHVGQjNDXXxbXFx1RkIzRS1cXHVGQjNFXXxbXFx1RkI0MC1cXHVGQjQxXXxbXFx1RkI0My1cXHVGQjQ0XXxbXFx1RkI0Ni1cXHVGQkIxXXxbXFx1RkJEMy1cXHVGRDNEXXxbXFx1RkQ1MC1cXHVGRDhGXXxbXFx1RkQ5Mi1cXHVGREM3XXxbXFx1RkRGMC1cXHVGREZCXXxbXFx1RkU3MC1cXHVGRTcyXXxbXFx1RkU3NC1cXHVGRTc0XXxbXFx1RkU3Ni1cXHVGRUZDXXxbXFx1RkY2Ni1cXHVGRjZGXXxbXFx1RkY3MS1cXHVGRjlEXXxbXFx1RkZBMC1cXHVGRkJFXXxbXFx1RkZDMi1cXHVGRkM3XXxbXFx1RkZDQS1cXHVGRkNGXXxbXFx1RkZEMi1cXHVGRkQ3XXxbXFx1RkZEQS1cXHVGRkRDXS8sXG5cbiAgLy8gTnVtYmVyc1xuICBObDogL1tcXHUyMTYwLVxcdTIxODJdfFtcXHUzMDA3LVxcdTMwMDddfFtcXHUzMDIxLVxcdTMwMjldLyxcbiAgTmQ6IC9bXFx1MDAzMC1cXHUwMDM5XXxbXFx1MDY2MC1cXHUwNjY5XXxbXFx1MDZGMC1cXHUwNkY5XXxbXFx1MDk2Ni1cXHUwOTZGXXxbXFx1MDlFNi1cXHUwOUVGXXxbXFx1MEE2Ni1cXHUwQTZGXXxbXFx1MEFFNi1cXHUwQUVGXXxbXFx1MEI2Ni1cXHUwQjZGXXxbXFx1MEJFNy1cXHUwQkVGXXxbXFx1MEM2Ni1cXHUwQzZGXXxbXFx1MENFNi1cXHUwQ0VGXXxbXFx1MEQ2Ni1cXHUwRDZGXXxbXFx1MEU1MC1cXHUwRTU5XXxbXFx1MEVEMC1cXHUwRUQ5XXxbXFx1MEYyMC1cXHUwRjI5XXxbXFx1RkYxMC1cXHVGRjE5XS8sXG5cbiAgLy8gTWFya3NcbiAgTW46IC9bXFx1MDMwMC1cXHUwMzQ1XXxbXFx1MDM2MC1cXHUwMzYxXXxbXFx1MDQ4My1cXHUwNDg2XXxbXFx1MDU5MS1cXHUwNUExXXxbXFx1MDVBMy1cXHUwNUI5XXxbXFx1MDVCQi1cXHUwNUJEXXxbXFx1MDVCRi1cXHUwNUJGXXxbXFx1MDVDMS1cXHUwNUMyXXxbXFx1MDVDNC1cXHUwNUM0XXxbXFx1MDY0Qi1cXHUwNjUyXXxbXFx1MDY3MC1cXHUwNjcwXXxbXFx1MDZENi1cXHUwNkRDXXxbXFx1MDZERi1cXHUwNkU0XXxbXFx1MDZFNy1cXHUwNkU4XXxbXFx1MDZFQS1cXHUwNkVEXXxbXFx1MDkwMS1cXHUwOTAyXXxbXFx1MDkzQy1cXHUwOTNDXXxbXFx1MDk0MS1cXHUwOTQ4XXxbXFx1MDk0RC1cXHUwOTREXXxbXFx1MDk1MS1cXHUwOTU0XXxbXFx1MDk2Mi1cXHUwOTYzXXxbXFx1MDk4MS1cXHUwOTgxXXxbXFx1MDlCQy1cXHUwOUJDXXxbXFx1MDlDMS1cXHUwOUM0XXxbXFx1MDlDRC1cXHUwOUNEXXxbXFx1MDlFMi1cXHUwOUUzXXxbXFx1MEEwMi1cXHUwQTAyXXxbXFx1MEEzQy1cXHUwQTNDXXxbXFx1MEE0MS1cXHUwQTQyXXxbXFx1MEE0Ny1cXHUwQTQ4XXxbXFx1MEE0Qi1cXHUwQTREXXxbXFx1MEE3MC1cXHUwQTcxXXxbXFx1MEE4MS1cXHUwQTgyXXxbXFx1MEFCQy1cXHUwQUJDXXxbXFx1MEFDMS1cXHUwQUM1XXxbXFx1MEFDNy1cXHUwQUM4XXxbXFx1MEFDRC1cXHUwQUNEXXxbXFx1MEIwMS1cXHUwQjAxXXxbXFx1MEIzQy1cXHUwQjNDXXxbXFx1MEIzRi1cXHUwQjNGXXxbXFx1MEI0MS1cXHUwQjQzXXxbXFx1MEI0RC1cXHUwQjREXXxbXFx1MEI1Ni1cXHUwQjU2XXxbXFx1MEI4Mi1cXHUwQjgyXXxbXFx1MEJDMC1cXHUwQkMwXXxbXFx1MEJDRC1cXHUwQkNEXXxbXFx1MEMzRS1cXHUwQzQwXXxbXFx1MEM0Ni1cXHUwQzQ4XXxbXFx1MEM0QS1cXHUwQzREXXxbXFx1MEM1NS1cXHUwQzU2XXxbXFx1MENCRi1cXHUwQ0JGXXxbXFx1MENDNi1cXHUwQ0M2XXxbXFx1MENDQy1cXHUwQ0NEXXxbXFx1MEQ0MS1cXHUwRDQzXXxbXFx1MEQ0RC1cXHUwRDREXXxbXFx1MEUzMS1cXHUwRTMxXXxbXFx1MEUzNC1cXHUwRTNBXXxbXFx1MEU0Ny1cXHUwRTRFXXxbXFx1MEVCMS1cXHUwRUIxXXxbXFx1MEVCNC1cXHUwRUI5XXxbXFx1MEVCQi1cXHUwRUJDXXxbXFx1MEVDOC1cXHUwRUNEXXxbXFx1MEYxOC1cXHUwRjE5XXxbXFx1MEYzNS1cXHUwRjM1XXxbXFx1MEYzNy1cXHUwRjM3XXxbXFx1MEYzOS1cXHUwRjM5XXxbXFx1MEY3MS1cXHUwRjdFXXxbXFx1MEY4MC1cXHUwRjg0XXxbXFx1MEY4Ni1cXHUwRjg3XXxbXFx1MEY5MC1cXHUwRjk1XXxbXFx1MEY5Ny1cXHUwRjk3XXxbXFx1MEY5OS1cXHUwRkFEXXxbXFx1MEZCMS1cXHUwRkI3XXxbXFx1MEZCOS1cXHUwRkI5XXxbXFx1MjBEMC1cXHUyMERDXXxbXFx1MjBFMS1cXHUyMEUxXXxbXFx1MzAyQS1cXHUzMDJGXXxbXFx1MzA5OS1cXHUzMDlBXXxbXFx1RkIxRS1cXHVGQjFFXXxbXFx1RkUyMC1cXHVGRTIzXS8sXG4gIE1jOiAvW1xcdTA5MDMtXFx1MDkwM118W1xcdTA5M0UtXFx1MDk0MF18W1xcdTA5NDktXFx1MDk0Q118W1xcdTA5ODItXFx1MDk4M118W1xcdTA5QkUtXFx1MDlDMF18W1xcdTA5QzctXFx1MDlDOF18W1xcdTA5Q0ItXFx1MDlDQ118W1xcdTA5RDctXFx1MDlEN118W1xcdTBBM0UtXFx1MEE0MF18W1xcdTBBODMtXFx1MEE4M118W1xcdTBBQkUtXFx1MEFDMF18W1xcdTBBQzktXFx1MEFDOV18W1xcdTBBQ0ItXFx1MEFDQ118W1xcdTBCMDItXFx1MEIwM118W1xcdTBCM0UtXFx1MEIzRV18W1xcdTBCNDAtXFx1MEI0MF18W1xcdTBCNDctXFx1MEI0OF18W1xcdTBCNEItXFx1MEI0Q118W1xcdTBCNTctXFx1MEI1N118W1xcdTBCODMtXFx1MEI4M118W1xcdTBCQkUtXFx1MEJCRl18W1xcdTBCQzEtXFx1MEJDMl18W1xcdTBCQzYtXFx1MEJDOF18W1xcdTBCQ0EtXFx1MEJDQ118W1xcdTBCRDctXFx1MEJEN118W1xcdTBDMDEtXFx1MEMwM118W1xcdTBDNDEtXFx1MEM0NF18W1xcdTBDODItXFx1MEM4M118W1xcdTBDQkUtXFx1MENCRV18W1xcdTBDQzAtXFx1MENDNF18W1xcdTBDQzctXFx1MENDOF18W1xcdTBDQ0EtXFx1MENDQl18W1xcdTBDRDUtXFx1MENENl18W1xcdTBEMDItXFx1MEQwM118W1xcdTBEM0UtXFx1MEQ0MF18W1xcdTBENDYtXFx1MEQ0OF18W1xcdTBENEEtXFx1MEQ0Q118W1xcdTBENTctXFx1MEQ1N118W1xcdTBGM0UtXFx1MEYzRl18W1xcdTBGN0YtXFx1MEY3Rl0vLFxuXG4gIC8vIFB1bmN0dWF0aW9uLCBDb25uZWN0b3JcbiAgUGM6IC9bXFx1MDA1Ri1cXHUwMDVGXXxbXFx1MjAzRi1cXHUyMDQwXXxbXFx1MzBGQi1cXHUzMEZCXXxbXFx1RkUzMy1cXHVGRTM0XXxbXFx1RkU0RC1cXHVGRTRGXXxbXFx1RkYzRi1cXHVGRjNGXXxbXFx1RkY2NS1cXHVGRjY1XS8sXG5cbiAgLy8gU2VwYXJhdG9yLCBTcGFjZVxuICBaczogL1tcXHUyMDAwLVxcdTIwMEJdfFtcXHUzMDAwLVxcdTMwMDBdLyxcblxuICAvLyBUaGVzZSB0d28gYXJlIG5vdCByZWFsIFVuaWNvZGUgY2F0ZWdvcmllcywgYnV0IG91ciB1c2VmdWwgZm9yIE9obS5cbiAgLy8gTCBpcyBhIGNvbWJpbmF0aW9uIG9mIGFsbCB0aGUgbGV0dGVyIGNhdGVnb3JpZXMuXG4gIC8vIEx0bW8gaXMgYSBjb21iaW5hdGlvbiBvZiBMdCwgTG0sIGFuZCBMby5cbiAgTDogL1tcXHUwMDQxLVxcdTAwNUFdfFtcXHUwMEMwLVxcdTAwRDZdfFtcXHUwMEQ4LVxcdTAwREVdfFtcXHUwMTAwLVxcdTAxMDBdfFtcXHUwMTAyLVxcdTAxMDJdfFtcXHUwMTA0LVxcdTAxMDRdfFtcXHUwMTA2LVxcdTAxMDZdfFtcXHUwMTA4LVxcdTAxMDhdfFtcXHUwMTBBLVxcdTAxMEFdfFtcXHUwMTBDLVxcdTAxMENdfFtcXHUwMTBFLVxcdTAxMEVdfFtcXHUwMTEwLVxcdTAxMTBdfFtcXHUwMTEyLVxcdTAxMTJdfFtcXHUwMTE0LVxcdTAxMTRdfFtcXHUwMTE2LVxcdTAxMTZdfFtcXHUwMTE4LVxcdTAxMThdfFtcXHUwMTFBLVxcdTAxMUFdfFtcXHUwMTFDLVxcdTAxMUNdfFtcXHUwMTFFLVxcdTAxMUVdfFtcXHUwMTIwLVxcdTAxMjBdfFtcXHUwMTIyLVxcdTAxMjJdfFtcXHUwMTI0LVxcdTAxMjRdfFtcXHUwMTI2LVxcdTAxMjZdfFtcXHUwMTI4LVxcdTAxMjhdfFtcXHUwMTJBLVxcdTAxMkFdfFtcXHUwMTJDLVxcdTAxMkNdfFtcXHUwMTJFLVxcdTAxMkVdfFtcXHUwMTMwLVxcdTAxMzBdfFtcXHUwMTMyLVxcdTAxMzJdfFtcXHUwMTM0LVxcdTAxMzRdfFtcXHUwMTM2LVxcdTAxMzZdfFtcXHUwMTM5LVxcdTAxMzldfFtcXHUwMTNCLVxcdTAxM0JdfFtcXHUwMTNELVxcdTAxM0RdfFtcXHUwMTNGLVxcdTAxM0ZdfFtcXHUwMTQxLVxcdTAxNDFdfFtcXHUwMTQzLVxcdTAxNDNdfFtcXHUwMTQ1LVxcdTAxNDVdfFtcXHUwMTQ3LVxcdTAxNDddfFtcXHUwMTRBLVxcdTAxNEFdfFtcXHUwMTRDLVxcdTAxNENdfFtcXHUwMTRFLVxcdTAxNEVdfFtcXHUwMTUwLVxcdTAxNTBdfFtcXHUwMTUyLVxcdTAxNTJdfFtcXHUwMTU0LVxcdTAxNTRdfFtcXHUwMTU2LVxcdTAxNTZdfFtcXHUwMTU4LVxcdTAxNThdfFtcXHUwMTVBLVxcdTAxNUFdfFtcXHUwMTVDLVxcdTAxNUNdfFtcXHUwMTVFLVxcdTAxNUVdfFtcXHUwMTYwLVxcdTAxNjBdfFtcXHUwMTYyLVxcdTAxNjJdfFtcXHUwMTY0LVxcdTAxNjRdfFtcXHUwMTY2LVxcdTAxNjZdfFtcXHUwMTY4LVxcdTAxNjhdfFtcXHUwMTZBLVxcdTAxNkFdfFtcXHUwMTZDLVxcdTAxNkNdfFtcXHUwMTZFLVxcdTAxNkVdfFtcXHUwMTcwLVxcdTAxNzBdfFtcXHUwMTcyLVxcdTAxNzJdfFtcXHUwMTc0LVxcdTAxNzRdfFtcXHUwMTc2LVxcdTAxNzZdfFtcXHUwMTc4LVxcdTAxNzldfFtcXHUwMTdCLVxcdTAxN0JdfFtcXHUwMTdELVxcdTAxN0RdfFtcXHUwMTgxLVxcdTAxODJdfFtcXHUwMTg0LVxcdTAxODRdfFtcXHUwMTg2LVxcdTAxODddfFtcXHUwMTg5LVxcdTAxOEJdfFtcXHUwMThFLVxcdTAxOTFdfFtcXHUwMTkzLVxcdTAxOTRdfFtcXHUwMTk2LVxcdTAxOThdfFtcXHUwMTlDLVxcdTAxOURdfFtcXHUwMTlGLVxcdTAxQTBdfFtcXHUwMUEyLVxcdTAxQTJdfFtcXHUwMUE0LVxcdTAxQTRdfFtcXHUwMUE2LVxcdTAxQTddfFtcXHUwMUE5LVxcdTAxQTldfFtcXHUwMUFDLVxcdTAxQUNdfFtcXHUwMUFFLVxcdTAxQUZdfFtcXHUwMUIxLVxcdTAxQjNdfFtcXHUwMUI1LVxcdTAxQjVdfFtcXHUwMUI3LVxcdTAxQjhdfFtcXHUwMUJDLVxcdTAxQkNdfFtcXHUwMUM0LVxcdTAxQzRdfFtcXHUwMUM3LVxcdTAxQzddfFtcXHUwMUNBLVxcdTAxQ0FdfFtcXHUwMUNELVxcdTAxQ0RdfFtcXHUwMUNGLVxcdTAxQ0ZdfFtcXHUwMUQxLVxcdTAxRDFdfFtcXHUwMUQzLVxcdTAxRDNdfFtcXHUwMUQ1LVxcdTAxRDVdfFtcXHUwMUQ3LVxcdTAxRDddfFtcXHUwMUQ5LVxcdTAxRDldfFtcXHUwMURCLVxcdTAxREJdfFtcXHUwMURFLVxcdTAxREVdfFtcXHUwMUUwLVxcdTAxRTBdfFtcXHUwMUUyLVxcdTAxRTJdfFtcXHUwMUU0LVxcdTAxRTRdfFtcXHUwMUU2LVxcdTAxRTZdfFtcXHUwMUU4LVxcdTAxRThdfFtcXHUwMUVBLVxcdTAxRUFdfFtcXHUwMUVDLVxcdTAxRUNdfFtcXHUwMUVFLVxcdTAxRUVdfFtcXHUwMUYxLVxcdTAxRjFdfFtcXHUwMUY0LVxcdTAxRjRdfFtcXHUwMUZBLVxcdTAxRkFdfFtcXHUwMUZDLVxcdTAxRkNdfFtcXHUwMUZFLVxcdTAxRkVdfFtcXHUwMjAwLVxcdTAyMDBdfFtcXHUwMjAyLVxcdTAyMDJdfFtcXHUwMjA0LVxcdTAyMDRdfFtcXHUwMjA2LVxcdTAyMDZdfFtcXHUwMjA4LVxcdTAyMDhdfFtcXHUwMjBBLVxcdTAyMEFdfFtcXHUwMjBDLVxcdTAyMENdfFtcXHUwMjBFLVxcdTAyMEVdfFtcXHUwMjEwLVxcdTAyMTBdfFtcXHUwMjEyLVxcdTAyMTJdfFtcXHUwMjE0LVxcdTAyMTRdfFtcXHUwMjE2LVxcdTAyMTZdfFtcXHUwMzg2LVxcdTAzODZdfFtcXHUwMzg4LVxcdTAzOEFdfFtcXHUwMzhDLVxcdTAzOENdfFtcXHUwMzhFLVxcdTAzOEZdfFtcXHUwMzkxLVxcdTAzQTFdfFtcXHUwM0EzLVxcdTAzQUJdfFtcXHUwM0QyLVxcdTAzRDRdfFtcXHUwM0RBLVxcdTAzREFdfFtcXHUwM0RDLVxcdTAzRENdfFtcXHUwM0RFLVxcdTAzREVdfFtcXHUwM0UwLVxcdTAzRTBdfFtcXHUwM0UyLVxcdTAzRTJdfFtcXHUwM0U0LVxcdTAzRTRdfFtcXHUwM0U2LVxcdTAzRTZdfFtcXHUwM0U4LVxcdTAzRThdfFtcXHUwM0VBLVxcdTAzRUFdfFtcXHUwM0VDLVxcdTAzRUNdfFtcXHUwM0VFLVxcdTAzRUVdfFtcXHUwNDAxLVxcdTA0MENdfFtcXHUwNDBFLVxcdTA0MkZdfFtcXHUwNDYwLVxcdTA0NjBdfFtcXHUwNDYyLVxcdTA0NjJdfFtcXHUwNDY0LVxcdTA0NjRdfFtcXHUwNDY2LVxcdTA0NjZdfFtcXHUwNDY4LVxcdTA0NjhdfFtcXHUwNDZBLVxcdTA0NkFdfFtcXHUwNDZDLVxcdTA0NkNdfFtcXHUwNDZFLVxcdTA0NkVdfFtcXHUwNDcwLVxcdTA0NzBdfFtcXHUwNDcyLVxcdTA0NzJdfFtcXHUwNDc0LVxcdTA0NzRdfFtcXHUwNDc2LVxcdTA0NzZdfFtcXHUwNDc4LVxcdTA0NzhdfFtcXHUwNDdBLVxcdTA0N0FdfFtcXHUwNDdDLVxcdTA0N0NdfFtcXHUwNDdFLVxcdTA0N0VdfFtcXHUwNDgwLVxcdTA0ODBdfFtcXHUwNDkwLVxcdTA0OTBdfFtcXHUwNDkyLVxcdTA0OTJdfFtcXHUwNDk0LVxcdTA0OTRdfFtcXHUwNDk2LVxcdTA0OTZdfFtcXHUwNDk4LVxcdTA0OThdfFtcXHUwNDlBLVxcdTA0OUFdfFtcXHUwNDlDLVxcdTA0OUNdfFtcXHUwNDlFLVxcdTA0OUVdfFtcXHUwNEEwLVxcdTA0QTBdfFtcXHUwNEEyLVxcdTA0QTJdfFtcXHUwNEE0LVxcdTA0QTRdfFtcXHUwNEE2LVxcdTA0QTZdfFtcXHUwNEE4LVxcdTA0QThdfFtcXHUwNEFBLVxcdTA0QUFdfFtcXHUwNEFDLVxcdTA0QUNdfFtcXHUwNEFFLVxcdTA0QUVdfFtcXHUwNEIwLVxcdTA0QjBdfFtcXHUwNEIyLVxcdTA0QjJdfFtcXHUwNEI0LVxcdTA0QjRdfFtcXHUwNEI2LVxcdTA0QjZdfFtcXHUwNEI4LVxcdTA0QjhdfFtcXHUwNEJBLVxcdTA0QkFdfFtcXHUwNEJDLVxcdTA0QkNdfFtcXHUwNEJFLVxcdTA0QkVdfFtcXHUwNEMxLVxcdTA0QzFdfFtcXHUwNEMzLVxcdTA0QzNdfFtcXHUwNEM3LVxcdTA0QzddfFtcXHUwNENCLVxcdTA0Q0JdfFtcXHUwNEQwLVxcdTA0RDBdfFtcXHUwNEQyLVxcdTA0RDJdfFtcXHUwNEQ0LVxcdTA0RDRdfFtcXHUwNEQ2LVxcdTA0RDZdfFtcXHUwNEQ4LVxcdTA0RDhdfFtcXHUwNERBLVxcdTA0REFdfFtcXHUwNERDLVxcdTA0RENdfFtcXHUwNERFLVxcdTA0REVdfFtcXHUwNEUwLVxcdTA0RTBdfFtcXHUwNEUyLVxcdTA0RTJdfFtcXHUwNEU0LVxcdTA0RTRdfFtcXHUwNEU2LVxcdTA0RTZdfFtcXHUwNEU4LVxcdTA0RThdfFtcXHUwNEVBLVxcdTA0RUFdfFtcXHUwNEVFLVxcdTA0RUVdfFtcXHUwNEYwLVxcdTA0RjBdfFtcXHUwNEYyLVxcdTA0RjJdfFtcXHUwNEY0LVxcdTA0RjRdfFtcXHUwNEY4LVxcdTA0RjhdfFtcXHUwNTMxLVxcdTA1NTZdfFtcXHUxMEEwLVxcdTEwQzVdfFtcXHUxRTAwLVxcdTFFMDBdfFtcXHUxRTAyLVxcdTFFMDJdfFtcXHUxRTA0LVxcdTFFMDRdfFtcXHUxRTA2LVxcdTFFMDZdfFtcXHUxRTA4LVxcdTFFMDhdfFtcXHUxRTBBLVxcdTFFMEFdfFtcXHUxRTBDLVxcdTFFMENdfFtcXHUxRTBFLVxcdTFFMEVdfFtcXHUxRTEwLVxcdTFFMTBdfFtcXHUxRTEyLVxcdTFFMTJdfFtcXHUxRTE0LVxcdTFFMTRdfFtcXHUxRTE2LVxcdTFFMTZdfFtcXHUxRTE4LVxcdTFFMThdfFtcXHUxRTFBLVxcdTFFMUFdfFtcXHUxRTFDLVxcdTFFMUNdfFtcXHUxRTFFLVxcdTFFMUVdfFtcXHUxRTIwLVxcdTFFMjBdfFtcXHUxRTIyLVxcdTFFMjJdfFtcXHUxRTI0LVxcdTFFMjRdfFtcXHUxRTI2LVxcdTFFMjZdfFtcXHUxRTI4LVxcdTFFMjhdfFtcXHUxRTJBLVxcdTFFMkFdfFtcXHUxRTJDLVxcdTFFMkNdfFtcXHUxRTJFLVxcdTFFMkVdfFtcXHUxRTMwLVxcdTFFMzBdfFtcXHUxRTMyLVxcdTFFMzJdfFtcXHUxRTM0LVxcdTFFMzRdfFtcXHUxRTM2LVxcdTFFMzZdfFtcXHUxRTM4LVxcdTFFMzhdfFtcXHUxRTNBLVxcdTFFM0FdfFtcXHUxRTNDLVxcdTFFM0NdfFtcXHUxRTNFLVxcdTFFM0VdfFtcXHUxRTQwLVxcdTFFNDBdfFtcXHUxRTQyLVxcdTFFNDJdfFtcXHUxRTQ0LVxcdTFFNDRdfFtcXHUxRTQ2LVxcdTFFNDZdfFtcXHUxRTQ4LVxcdTFFNDhdfFtcXHUxRTRBLVxcdTFFNEFdfFtcXHUxRTRDLVxcdTFFNENdfFtcXHUxRTRFLVxcdTFFNEVdfFtcXHUxRTUwLVxcdTFFNTBdfFtcXHUxRTUyLVxcdTFFNTJdfFtcXHUxRTU0LVxcdTFFNTRdfFtcXHUxRTU2LVxcdTFFNTZdfFtcXHUxRTU4LVxcdTFFNThdfFtcXHUxRTVBLVxcdTFFNUFdfFtcXHUxRTVDLVxcdTFFNUNdfFtcXHUxRTVFLVxcdTFFNUVdfFtcXHUxRTYwLVxcdTFFNjBdfFtcXHUxRTYyLVxcdTFFNjJdfFtcXHUxRTY0LVxcdTFFNjRdfFtcXHUxRTY2LVxcdTFFNjZdfFtcXHUxRTY4LVxcdTFFNjhdfFtcXHUxRTZBLVxcdTFFNkFdfFtcXHUxRTZDLVxcdTFFNkNdfFtcXHUxRTZFLVxcdTFFNkVdfFtcXHUxRTcwLVxcdTFFNzBdfFtcXHUxRTcyLVxcdTFFNzJdfFtcXHUxRTc0LVxcdTFFNzRdfFtcXHUxRTc2LVxcdTFFNzZdfFtcXHUxRTc4LVxcdTFFNzhdfFtcXHUxRTdBLVxcdTFFN0FdfFtcXHUxRTdDLVxcdTFFN0NdfFtcXHUxRTdFLVxcdTFFN0VdfFtcXHUxRTgwLVxcdTFFODBdfFtcXHUxRTgyLVxcdTFFODJdfFtcXHUxRTg0LVxcdTFFODRdfFtcXHUxRTg2LVxcdTFFODZdfFtcXHUxRTg4LVxcdTFFODhdfFtcXHUxRThBLVxcdTFFOEFdfFtcXHUxRThDLVxcdTFFOENdfFtcXHUxRThFLVxcdTFFOEVdfFtcXHUxRTkwLVxcdTFFOTBdfFtcXHUxRTkyLVxcdTFFOTJdfFtcXHUxRTk0LVxcdTFFOTRdfFtcXHUxRUEwLVxcdTFFQTBdfFtcXHUxRUEyLVxcdTFFQTJdfFtcXHUxRUE0LVxcdTFFQTRdfFtcXHUxRUE2LVxcdTFFQTZdfFtcXHUxRUE4LVxcdTFFQThdfFtcXHUxRUFBLVxcdTFFQUFdfFtcXHUxRUFDLVxcdTFFQUNdfFtcXHUxRUFFLVxcdTFFQUVdfFtcXHUxRUIwLVxcdTFFQjBdfFtcXHUxRUIyLVxcdTFFQjJdfFtcXHUxRUI0LVxcdTFFQjRdfFtcXHUxRUI2LVxcdTFFQjZdfFtcXHUxRUI4LVxcdTFFQjhdfFtcXHUxRUJBLVxcdTFFQkFdfFtcXHUxRUJDLVxcdTFFQkNdfFtcXHUxRUJFLVxcdTFFQkVdfFtcXHUxRUMwLVxcdTFFQzBdfFtcXHUxRUMyLVxcdTFFQzJdfFtcXHUxRUM0LVxcdTFFQzRdfFtcXHUxRUM2LVxcdTFFQzZdfFtcXHUxRUM4LVxcdTFFQzhdfFtcXHUxRUNBLVxcdTFFQ0FdfFtcXHUxRUNDLVxcdTFFQ0NdfFtcXHUxRUNFLVxcdTFFQ0VdfFtcXHUxRUQwLVxcdTFFRDBdfFtcXHUxRUQyLVxcdTFFRDJdfFtcXHUxRUQ0LVxcdTFFRDRdfFtcXHUxRUQ2LVxcdTFFRDZdfFtcXHUxRUQ4LVxcdTFFRDhdfFtcXHUxRURBLVxcdTFFREFdfFtcXHUxRURDLVxcdTFFRENdfFtcXHUxRURFLVxcdTFFREVdfFtcXHUxRUUwLVxcdTFFRTBdfFtcXHUxRUUyLVxcdTFFRTJdfFtcXHUxRUU0LVxcdTFFRTRdfFtcXHUxRUU2LVxcdTFFRTZdfFtcXHUxRUU4LVxcdTFFRThdfFtcXHUxRUVBLVxcdTFFRUFdfFtcXHUxRUVDLVxcdTFFRUNdfFtcXHUxRUVFLVxcdTFFRUVdfFtcXHUxRUYwLVxcdTFFRjBdfFtcXHUxRUYyLVxcdTFFRjJdfFtcXHUxRUY0LVxcdTFFRjRdfFtcXHUxRUY2LVxcdTFFRjZdfFtcXHUxRUY4LVxcdTFFRjhdfFtcXHUxRjA4LVxcdTFGMEZdfFtcXHUxRjE4LVxcdTFGMURdfFtcXHUxRjI4LVxcdTFGMkZdfFtcXHUxRjM4LVxcdTFGM0ZdfFtcXHUxRjQ4LVxcdTFGNERdfFtcXHUxRjU5LVxcdTFGNTldfFtcXHUxRjVCLVxcdTFGNUJdfFtcXHUxRjVELVxcdTFGNURdfFtcXHUxRjVGLVxcdTFGNUZdfFtcXHUxRjY4LVxcdTFGNkZdfFtcXHUxRjg4LVxcdTFGOEZdfFtcXHUxRjk4LVxcdTFGOUZdfFtcXHUxRkE4LVxcdTFGQUZdfFtcXHUxRkI4LVxcdTFGQkNdfFtcXHUxRkM4LVxcdTFGQ0NdfFtcXHUxRkQ4LVxcdTFGREJdfFtcXHUxRkU4LVxcdTFGRUNdfFtcXHUxRkY4LVxcdTFGRkNdfFtcXHUyMTAyLVxcdTIxMDJdfFtcXHUyMTA3LVxcdTIxMDddfFtcXHUyMTBCLVxcdTIxMERdfFtcXHUyMTEwLVxcdTIxMTJdfFtcXHUyMTE1LVxcdTIxMTVdfFtcXHUyMTE5LVxcdTIxMURdfFtcXHUyMTI0LVxcdTIxMjRdfFtcXHUyMTI2LVxcdTIxMjZdfFtcXHUyMTI4LVxcdTIxMjhdfFtcXHUyMTJBLVxcdTIxMkRdfFtcXHUyMTMwLVxcdTIxMzFdfFtcXHUyMTMzLVxcdTIxMzNdfFtcXHVGRjIxLVxcdUZGM0FdfFtcXHUwMDYxLVxcdTAwN0FdfFtcXHUwMEFBLVxcdTAwQUFdfFtcXHUwMEI1LVxcdTAwQjVdfFtcXHUwMEJBLVxcdTAwQkFdfFtcXHUwMERGLVxcdTAwRjZdfFtcXHUwMEY4LVxcdTAwRkZdfFtcXHUwMTAxLVxcdTAxMDFdfFtcXHUwMTAzLVxcdTAxMDNdfFtcXHUwMTA1LVxcdTAxMDVdfFtcXHUwMTA3LVxcdTAxMDddfFtcXHUwMTA5LVxcdTAxMDldfFtcXHUwMTBCLVxcdTAxMEJdfFtcXHUwMTBELVxcdTAxMERdfFtcXHUwMTBGLVxcdTAxMEZdfFtcXHUwMTExLVxcdTAxMTFdfFtcXHUwMTEzLVxcdTAxMTNdfFtcXHUwMTE1LVxcdTAxMTVdfFtcXHUwMTE3LVxcdTAxMTddfFtcXHUwMTE5LVxcdTAxMTldfFtcXHUwMTFCLVxcdTAxMUJdfFtcXHUwMTFELVxcdTAxMURdfFtcXHUwMTFGLVxcdTAxMUZdfFtcXHUwMTIxLVxcdTAxMjFdfFtcXHUwMTIzLVxcdTAxMjNdfFtcXHUwMTI1LVxcdTAxMjVdfFtcXHUwMTI3LVxcdTAxMjddfFtcXHUwMTI5LVxcdTAxMjldfFtcXHUwMTJCLVxcdTAxMkJdfFtcXHUwMTJELVxcdTAxMkRdfFtcXHUwMTJGLVxcdTAxMkZdfFtcXHUwMTMxLVxcdTAxMzFdfFtcXHUwMTMzLVxcdTAxMzNdfFtcXHUwMTM1LVxcdTAxMzVdfFtcXHUwMTM3LVxcdTAxMzhdfFtcXHUwMTNBLVxcdTAxM0FdfFtcXHUwMTNDLVxcdTAxM0NdfFtcXHUwMTNFLVxcdTAxM0VdfFtcXHUwMTQwLVxcdTAxNDBdfFtcXHUwMTQyLVxcdTAxNDJdfFtcXHUwMTQ0LVxcdTAxNDRdfFtcXHUwMTQ2LVxcdTAxNDZdfFtcXHUwMTQ4LVxcdTAxNDldfFtcXHUwMTRCLVxcdTAxNEJdfFtcXHUwMTRELVxcdTAxNERdfFtcXHUwMTRGLVxcdTAxNEZdfFtcXHUwMTUxLVxcdTAxNTFdfFtcXHUwMTUzLVxcdTAxNTNdfFtcXHUwMTU1LVxcdTAxNTVdfFtcXHUwMTU3LVxcdTAxNTddfFtcXHUwMTU5LVxcdTAxNTldfFtcXHUwMTVCLVxcdTAxNUJdfFtcXHUwMTVELVxcdTAxNURdfFtcXHUwMTVGLVxcdTAxNUZdfFtcXHUwMTYxLVxcdTAxNjFdfFtcXHUwMTYzLVxcdTAxNjNdfFtcXHUwMTY1LVxcdTAxNjVdfFtcXHUwMTY3LVxcdTAxNjddfFtcXHUwMTY5LVxcdTAxNjldfFtcXHUwMTZCLVxcdTAxNkJdfFtcXHUwMTZELVxcdTAxNkRdfFtcXHUwMTZGLVxcdTAxNkZdfFtcXHUwMTcxLVxcdTAxNzFdfFtcXHUwMTczLVxcdTAxNzNdfFtcXHUwMTc1LVxcdTAxNzVdfFtcXHUwMTc3LVxcdTAxNzddfFtcXHUwMTdBLVxcdTAxN0FdfFtcXHUwMTdDLVxcdTAxN0NdfFtcXHUwMTdFLVxcdTAxODBdfFtcXHUwMTgzLVxcdTAxODNdfFtcXHUwMTg1LVxcdTAxODVdfFtcXHUwMTg4LVxcdTAxODhdfFtcXHUwMThDLVxcdTAxOERdfFtcXHUwMTkyLVxcdTAxOTJdfFtcXHUwMTk1LVxcdTAxOTVdfFtcXHUwMTk5LVxcdTAxOUJdfFtcXHUwMTlFLVxcdTAxOUVdfFtcXHUwMUExLVxcdTAxQTFdfFtcXHUwMUEzLVxcdTAxQTNdfFtcXHUwMUE1LVxcdTAxQTVdfFtcXHUwMUE4LVxcdTAxQThdfFtcXHUwMUFCLVxcdTAxQUJdfFtcXHUwMUFELVxcdTAxQURdfFtcXHUwMUIwLVxcdTAxQjBdfFtcXHUwMUI0LVxcdTAxQjRdfFtcXHUwMUI2LVxcdTAxQjZdfFtcXHUwMUI5LVxcdTAxQkFdfFtcXHUwMUJELVxcdTAxQkRdfFtcXHUwMUM2LVxcdTAxQzZdfFtcXHUwMUM5LVxcdTAxQzldfFtcXHUwMUNDLVxcdTAxQ0NdfFtcXHUwMUNFLVxcdTAxQ0VdfFtcXHUwMUQwLVxcdTAxRDBdfFtcXHUwMUQyLVxcdTAxRDJdfFtcXHUwMUQ0LVxcdTAxRDRdfFtcXHUwMUQ2LVxcdTAxRDZdfFtcXHUwMUQ4LVxcdTAxRDhdfFtcXHUwMURBLVxcdTAxREFdfFtcXHUwMURDLVxcdTAxRERdfFtcXHUwMURGLVxcdTAxREZdfFtcXHUwMUUxLVxcdTAxRTFdfFtcXHUwMUUzLVxcdTAxRTNdfFtcXHUwMUU1LVxcdTAxRTVdfFtcXHUwMUU3LVxcdTAxRTddfFtcXHUwMUU5LVxcdTAxRTldfFtcXHUwMUVCLVxcdTAxRUJdfFtcXHUwMUVELVxcdTAxRURdfFtcXHUwMUVGLVxcdTAxRjBdfFtcXHUwMUYzLVxcdTAxRjNdfFtcXHUwMUY1LVxcdTAxRjVdfFtcXHUwMUZCLVxcdTAxRkJdfFtcXHUwMUZELVxcdTAxRkRdfFtcXHUwMUZGLVxcdTAxRkZdfFtcXHUwMjAxLVxcdTAyMDFdfFtcXHUwMjAzLVxcdTAyMDNdfFtcXHUwMjA1LVxcdTAyMDVdfFtcXHUwMjA3LVxcdTAyMDddfFtcXHUwMjA5LVxcdTAyMDldfFtcXHUwMjBCLVxcdTAyMEJdfFtcXHUwMjBELVxcdTAyMERdfFtcXHUwMjBGLVxcdTAyMEZdfFtcXHUwMjExLVxcdTAyMTFdfFtcXHUwMjEzLVxcdTAyMTNdfFtcXHUwMjE1LVxcdTAyMTVdfFtcXHUwMjE3LVxcdTAyMTddfFtcXHUwMjUwLVxcdTAyQThdfFtcXHUwMzkwLVxcdTAzOTBdfFtcXHUwM0FDLVxcdTAzQ0VdfFtcXHUwM0QwLVxcdTAzRDFdfFtcXHUwM0Q1LVxcdTAzRDZdfFtcXHUwM0UzLVxcdTAzRTNdfFtcXHUwM0U1LVxcdTAzRTVdfFtcXHUwM0U3LVxcdTAzRTddfFtcXHUwM0U5LVxcdTAzRTldfFtcXHUwM0VCLVxcdTAzRUJdfFtcXHUwM0VELVxcdTAzRURdfFtcXHUwM0VGLVxcdTAzRjJdfFtcXHUwNDMwLVxcdTA0NEZdfFtcXHUwNDUxLVxcdTA0NUNdfFtcXHUwNDVFLVxcdTA0NUZdfFtcXHUwNDYxLVxcdTA0NjFdfFtcXHUwNDYzLVxcdTA0NjNdfFtcXHUwNDY1LVxcdTA0NjVdfFtcXHUwNDY3LVxcdTA0NjddfFtcXHUwNDY5LVxcdTA0NjldfFtcXHUwNDZCLVxcdTA0NkJdfFtcXHUwNDZELVxcdTA0NkRdfFtcXHUwNDZGLVxcdTA0NkZdfFtcXHUwNDcxLVxcdTA0NzFdfFtcXHUwNDczLVxcdTA0NzNdfFtcXHUwNDc1LVxcdTA0NzVdfFtcXHUwNDc3LVxcdTA0NzddfFtcXHUwNDc5LVxcdTA0NzldfFtcXHUwNDdCLVxcdTA0N0JdfFtcXHUwNDdELVxcdTA0N0RdfFtcXHUwNDdGLVxcdTA0N0ZdfFtcXHUwNDgxLVxcdTA0ODFdfFtcXHUwNDkxLVxcdTA0OTFdfFtcXHUwNDkzLVxcdTA0OTNdfFtcXHUwNDk1LVxcdTA0OTVdfFtcXHUwNDk3LVxcdTA0OTddfFtcXHUwNDk5LVxcdTA0OTldfFtcXHUwNDlCLVxcdTA0OUJdfFtcXHUwNDlELVxcdTA0OURdfFtcXHUwNDlGLVxcdTA0OUZdfFtcXHUwNEExLVxcdTA0QTFdfFtcXHUwNEEzLVxcdTA0QTNdfFtcXHUwNEE1LVxcdTA0QTVdfFtcXHUwNEE3LVxcdTA0QTddfFtcXHUwNEE5LVxcdTA0QTldfFtcXHUwNEFCLVxcdTA0QUJdfFtcXHUwNEFELVxcdTA0QURdfFtcXHUwNEFGLVxcdTA0QUZdfFtcXHUwNEIxLVxcdTA0QjFdfFtcXHUwNEIzLVxcdTA0QjNdfFtcXHUwNEI1LVxcdTA0QjVdfFtcXHUwNEI3LVxcdTA0QjddfFtcXHUwNEI5LVxcdTA0QjldfFtcXHUwNEJCLVxcdTA0QkJdfFtcXHUwNEJELVxcdTA0QkRdfFtcXHUwNEJGLVxcdTA0QkZdfFtcXHUwNEMyLVxcdTA0QzJdfFtcXHUwNEM0LVxcdTA0QzRdfFtcXHUwNEM4LVxcdTA0QzhdfFtcXHUwNENDLVxcdTA0Q0NdfFtcXHUwNEQxLVxcdTA0RDFdfFtcXHUwNEQzLVxcdTA0RDNdfFtcXHUwNEQ1LVxcdTA0RDVdfFtcXHUwNEQ3LVxcdTA0RDddfFtcXHUwNEQ5LVxcdTA0RDldfFtcXHUwNERCLVxcdTA0REJdfFtcXHUwNERELVxcdTA0RERdfFtcXHUwNERGLVxcdTA0REZdfFtcXHUwNEUxLVxcdTA0RTFdfFtcXHUwNEUzLVxcdTA0RTNdfFtcXHUwNEU1LVxcdTA0RTVdfFtcXHUwNEU3LVxcdTA0RTddfFtcXHUwNEU5LVxcdTA0RTldfFtcXHUwNEVCLVxcdTA0RUJdfFtcXHUwNEVGLVxcdTA0RUZdfFtcXHUwNEYxLVxcdTA0RjFdfFtcXHUwNEYzLVxcdTA0RjNdfFtcXHUwNEY1LVxcdTA0RjVdfFtcXHUwNEY5LVxcdTA0RjldfFtcXHUwNTYxLVxcdTA1ODddfFtcXHUxMEQwLVxcdTEwRjZdfFtcXHUxRTAxLVxcdTFFMDFdfFtcXHUxRTAzLVxcdTFFMDNdfFtcXHUxRTA1LVxcdTFFMDVdfFtcXHUxRTA3LVxcdTFFMDddfFtcXHUxRTA5LVxcdTFFMDldfFtcXHUxRTBCLVxcdTFFMEJdfFtcXHUxRTBELVxcdTFFMERdfFtcXHUxRTBGLVxcdTFFMEZdfFtcXHUxRTExLVxcdTFFMTFdfFtcXHUxRTEzLVxcdTFFMTNdfFtcXHUxRTE1LVxcdTFFMTVdfFtcXHUxRTE3LVxcdTFFMTddfFtcXHUxRTE5LVxcdTFFMTldfFtcXHUxRTFCLVxcdTFFMUJdfFtcXHUxRTFELVxcdTFFMURdfFtcXHUxRTFGLVxcdTFFMUZdfFtcXHUxRTIxLVxcdTFFMjFdfFtcXHUxRTIzLVxcdTFFMjNdfFtcXHUxRTI1LVxcdTFFMjVdfFtcXHUxRTI3LVxcdTFFMjddfFtcXHUxRTI5LVxcdTFFMjldfFtcXHUxRTJCLVxcdTFFMkJdfFtcXHUxRTJELVxcdTFFMkRdfFtcXHUxRTJGLVxcdTFFMkZdfFtcXHUxRTMxLVxcdTFFMzFdfFtcXHUxRTMzLVxcdTFFMzNdfFtcXHUxRTM1LVxcdTFFMzVdfFtcXHUxRTM3LVxcdTFFMzddfFtcXHUxRTM5LVxcdTFFMzldfFtcXHUxRTNCLVxcdTFFM0JdfFtcXHUxRTNELVxcdTFFM0RdfFtcXHUxRTNGLVxcdTFFM0ZdfFtcXHUxRTQxLVxcdTFFNDFdfFtcXHUxRTQzLVxcdTFFNDNdfFtcXHUxRTQ1LVxcdTFFNDVdfFtcXHUxRTQ3LVxcdTFFNDddfFtcXHUxRTQ5LVxcdTFFNDldfFtcXHUxRTRCLVxcdTFFNEJdfFtcXHUxRTRELVxcdTFFNERdfFtcXHUxRTRGLVxcdTFFNEZdfFtcXHUxRTUxLVxcdTFFNTFdfFtcXHUxRTUzLVxcdTFFNTNdfFtcXHUxRTU1LVxcdTFFNTVdfFtcXHUxRTU3LVxcdTFFNTddfFtcXHUxRTU5LVxcdTFFNTldfFtcXHUxRTVCLVxcdTFFNUJdfFtcXHUxRTVELVxcdTFFNURdfFtcXHUxRTVGLVxcdTFFNUZdfFtcXHUxRTYxLVxcdTFFNjFdfFtcXHUxRTYzLVxcdTFFNjNdfFtcXHUxRTY1LVxcdTFFNjVdfFtcXHUxRTY3LVxcdTFFNjddfFtcXHUxRTY5LVxcdTFFNjldfFtcXHUxRTZCLVxcdTFFNkJdfFtcXHUxRTZELVxcdTFFNkRdfFtcXHUxRTZGLVxcdTFFNkZdfFtcXHUxRTcxLVxcdTFFNzFdfFtcXHUxRTczLVxcdTFFNzNdfFtcXHUxRTc1LVxcdTFFNzVdfFtcXHUxRTc3LVxcdTFFNzddfFtcXHUxRTc5LVxcdTFFNzldfFtcXHUxRTdCLVxcdTFFN0JdfFtcXHUxRTdELVxcdTFFN0RdfFtcXHUxRTdGLVxcdTFFN0ZdfFtcXHUxRTgxLVxcdTFFODFdfFtcXHUxRTgzLVxcdTFFODNdfFtcXHUxRTg1LVxcdTFFODVdfFtcXHUxRTg3LVxcdTFFODddfFtcXHUxRTg5LVxcdTFFODldfFtcXHUxRThCLVxcdTFFOEJdfFtcXHUxRThELVxcdTFFOERdfFtcXHUxRThGLVxcdTFFOEZdfFtcXHUxRTkxLVxcdTFFOTFdfFtcXHUxRTkzLVxcdTFFOTNdfFtcXHUxRTk1LVxcdTFFOUJdfFtcXHUxRUExLVxcdTFFQTFdfFtcXHUxRUEzLVxcdTFFQTNdfFtcXHUxRUE1LVxcdTFFQTVdfFtcXHUxRUE3LVxcdTFFQTddfFtcXHUxRUE5LVxcdTFFQTldfFtcXHUxRUFCLVxcdTFFQUJdfFtcXHUxRUFELVxcdTFFQURdfFtcXHUxRUFGLVxcdTFFQUZdfFtcXHUxRUIxLVxcdTFFQjFdfFtcXHUxRUIzLVxcdTFFQjNdfFtcXHUxRUI1LVxcdTFFQjVdfFtcXHUxRUI3LVxcdTFFQjddfFtcXHUxRUI5LVxcdTFFQjldfFtcXHUxRUJCLVxcdTFFQkJdfFtcXHUxRUJELVxcdTFFQkRdfFtcXHUxRUJGLVxcdTFFQkZdfFtcXHUxRUMxLVxcdTFFQzFdfFtcXHUxRUMzLVxcdTFFQzNdfFtcXHUxRUM1LVxcdTFFQzVdfFtcXHUxRUM3LVxcdTFFQzddfFtcXHUxRUM5LVxcdTFFQzldfFtcXHUxRUNCLVxcdTFFQ0JdfFtcXHUxRUNELVxcdTFFQ0RdfFtcXHUxRUNGLVxcdTFFQ0ZdfFtcXHUxRUQxLVxcdTFFRDFdfFtcXHUxRUQzLVxcdTFFRDNdfFtcXHUxRUQ1LVxcdTFFRDVdfFtcXHUxRUQ3LVxcdTFFRDddfFtcXHUxRUQ5LVxcdTFFRDldfFtcXHUxRURCLVxcdTFFREJdfFtcXHUxRURELVxcdTFFRERdfFtcXHUxRURGLVxcdTFFREZdfFtcXHUxRUUxLVxcdTFFRTFdfFtcXHUxRUUzLVxcdTFFRTNdfFtcXHUxRUU1LVxcdTFFRTVdfFtcXHUxRUU3LVxcdTFFRTddfFtcXHUxRUU5LVxcdTFFRTldfFtcXHUxRUVCLVxcdTFFRUJdfFtcXHUxRUVELVxcdTFFRURdfFtcXHUxRUVGLVxcdTFFRUZdfFtcXHUxRUYxLVxcdTFFRjFdfFtcXHUxRUYzLVxcdTFFRjNdfFtcXHUxRUY1LVxcdTFFRjVdfFtcXHUxRUY3LVxcdTFFRjddfFtcXHUxRUY5LVxcdTFFRjldfFtcXHUxRjAwLVxcdTFGMDddfFtcXHUxRjEwLVxcdTFGMTVdfFtcXHUxRjIwLVxcdTFGMjddfFtcXHUxRjMwLVxcdTFGMzddfFtcXHUxRjQwLVxcdTFGNDVdfFtcXHUxRjUwLVxcdTFGNTddfFtcXHUxRjYwLVxcdTFGNjddfFtcXHUxRjcwLVxcdTFGN0RdfFtcXHUxRjgwLVxcdTFGODddfFtcXHUxRjkwLVxcdTFGOTddfFtcXHUxRkEwLVxcdTFGQTddfFtcXHUxRkIwLVxcdTFGQjRdfFtcXHUxRkI2LVxcdTFGQjddfFtcXHUxRkJFLVxcdTFGQkVdfFtcXHUxRkMyLVxcdTFGQzRdfFtcXHUxRkM2LVxcdTFGQzddfFtcXHUxRkQwLVxcdTFGRDNdfFtcXHUxRkQ2LVxcdTFGRDddfFtcXHUxRkUwLVxcdTFGRTddfFtcXHUxRkYyLVxcdTFGRjRdfFtcXHUxRkY2LVxcdTFGRjddfFtcXHUyMDdGLVxcdTIwN0ZdfFtcXHUyMTBBLVxcdTIxMEFdfFtcXHUyMTBFLVxcdTIxMEZdfFtcXHUyMTEzLVxcdTIxMTNdfFtcXHUyMTE4LVxcdTIxMThdfFtcXHUyMTJFLVxcdTIxMkZdfFtcXHUyMTM0LVxcdTIxMzRdfFtcXHVGQjAwLVxcdUZCMDZdfFtcXHVGQjEzLVxcdUZCMTddfFtcXHVGRjQxLVxcdUZGNUFdfFtcXHUwMUM1LVxcdTAxQzVdfFtcXHUwMUM4LVxcdTAxQzhdfFtcXHUwMUNCLVxcdTAxQ0JdfFtcXHUwMUYyLVxcdTAxRjJdfFtcXHUwMkIwLVxcdTAyQjhdfFtcXHUwMkJCLVxcdTAyQzFdfFtcXHUwMkQwLVxcdTAyRDFdfFtcXHUwMkUwLVxcdTAyRTRdfFtcXHUwMzdBLVxcdTAzN0FdfFtcXHUwNTU5LVxcdTA1NTldfFtcXHUwNjQwLVxcdTA2NDBdfFtcXHUwNkU1LVxcdTA2RTZdfFtcXHUwRTQ2LVxcdTBFNDZdfFtcXHUwRUM2LVxcdTBFQzZdfFtcXHUzMDA1LVxcdTMwMDVdfFtcXHUzMDMxLVxcdTMwMzVdfFtcXHUzMDlELVxcdTMwOUVdfFtcXHUzMEZDLVxcdTMwRkVdfFtcXHVGRjcwLVxcdUZGNzBdfFtcXHVGRjlFLVxcdUZGOUZdfFtcXHUwMUFBLVxcdTAxQUFdfFtcXHUwMUJCLVxcdTAxQkJdfFtcXHUwMUJFLVxcdTAxQzNdfFtcXHUwM0YzLVxcdTAzRjNdfFtcXHUwNEMwLVxcdTA0QzBdfFtcXHUwNUQwLVxcdTA1RUFdfFtcXHUwNUYwLVxcdTA1RjJdfFtcXHUwNjIxLVxcdTA2M0FdfFtcXHUwNjQxLVxcdTA2NEFdfFtcXHUwNjcxLVxcdTA2QjddfFtcXHUwNkJBLVxcdTA2QkVdfFtcXHUwNkMwLVxcdTA2Q0VdfFtcXHUwNkQwLVxcdTA2RDNdfFtcXHUwNkQ1LVxcdTA2RDVdfFtcXHUwOTA1LVxcdTA5MzldfFtcXHUwOTNELVxcdTA5M0RdfFtcXHUwOTUwLVxcdTA5NTBdfFtcXHUwOTU4LVxcdTA5NjFdfFtcXHUwOTg1LVxcdTA5OENdfFtcXHUwOThGLVxcdTA5OTBdfFtcXHUwOTkzLVxcdTA5QThdfFtcXHUwOUFBLVxcdTA5QjBdfFtcXHUwOUIyLVxcdTA5QjJdfFtcXHUwOUI2LVxcdTA5QjldfFtcXHUwOURDLVxcdTA5RERdfFtcXHUwOURGLVxcdTA5RTFdfFtcXHUwOUYwLVxcdTA5RjFdfFtcXHUwQTA1LVxcdTBBMEFdfFtcXHUwQTBGLVxcdTBBMTBdfFtcXHUwQTEzLVxcdTBBMjhdfFtcXHUwQTJBLVxcdTBBMzBdfFtcXHUwQTMyLVxcdTBBMzNdfFtcXHUwQTM1LVxcdTBBMzZdfFtcXHUwQTM4LVxcdTBBMzldfFtcXHUwQTU5LVxcdTBBNUNdfFtcXHUwQTVFLVxcdTBBNUVdfFtcXHUwQTcyLVxcdTBBNzRdfFtcXHUwQTg1LVxcdTBBOEJdfFtcXHUwQThELVxcdTBBOERdfFtcXHUwQThGLVxcdTBBOTFdfFtcXHUwQTkzLVxcdTBBQThdfFtcXHUwQUFBLVxcdTBBQjBdfFtcXHUwQUIyLVxcdTBBQjNdfFtcXHUwQUI1LVxcdTBBQjldfFtcXHUwQUJELVxcdTBBQkRdfFtcXHUwQUQwLVxcdTBBRDBdfFtcXHUwQUUwLVxcdTBBRTBdfFtcXHUwQjA1LVxcdTBCMENdfFtcXHUwQjBGLVxcdTBCMTBdfFtcXHUwQjEzLVxcdTBCMjhdfFtcXHUwQjJBLVxcdTBCMzBdfFtcXHUwQjMyLVxcdTBCMzNdfFtcXHUwQjM2LVxcdTBCMzldfFtcXHUwQjNELVxcdTBCM0RdfFtcXHUwQjVDLVxcdTBCNURdfFtcXHUwQjVGLVxcdTBCNjFdfFtcXHUwQjg1LVxcdTBCOEFdfFtcXHUwQjhFLVxcdTBCOTBdfFtcXHUwQjkyLVxcdTBCOTVdfFtcXHUwQjk5LVxcdTBCOUFdfFtcXHUwQjlDLVxcdTBCOUNdfFtcXHUwQjlFLVxcdTBCOUZdfFtcXHUwQkEzLVxcdTBCQTRdfFtcXHUwQkE4LVxcdTBCQUFdfFtcXHUwQkFFLVxcdTBCQjVdfFtcXHUwQkI3LVxcdTBCQjldfFtcXHUwQzA1LVxcdTBDMENdfFtcXHUwQzBFLVxcdTBDMTBdfFtcXHUwQzEyLVxcdTBDMjhdfFtcXHUwQzJBLVxcdTBDMzNdfFtcXHUwQzM1LVxcdTBDMzldfFtcXHUwQzYwLVxcdTBDNjFdfFtcXHUwQzg1LVxcdTBDOENdfFtcXHUwQzhFLVxcdTBDOTBdfFtcXHUwQzkyLVxcdTBDQThdfFtcXHUwQ0FBLVxcdTBDQjNdfFtcXHUwQ0I1LVxcdTBDQjldfFtcXHUwQ0RFLVxcdTBDREVdfFtcXHUwQ0UwLVxcdTBDRTFdfFtcXHUwRDA1LVxcdTBEMENdfFtcXHUwRDBFLVxcdTBEMTBdfFtcXHUwRDEyLVxcdTBEMjhdfFtcXHUwRDJBLVxcdTBEMzldfFtcXHUwRDYwLVxcdTBENjFdfFtcXHUwRTAxLVxcdTBFMzBdfFtcXHUwRTMyLVxcdTBFMzNdfFtcXHUwRTQwLVxcdTBFNDVdfFtcXHUwRTgxLVxcdTBFODJdfFtcXHUwRTg0LVxcdTBFODRdfFtcXHUwRTg3LVxcdTBFODhdfFtcXHUwRThBLVxcdTBFOEFdfFtcXHUwRThELVxcdTBFOERdfFtcXHUwRTk0LVxcdTBFOTddfFtcXHUwRTk5LVxcdTBFOUZdfFtcXHUwRUExLVxcdTBFQTNdfFtcXHUwRUE1LVxcdTBFQTVdfFtcXHUwRUE3LVxcdTBFQTddfFtcXHUwRUFBLVxcdTBFQUJdfFtcXHUwRUFELVxcdTBFQjBdfFtcXHUwRUIyLVxcdTBFQjNdfFtcXHUwRUJELVxcdTBFQkRdfFtcXHUwRUMwLVxcdTBFQzRdfFtcXHUwRURDLVxcdTBFRERdfFtcXHUwRjAwLVxcdTBGMDBdfFtcXHUwRjQwLVxcdTBGNDddfFtcXHUwRjQ5LVxcdTBGNjldfFtcXHUwRjg4LVxcdTBGOEJdfFtcXHUxMTAwLVxcdTExNTldfFtcXHUxMTVGLVxcdTExQTJdfFtcXHUxMUE4LVxcdTExRjldfFtcXHUyMTM1LVxcdTIxMzhdfFtcXHUzMDA2LVxcdTMwMDZdfFtcXHUzMDQxLVxcdTMwOTRdfFtcXHUzMEExLVxcdTMwRkFdfFtcXHUzMTA1LVxcdTMxMkNdfFtcXHUzMTMxLVxcdTMxOEVdfFtcXHU0RTAwLVxcdTlGQTVdfFtcXHVBQzAwLVxcdUQ3QTNdfFtcXHVGOTAwLVxcdUZBMkRdfFtcXHVGQjFGLVxcdUZCMjhdfFtcXHVGQjJBLVxcdUZCMzZdfFtcXHVGQjM4LVxcdUZCM0NdfFtcXHVGQjNFLVxcdUZCM0VdfFtcXHVGQjQwLVxcdUZCNDFdfFtcXHVGQjQzLVxcdUZCNDRdfFtcXHVGQjQ2LVxcdUZCQjFdfFtcXHVGQkQzLVxcdUZEM0RdfFtcXHVGRDUwLVxcdUZEOEZdfFtcXHVGRDkyLVxcdUZEQzddfFtcXHVGREYwLVxcdUZERkJdfFtcXHVGRTcwLVxcdUZFNzJdfFtcXHVGRTc0LVxcdUZFNzRdfFtcXHVGRTc2LVxcdUZFRkNdfFtcXHVGRjY2LVxcdUZGNkZdfFtcXHVGRjcxLVxcdUZGOURdfFtcXHVGRkEwLVxcdUZGQkVdfFtcXHVGRkMyLVxcdUZGQzddfFtcXHVGRkNBLVxcdUZGQ0ZdfFtcXHVGRkQyLVxcdUZGRDddfFtcXHVGRkRBLVxcdUZGRENdLyxcbiAgTHRtbzogL1tcXHUwMUM1LVxcdTAxQzVdfFtcXHUwMUM4LVxcdTAxQzhdfFtcXHUwMUNCLVxcdTAxQ0JdfFtcXHUwMUYyLVxcdTAxRjJdW1xcdTAyQjAtXFx1MDJCOF18W1xcdTAyQkItXFx1MDJDMV18W1xcdTAyRDAtXFx1MDJEMV18W1xcdTAyRTAtXFx1MDJFNF18W1xcdTAzN0EtXFx1MDM3QV18W1xcdTA1NTktXFx1MDU1OV18W1xcdTA2NDAtXFx1MDY0MF18W1xcdTA2RTUtXFx1MDZFNl18W1xcdTBFNDYtXFx1MEU0Nl18W1xcdTBFQzYtXFx1MEVDNl18W1xcdTMwMDUtXFx1MzAwNV18W1xcdTMwMzEtXFx1MzAzNV18W1xcdTMwOUQtXFx1MzA5RV18W1xcdTMwRkMtXFx1MzBGRV18W1xcdUZGNzAtXFx1RkY3MF18W1xcdUZGOUUtXFx1RkY5Rl1bXFx1MDFBQS1cXHUwMUFBXXxbXFx1MDFCQi1cXHUwMUJCXXxbXFx1MDFCRS1cXHUwMUMzXXxbXFx1MDNGMy1cXHUwM0YzXXxbXFx1MDRDMC1cXHUwNEMwXXxbXFx1MDVEMC1cXHUwNUVBXXxbXFx1MDVGMC1cXHUwNUYyXXxbXFx1MDYyMS1cXHUwNjNBXXxbXFx1MDY0MS1cXHUwNjRBXXxbXFx1MDY3MS1cXHUwNkI3XXxbXFx1MDZCQS1cXHUwNkJFXXxbXFx1MDZDMC1cXHUwNkNFXXxbXFx1MDZEMC1cXHUwNkQzXXxbXFx1MDZENS1cXHUwNkQ1XXxbXFx1MDkwNS1cXHUwOTM5XXxbXFx1MDkzRC1cXHUwOTNEXXxbXFx1MDk1MC1cXHUwOTUwXXxbXFx1MDk1OC1cXHUwOTYxXXxbXFx1MDk4NS1cXHUwOThDXXxbXFx1MDk4Ri1cXHUwOTkwXXxbXFx1MDk5My1cXHUwOUE4XXxbXFx1MDlBQS1cXHUwOUIwXXxbXFx1MDlCMi1cXHUwOUIyXXxbXFx1MDlCNi1cXHUwOUI5XXxbXFx1MDlEQy1cXHUwOUREXXxbXFx1MDlERi1cXHUwOUUxXXxbXFx1MDlGMC1cXHUwOUYxXXxbXFx1MEEwNS1cXHUwQTBBXXxbXFx1MEEwRi1cXHUwQTEwXXxbXFx1MEExMy1cXHUwQTI4XXxbXFx1MEEyQS1cXHUwQTMwXXxbXFx1MEEzMi1cXHUwQTMzXXxbXFx1MEEzNS1cXHUwQTM2XXxbXFx1MEEzOC1cXHUwQTM5XXxbXFx1MEE1OS1cXHUwQTVDXXxbXFx1MEE1RS1cXHUwQTVFXXxbXFx1MEE3Mi1cXHUwQTc0XXxbXFx1MEE4NS1cXHUwQThCXXxbXFx1MEE4RC1cXHUwQThEXXxbXFx1MEE4Ri1cXHUwQTkxXXxbXFx1MEE5My1cXHUwQUE4XXxbXFx1MEFBQS1cXHUwQUIwXXxbXFx1MEFCMi1cXHUwQUIzXXxbXFx1MEFCNS1cXHUwQUI5XXxbXFx1MEFCRC1cXHUwQUJEXXxbXFx1MEFEMC1cXHUwQUQwXXxbXFx1MEFFMC1cXHUwQUUwXXxbXFx1MEIwNS1cXHUwQjBDXXxbXFx1MEIwRi1cXHUwQjEwXXxbXFx1MEIxMy1cXHUwQjI4XXxbXFx1MEIyQS1cXHUwQjMwXXxbXFx1MEIzMi1cXHUwQjMzXXxbXFx1MEIzNi1cXHUwQjM5XXxbXFx1MEIzRC1cXHUwQjNEXXxbXFx1MEI1Qy1cXHUwQjVEXXxbXFx1MEI1Ri1cXHUwQjYxXXxbXFx1MEI4NS1cXHUwQjhBXXxbXFx1MEI4RS1cXHUwQjkwXXxbXFx1MEI5Mi1cXHUwQjk1XXxbXFx1MEI5OS1cXHUwQjlBXXxbXFx1MEI5Qy1cXHUwQjlDXXxbXFx1MEI5RS1cXHUwQjlGXXxbXFx1MEJBMy1cXHUwQkE0XXxbXFx1MEJBOC1cXHUwQkFBXXxbXFx1MEJBRS1cXHUwQkI1XXxbXFx1MEJCNy1cXHUwQkI5XXxbXFx1MEMwNS1cXHUwQzBDXXxbXFx1MEMwRS1cXHUwQzEwXXxbXFx1MEMxMi1cXHUwQzI4XXxbXFx1MEMyQS1cXHUwQzMzXXxbXFx1MEMzNS1cXHUwQzM5XXxbXFx1MEM2MC1cXHUwQzYxXXxbXFx1MEM4NS1cXHUwQzhDXXxbXFx1MEM4RS1cXHUwQzkwXXxbXFx1MEM5Mi1cXHUwQ0E4XXxbXFx1MENBQS1cXHUwQ0IzXXxbXFx1MENCNS1cXHUwQ0I5XXxbXFx1MENERS1cXHUwQ0RFXXxbXFx1MENFMC1cXHUwQ0UxXXxbXFx1MEQwNS1cXHUwRDBDXXxbXFx1MEQwRS1cXHUwRDEwXXxbXFx1MEQxMi1cXHUwRDI4XXxbXFx1MEQyQS1cXHUwRDM5XXxbXFx1MEQ2MC1cXHUwRDYxXXxbXFx1MEUwMS1cXHUwRTMwXXxbXFx1MEUzMi1cXHUwRTMzXXxbXFx1MEU0MC1cXHUwRTQ1XXxbXFx1MEU4MS1cXHUwRTgyXXxbXFx1MEU4NC1cXHUwRTg0XXxbXFx1MEU4Ny1cXHUwRTg4XXxbXFx1MEU4QS1cXHUwRThBXXxbXFx1MEU4RC1cXHUwRThEXXxbXFx1MEU5NC1cXHUwRTk3XXxbXFx1MEU5OS1cXHUwRTlGXXxbXFx1MEVBMS1cXHUwRUEzXXxbXFx1MEVBNS1cXHUwRUE1XXxbXFx1MEVBNy1cXHUwRUE3XXxbXFx1MEVBQS1cXHUwRUFCXXxbXFx1MEVBRC1cXHUwRUIwXXxbXFx1MEVCMi1cXHUwRUIzXXxbXFx1MEVCRC1cXHUwRUJEXXxbXFx1MEVDMC1cXHUwRUM0XXxbXFx1MEVEQy1cXHUwRUREXXxbXFx1MEYwMC1cXHUwRjAwXXxbXFx1MEY0MC1cXHUwRjQ3XXxbXFx1MEY0OS1cXHUwRjY5XXxbXFx1MEY4OC1cXHUwRjhCXXxbXFx1MTEwMC1cXHUxMTU5XXxbXFx1MTE1Ri1cXHUxMUEyXXxbXFx1MTFBOC1cXHUxMUY5XXxbXFx1MjEzNS1cXHUyMTM4XXxbXFx1MzAwNi1cXHUzMDA2XXxbXFx1MzA0MS1cXHUzMDk0XXxbXFx1MzBBMS1cXHUzMEZBXXxbXFx1MzEwNS1cXHUzMTJDXXxbXFx1MzEzMS1cXHUzMThFXXxbXFx1NEUwMC1cXHU5RkE1XXxbXFx1QUMwMC1cXHVEN0EzXXxbXFx1RjkwMC1cXHVGQTJEXXxbXFx1RkIxRi1cXHVGQjI4XXxbXFx1RkIyQS1cXHVGQjM2XXxbXFx1RkIzOC1cXHVGQjNDXXxbXFx1RkIzRS1cXHVGQjNFXXxbXFx1RkI0MC1cXHVGQjQxXXxbXFx1RkI0My1cXHVGQjQ0XXxbXFx1RkI0Ni1cXHVGQkIxXXxbXFx1RkJEMy1cXHVGRDNEXXxbXFx1RkQ1MC1cXHVGRDhGXXxbXFx1RkQ5Mi1cXHVGREM3XXxbXFx1RkRGMC1cXHVGREZCXXxbXFx1RkU3MC1cXHVGRTcyXXxbXFx1RkU3NC1cXHVGRTc0XXxbXFx1RkU3Ni1cXHVGRUZDXXxbXFx1RkY2Ni1cXHVGRjZGXXxbXFx1RkY3MS1cXHVGRjlEXXxbXFx1RkZBMC1cXHVGRkJFXXxbXFx1RkZDMi1cXHVGRkM3XXxbXFx1RkZDQS1cXHVGRkNGXXxbXFx1RkZEMi1cXHVGRkQ3XXxbXFx1RkZEQS1cXHVGRkRDXS9cbn07XG4iXX0=
