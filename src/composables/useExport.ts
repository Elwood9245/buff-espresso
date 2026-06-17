import type { CuppingRecord } from '../types'
import {
  computeGrade, computeVerdict, isFlavorCategory, FLAVOR_STRUCTURE, SCORE_LABELS,
  ACID_OPTIONS, SWEET_OPTIONS,
} from '../types'
import * as XLSX from 'xlsx'

// 数字字段清空时 v-model.number 会产生 NaN，导出前转为空字符串
function sanitizeNumber(value: unknown): string | number {
  if (value === null || value === '') return ''
  if (typeof value === 'number' && Number.isNaN(value)) return ''
  return value as string | number
}

export function useExport() {
  function exportToExcel(record: CuppingRecord) {
    const totalScore = record.balance.score + record.mouthfeel.score + record.flavor.score
    const verdictRaw = computeVerdict(totalScore)
    const verdict = verdictRaw === 'pass' ? '✅ 可出品' : '⚠️ 需调整'
    const grade = computeGrade(totalScore)

    // 从 selected 中分离预设词和自定义词
    const acidPresets = record.acid.selected.filter(w => (ACID_OPTIONS as readonly string[]).includes(w))
    const acidCustom = record.acid.selected.filter(w => !(ACID_OPTIONS as readonly string[]).includes(w))
    const sweetPresets = record.sweet.selected.filter(w => (SWEET_OPTIONS as readonly string[]).includes(w))
    const sweetCustom = record.sweet.selected.filter(w => !(SWEET_OPTIONS as readonly string[]).includes(w))

    const allSubs = Object.values(FLAVOR_STRUCTURE).flat()
    const flavorCategories = record.flavor.selected.filter(w => isFlavorCategory(w))
    const flavorSubs = record.flavor.selected.filter(w => allSubs.includes(w))
    const flavorCustom = record.flavor.selected.filter(w => !isFlavorCategory(w) && !allSubs.includes(w))

    const balanceLabel = SCORE_LABELS[record.balance.score] ?? record.balance.score
    const mouthfeelLabel = SCORE_LABELS[record.mouthfeel.score] ?? record.mouthfeel.score
    const flavorLabel = SCORE_LABELS[record.flavor.score] ?? record.flavor.score

    type Row = [string, string | number]
    const sections: { title: string; rows: Row[] }[] = [
      {
        title: '咖啡豆基本信息',
        rows: [
          ['名称', record.coffeeInfo.name],
          ['处理方法', record.coffeeInfo.process],
          ['烘焙日期', record.coffeeInfo.roastDate],
          ['开袋日期', record.coffeeInfo.openDate],
          ['测试日期', record.coffeeInfo.testDate],
        ],
      },
      {
        title: '萃取参数',
        rows: [
          ['研磨刻度', record.extraction.grindSize],
          ['粉重 (g)', sanitizeNumber(record.extraction.dose)],
          ['液重 (g)', sanitizeNumber(record.extraction.liquidYield)],
          ['萃取时间 (s)', sanitizeNumber(record.extraction.time)],
          ['水温 (°C)', sanitizeNumber(record.extraction.temperature)],
          ['其他', record.extraction.other],
        ],
      },
      {
        title: '味觉评估 — 酸',
        rows: [
          ['选项', acidPresets.join('、')],
          ['自定义', acidCustom.join('、')],
          ['不能接受', record.acid.unacceptable ? '是' : '否'],
        ],
      },
      {
        title: '味觉评估 — 甜',
        rows: [
          ['选项', sweetPresets.join('、')],
          ['自定义', sweetCustom.join('、')],
          ['不能接受', record.sweet.unacceptable ? '是' : '否'],
        ],
      },
      {
        title: '味觉评估 — 苦',
        rows: [
          ['负面感受', record.bitter.negativeSelected.join('、')],
          ['可接受感受', record.bitter.acceptableSelected.join('、')],
          ['自定义', record.bitter.custom.join('、')],
          ['不能接受', record.bitter.unacceptable ? '是' : '否'],
        ],
      },
      {
        title: '味觉平衡感',
        rows: [
          ['选项', record.balance.selected],
          ['评分', `${record.balance.score} — ${balanceLabel}`],
        ],
      },
      {
        title: '口腔触感',
        rows: [
          ['重量感', record.mouthfeel.weight],
          ['质地选项', record.mouthfeel.textureSelected.join('、')],
          ['自定义质地', record.mouthfeel.textureCustom.join('、')],
          ['评分', `${record.mouthfeel.score} — ${mouthfeelLabel}`],
        ],
      },
      {
        title: '风味描述',
        rows: [
          ['大类', flavorCategories.join('、')],
          ['分项', flavorSubs.join('、')],
          ['自定义', flavorCustom.join('、')],
          ['评分', `${record.flavor.score} — ${flavorLabel}`],
        ],
      },
      {
        title: '调整萃取',
        rows: [
          ['调整原因', record.adjustment.reason],
          ['调整方案', record.adjustment.howTo],
        ],
      },
      {
        title: '最终评估',
        rows: [
          ['味觉平衡分', record.balance.score],
          ['口腔触感分', record.mouthfeel.score],
          ['风味描述分', record.flavor.score],
          ['总分', totalScore],
          ['出品结论', verdict],
          ['分档评级', grade],
        ],
      },
    ]

    const aoa: (string | number)[][] = []
    const merges: XLSX.Range[] = []
    let rowIdx = 0

    for (const section of sections) {
      const filledRows = section.rows.filter(r => r[1] !== '' && r[1] !== null)

      aoa.push([section.title, ''])
      merges.push({ s: { r: rowIdx, c: 0 }, e: { r: rowIdx, c: 1 } })
      rowIdx++

      for (const [label, value] of filledRows) {
        aoa.push([label, value])
        rowIdx++
      }

      aoa.push(['', ''])
      rowIdx++
    }

    const ws = XLSX.utils.aoa_to_sheet(aoa)
    ws['!merges'] = merges
    ws['!cols'] = [
      { wch: 18 },
      { wch: 42 },
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '冲煮记录')

    const now = new Date()
    const ts = now.toISOString().replace(/[:.]/g, '').slice(0, 15).replace('T', '-')
    const filename = `冲煮记录_${ts}.xlsx`

    XLSX.writeFile(wb, filename)
  }

  return { exportToExcel }
}
