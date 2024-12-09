import { useState } from "react";
import useProject from "../hooks/use-project";
import { useParams } from "react-router-dom";
function ProgressBar() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);
  //   console.log({project.goal);
  //   const totalAmount = project.goal;
  let pledgeAmountData = project.pledges.map((pledgeData, key) => {
    return pledgeData.amount;
  });

  let currentAmount = 0;

  for (let i = 0; i < pledgeAmountData.length; i++) {
    currentAmount += pledgeAmountData[i];
  }

  //   const progress = currentAmount / totalAmount;
  //   console.log(progress);

  return <h1>Hi</h1>;
}

export default ProgressBar;
