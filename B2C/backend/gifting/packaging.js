'use strict';

const items = require('./items.json');

/**
 * Calculates required packaging boxes automatically for fulfillment & inventory operations:
 * - Each pre-configured Gift Hamper is an independent presentation gift box (1 box per hamper).
 * - Individual loose items (sweets, stationery, candles, teas) are packed at 4-5 items per box (capacity: 5).
 * - Customer never needs to configure or choose boxes.
 *
 * @param {Array<{id: string, quantity: number}>} draftItems
 * @returns {{
 *   totalBoxes: number,
 *   hamperBoxes: number,
 *   looseBoxes: number,
 *   looseItems: number,
 *   breakdown: { hampers: Array<{id: string, name: string, quantity: number, boxes: number}>, loose: { count: number, boxesNeeded: number } },
 *   summary: string
 * }}
 */
function calculatePackaging(draftItems = []) {
  if (!Array.isArray(draftItems) || !draftItems.length) {
    return {
      totalBoxes: 0,
      hamperBoxes: 0,
      looseBoxes: 0,
      looseItems: 0,
      breakdown: { hampers: [], loose: { count: 0, boxesNeeded: 0 } },
      summary: '0 Boxes'
    };
  }

  let hamperBoxes = 0;
  let looseItems = 0;
  const hamperBreakdown = [];

  for (const row of draftItems) {
    if (!row || !row.id || !row.quantity) continue;
    const item = items.find(i => i.id === row.id);
    const isHamper = item?.category === 'Gift Hampers' || row.id.endsWith('_hamper');

    if (isHamper) {
      hamperBoxes += row.quantity;
      hamperBreakdown.push({
        id: row.id,
        name: item?.name || row.id,
        quantity: row.quantity,
        boxes: row.quantity
      });
    } else {
      looseItems += row.quantity;
    }
  }

  // 4-5 items per box for loose individual curations (standard box capacity: 5 items)
  const looseBoxes = looseItems > 0 ? Math.ceil(looseItems / 5) : 0;
  const totalBoxes = hamperBoxes + looseBoxes;

  const parts = [];
  if (hamperBoxes > 0) parts.push(`${hamperBoxes} Hamper ${hamperBoxes === 1 ? 'Box' : 'Boxes'}`);
  if (looseBoxes > 0) parts.push(`${looseBoxes} Curated ${looseBoxes === 1 ? 'Box' : 'Boxes'} (${looseItems} items)`);

  return {
    totalBoxes,
    hamperBoxes,
    looseBoxes,
    looseItems,
    breakdown: {
      hampers: hamperBreakdown,
      loose: { count: looseItems, boxesNeeded: looseBoxes }
    },
    summary: parts.length ? parts.join(' + ') : `${totalBoxes} Boxes`
  };
}

module.exports = { calculatePackaging };
