import React from "react";

const ApplicationDetailsModal = ({
  isOpen,
  application,
  scholarship,
  onClose,
}) => {
  if (!isOpen || !application) return null;

  const displayData = [
    { label: "Applicant Name", value: application.userName },
    { label: "Email", value: application.userEmail },
    { label: "University", value: application.universityName },
    { label: "Scholarship Category", value: application.scholarshipCategory },
    { label: "Degree Level", value: application.degree },
    { label: "Application Status", value: application.applicationStatus },
    { label: "Payment Status", value: application.paymentStatus },
    {
      label: "Application Date",
      value: new Date(application.applicationDate).toLocaleDateString(),
    },
    {
      label: "Application Fees",
      value: `$${application.applicationFees}`,
    },
    {
      label: "Service Charge",
      value: `$${application.serviceCharge}`,
    },
    {
      label: "Total Amount",
      value: `$${application.applicationFees + application.serviceCharge}`,
    },
  ];

  if (scholarship) {
    displayData.push(
      { label: "Scholarship Name", value: scholarship.scholarshipName },
      { label: "University Name", value: scholarship.universityName },
      { label: "Country", value: scholarship.universityCountry },
      { label: "Degree Requirements", value: scholarship.degree },
    );
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: "badge-warning",
      processing: "badge-info",
      completed: "badge-success",
      approved: "badge-success",
      rejected: "badge-error",
    };
    return badges[status?.toLowerCase()] || "badge-ghost";
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">Application Details</h3>

        <div className="space-y-4">
          {displayData.map((item, index) => (
            <div key={index} className="flex gap-4 border-b pb-3">
              <span className="font-semibold text-gray-700 min-w-[150px]">
                {item.label}:
              </span>
              <span className="text-gray-600 flex-1">
                {["Application Status", "Payment Status"].includes(
                  item.label,
                ) ? (
                  <span className={`badge ${getStatusBadge(item.value)}`}>
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}

          {application.feedback && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-semibold mb-2">Moderator Feedback:</h4>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm">{application.feedback}</p>
                {application.feedbackDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    On:{" "}
                    {new Date(application.feedbackDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal-action mt-6">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ApplicationDetailsModal;
