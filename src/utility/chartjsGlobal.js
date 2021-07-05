import { defaults } from "react-chartjs-2";
import { handleGAToggleLegend } from "./googleAnalytics";
defaults.global.defaultFontFamily = "Nunito Sans";

export const handleLegendOnClick = (legenditem, thischart, charttitle, partnertype) => {
  handleGAToggleLegend(charttitle, partnertype);
  let index = legenditem.datasetIndex;
  let ci = thischart.chart;
  let meta = ci.getDatasetMeta(index);
  meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
  return (
    ci.update()
  );
};