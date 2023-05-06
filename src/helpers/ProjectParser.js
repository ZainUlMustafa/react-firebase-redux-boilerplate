import SmartUtils from "./SmartUtils"

const ProjectParser = (projectData, key = "") => {
    const su = new SmartUtils()
    
    const camPosMap = {
        0: 'inside',
        1: 'outside'
    }

    const camDirMap = {
        0: 'forward facing',
        1: 'rear facing'
    }

    const roadSideMap = {
        0: 'left',
        1: 'right'
    }

    const helpList = [
        "camPos",
        "camDir",
        "roadSide",
    ]

    if (key === "camPos") {
        return camPosMap[su._tryKey(() => projectData, key, "0")]
    } else if (key === "camDir") {
        return camDirMap[su._tryKey(() => projectData, key, "0")]
    } else if (key === "roadSide") {
        return roadSideMap[su._tryKey(() => projectData, key, "0")]
    } else {
        return JSON.stringify(helpList)
    }
}

export default ProjectParser;