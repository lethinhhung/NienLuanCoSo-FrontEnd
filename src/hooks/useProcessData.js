import { useState, useEffect } from 'react';

function useProcessData(statisticsInfo, testsInfo, projectsInfo) {
    const [completedGradeWeight, setCompletedGradeWeight] = useState(0);
    const [completedScore, setCompletedScore] = useState(0);
    const [completedProjects, setCompletedProjects] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const [data, setData] = useState(0);

    if (testsInfo !== null) {
        testsInfo.forEach((test) => {
            if (test.score !== -1) {
                setCompletedGradeWeight(completedGradeWeight + test.gradeWeight);
                setCompletedScore(completedScore + (test.score / test.maxScore) * test.gradeWeight);
            }
        });
    }
    if (projectsInfo !== null) {
        projectsInfo.forEach((project) => {
            setTotalProjects(totalProjects + 1);
            if (project.completedSteps === project.totalSteps) {
                setCompletedProjects(completedProjects + 1);
            }
        });
    }

    return data;
}

export default useProcessData;
