const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export function exportCsv(filename, headers, rows) {
    const content = [headers.map(escapeCell), ...rows.map((row) => row.map(escapeCell))]
        .map((row) => row.join(","))
        .join("\r\n");
    const blob = new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
