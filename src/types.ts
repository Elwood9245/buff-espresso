// 咖啡豆基本信息
export interface CoffeeInfo {
  name: string
  process: string
  roastDate: string
  openDate: string
  testDate: string
}

// 萃取参数
export interface ExtractionParams {
  grindSize: string
  dose: number | null
  liquidYield: number | null
  time: number | null
  temperature: number | null
  other: string
}

// 味觉评估通用结构（酸/甜不单独打分）
export interface TasteItem {
  selected: string[]
  custom: string[]
  unacceptable: boolean
}

// 苦味评估（结构特殊，不单独打分）
export interface TasteBitter {
  negativeSelected: string[]
  acceptableSelected: string[]
  custom: string[]
  unacceptable: boolean
}

// 味觉平衡
export interface TasteBalance {
  selected: string
  score: number
}

// 口腔触感
export interface MouthfeelData {
  weight: string
  textureSelected: string[]
  textureCustom: string[]
  score: number
}

// 风味描述
export interface FlavorData {
  selected: string[]
  custom: string[]
  score: number
}

// 调整萃取
export interface AdjustmentData {
  reason: string
  howTo: string
}

// 预设选项常量
export const ACID_OPTIONS = ['刺激', '尖锐', '多汁', '明亮', '圆润', '成熟水果', '发酵类'] as const
export const ACID_UNACCEPTABLE_KEYS = ['刺激', '尖锐'] as const

export const SWEET_OPTIONS = ['微弱', '温和', '圆润', '水果甜', '黄糖甜', '牛奶巧克力甜'] as const
export const SWEET_UNACCEPTABLE_KEYS = ['微弱'] as const

export const BITTER_NEGATIVE = ['焦味', '伴随粗糙刺激', '过度主导只有苦'] as const
export const BITTER_ACCEPTABLE = ['茶苦', '荞麦', '香料', '焦糖', '可可'] as const
export const BITTER_UNACCEPTABLE_KEYS = BITTER_NEGATIVE

export const BALANCE_OPTIONS = ['酸甜，酸为主', '酸甜，甜为主', '苦甜，能感受到甜', '酸苦（需调整）'] as const

export const WEIGHT_OPTIONS = ['像水一样', '轻盈', '中等', '厚重'] as const

export const TEXTURE_OPTIONS = ['有涩感/不适宜的粉感', '多汁', '顺滑', '饱满', '油滑'] as const

export const FLAVOR_STRUCTURE: Record<string, string[]> = {
  '花香': [],
  '茶香': [],
  '水果': ['莓果', '果干', '柑橘', '核果', '热带水果'],
  '甜味': ['黄糖', '香草'],
  '发酵': ['酒味'],
  '绿色/植物': ['草本植物', '根茎'],
  '烘烤': ['麦芽', '吐司', '烟熏'],
  '香料': ['棕色香料', '胡椒'],
  '坚果 可可': [],
}

export const FLAVOR_CATEGORY_KEYS = Object.keys(FLAVOR_STRUCTURE)

export function isFlavorCategory(item: string): boolean {
  return item in FLAVOR_STRUCTURE
}

// 完整记录接口
export interface CuppingRecord {
  coffeeInfo: CoffeeInfo
  extraction: ExtractionParams
  acid: TasteItem
  sweet: TasteItem
  bitter: TasteBitter
  balance: TasteBalance
  mouthfeel: MouthfeelData
  flavor: FlavorData
  adjustment: AdjustmentData
}

// 默认值
export function defaultCoffeeInfo(): CoffeeInfo {
  const today = new Date().toISOString().split('T')[0]
  return { name: '', process: '', roastDate: '', openDate: '', testDate: today }
}

export function defaultExtraction(): ExtractionParams {
  return { grindSize: '', dose: null, liquidYield: null, time: null, temperature: null, other: '' }
}

export function defaultTasteItem(): TasteItem {
  return { selected: [], custom: [], unacceptable: false }
}

export function defaultTasteBitter(): TasteBitter {
  return { negativeSelected: [], acceptableSelected: [], custom: [], unacceptable: false }
}

export function defaultTasteBalance(): TasteBalance {
  return { selected: '', score: 2 }
}

export function defaultMouthfeel(): MouthfeelData {
  return { weight: '', textureSelected: [], textureCustom: [], score: 2 }
}

export function defaultFlavor(): FlavorData {
  return { selected: [], custom: [], score: 2 }
}

export function defaultAdjustment(): AdjustmentData {
  return { reason: '', howTo: '' }
}

export function defaultRecord(): CuppingRecord {
  return {
    coffeeInfo: defaultCoffeeInfo(),
    extraction: defaultExtraction(),
    acid: defaultTasteItem(),
    sweet: defaultTasteItem(),
    bitter: defaultTasteBitter(),
    balance: defaultTasteBalance(),
    mouthfeel: defaultMouthfeel(),
    flavor: defaultFlavor(),
    adjustment: defaultAdjustment(),
  }
}

// 分档评级计算（总分 0-12，单项 0-4）
export const SCORE_LABELS: Record<number, string> = {
  0: '不可接受',
  1: '可接受',
  2: '一般（便利店出品标准）',
  3: '好（有正面感受，但也可感受到些许负面感受）',
  4: '很好（喝了还想喝）',
}

export function computeGrade(totalScore: number): string {
  if (totalScore === 0) return '不可接受'
  if (totalScore <= 2) return '可接受'
  if (totalScore <= 5) return '一般（便利店出品标准）'
  if (totalScore <= 9) return '好（有正面感受，但也可感受到些许负面感受）'
  return '很好（喝了还想喝）'
}

export function computeVerdict(totalScore: number): 'pass' | 'adjust' {
  return totalScore >= 10 ? 'pass' : 'adjust'
}
