import { ICellRendererParams } from "ag-grid-community";
function StatusRenderer(params: ICellRendererParams) {
  let style;

  if (params.value === "Active") {
    style = "badge badge-soft badge-accent";
  } else if (params.value === "Deactivated") {
    style = "badge badge-soft badge-error";
  } else if (params.value === "Inactive") {
    style = "badge badge-soft badge-warning";
  } else if (params.value === "Banned") {
    style = "badge badge-soft badge-error";
  }

  return <div className={style}>{params.value}</div>;
}

export default StatusRenderer;
