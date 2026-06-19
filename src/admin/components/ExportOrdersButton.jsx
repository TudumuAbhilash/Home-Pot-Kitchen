import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportOrdersButton({ orders = [] }) {
  const exportToExcel = () => {
    const rows = orders.map((order) => {
      const data = order.attributes || order;

      return {
        Customer: data.customerName,
        Phone: data.phone,
        Address: data.address,
        Amount: data.totalAmount,
        Status: data.orderStatus,
        Date: new Date(
          data.createdAt
        ).toLocaleString(),
      };
    });

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Orders"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      file,
      `orders-report-${Date.now()}.xlsx`
    );
  };

  return (
    <button
      className="export-btn"
      onClick={exportToExcel}
    >
      📥 Export Orders
    </button>
  );
}

export default ExportOrdersButton;