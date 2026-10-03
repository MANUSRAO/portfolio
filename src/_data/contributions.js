import { AssetCache } from "@11ty/eleventy-fetch";
import site from "./site.js";

const ENDPOINT = (user) =>
  `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CELL = 11;
const GAP = 4;
const STEP = CELL + GAP;
const LABEL_BAND = 20;

const MOBILE_WEEKS = 26;

const EMPTY = {
  hasData: false,
  total: 0,
  weeks: [],
  months: [],
  width: 0,
  height: 0,
  recentWeeks: [],
  recentMonths: [],
  recentWidth: 0,
  recentTotal: 0,
};

function utcDay(dateString) {
  return new Date(`${dateString}T00:00:00Z`).getUTCDay();
}

function utcMonth(dateString) {
  return new Date(`${dateString}T00:00:00Z`).getUTCMonth();
}

const MIN_LABEL_GAP = 3;

function buildMonths(weeks) {
  const months = [];
  let previousMonth = null;
  let lastIndex = -Infinity;

  weeks.forEach((week, index) => {
    const firstReal = week.find(Boolean);
    if (!firstReal) return;

    const month = utcMonth(firstReal.date);
    if (month === previousMonth) return;

    if (index - lastIndex >= MIN_LABEL_GAP) {
      months.push({ label: MONTHS[month], index });
      lastIndex = index;
    }

    previousMonth = month;
  });

  return months;
}

function buildWeeks(contributions) {
  const cells = contributions.map((entry) => ({
    date: entry.date,
    count: entry.count,
    level: entry.level,
  }));

  const padded = [
    ...Array.from({ length: utcDay(cells[0].date) }, () => null),
    ...cells,
  ];

  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    const week = padded.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function totalOf(weeks) {
  return weeks
    .flat()
    .filter(Boolean)
    .reduce((sum, day) => sum + day.count, 0);
}

export default async function () {
  const user = site.githubUser;

  try {
    const asset = new AssetCache(`github-contributions-${user}`);
    const data = asset.isCacheValid("1d")
      ? await asset.getCachedValue()
      : await (async () => {
          const response = await fetch(ENDPOINT(user));
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const json = await response.json();
          await asset.save(json, "json");
          return json;
        })();

    const contributions = data?.contributions ?? [];
    if (contributions.length === 0) return EMPTY;

    const weeks = buildWeeks(contributions);
    const recentWeeks = weeks.slice(-MOBILE_WEEKS);

    return {
      hasData: true,
      total: data?.total?.lastYear ?? totalOf(weeks),
      weeks,
      months: buildMonths(weeks),
      width: weeks.length * STEP,
      height: LABEL_BAND + 7 * STEP - GAP,

      recentWeeks,
      recentMonths: buildMonths(recentWeeks),
      recentWidth: recentWeeks.length * STEP,
      recentTotal: totalOf(recentWeeks),
    };
  } catch (error) {
    console.warn(`[contributions] falling back to empty grid: ${error.message}`);
    return EMPTY;
  }
}
