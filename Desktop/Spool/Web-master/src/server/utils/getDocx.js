const docx = require("docx");
const fs = require('fs');
const fsp = require('fs').promises;
const readline = require('readline');
var path = require('path');

const { AlignmentType,
        Document,
        HeadingLevel,
        PageNumberFormat,
        Header,
        Footer,
        Packer,
        Paragraph,
        PageBreak,
        PageNumber,
        Media,
        TextRun,
    } = docx;

const dummyData = {
    title: null,
    agenda: null,
    date: null,
    topics: [],
    participants: []

}
let data = null;
let imagePath = path.join(__dirname,`../../../public/assets/images/spool-logo.png`);

const createTitle = text => {
    return new Paragraph({
        children: [
            new TextRun({
                text: " ",
                font: "Calibri (Body)",
            }),
            new TextRun({
                text,
                font: "Calibri (Body)",
                size: 52,
                bold: true,
                color: "#767171",
            })
        ],
        spacing: {
            line: 276
        }
    });
}

const createPageBreak = () => {
    return new Paragraph({
        children: [
            new PageBreak()
        ],
    });
}

const createLine = () => {
    return new Paragraph({
        children: [
            new TextRun({
                text: " ",
                font: "Calibri (Body)",
                size: 28,
            })
        ],
        spacing: {
            line: 276
        },
    });
}

const createAgenda = agenda => {
    return new Paragraph({
        // text: agenda,
        children: [
            new TextRun({
                text: agenda,
                font: "Calibri (Body)",
                size: 28,
            })
        ],
        bullet: {
            level: 0,
        },
        spacing: {
            line: 276
        },
    })
}

const createBullet = (level,text) => {
    return new Paragraph({
        children: [
            new TextRun({
                text,
                font: "Calibri (Body)",
                size: 28,
                // color: "#695D46"
            })
        ],
        bullet: {
            level
        },
        spacing: {
            line: 276
        },
    });
}

const createBullets = (arr) => {
    const result = [];
    arr.forEach((bulletPoint) => {
        result.push(createBullet(0,bulletPoint))
        // result.push(createLine())
    })
    return result;
}

const createTopicName = (text) => {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({
                text,
                font: "Calibri (Body)",
                size: 32,
                bold: true
                // color: "#2E74B5",
            })
        ],
        spacing: {
            line: 276
        }
    })
}

// const convertCmToTwip = (inches) => {
//     // return Math.floor(inches * 72 * 20);
//     return Math.floor(566.9291338583)
// };

const createTaskHelper = participantName => {
    return new Paragraph({
        children: [
            new TextRun({
                text: participantName,
                font: "Calibri (Body)",
                size: 28,
                bold: true
            })
        ],
        indent: {
            // start: 0.25 * convertCmToTwip(0.25)
            start: 0.25 * 566.9291338583
        },
        spacing: {
            line: 276
        },
    })
}

const createBulletForTasks = (level,text) => {
    return new Paragraph({
        children: [
            new TextRun({
                text,
                font: "Calibri (Body)",
                size: 28,
                // color: "#695D46"
            })
        ],
        bullet: {
            level
        },
        spacing: {
            line: 276
        },
        indent: {
            start: 566.9291338583
        }
    });
}

const createTasks = (topics) => {
    const result = [];
   // console.log("topics",topics);
    topics.forEach((topic,index) => {
        result.push(createTopicName(topic.name))
        result.push(createLine())
        result.push(createLine())
        topic.tasksFor.forEach(temp => {
            let participantName = temp.participant
            result.push(createTaskHelper(participantName))
            // result.push(createLine())
            
            temp.tasks.forEach(task => {
                if(task.length > 2){
                    result.push(createBulletForTasks(1,task))
                }
            })
            result.push(createLine())
            // result.push(createLine())
            // result.push(createLine())
        })
        // if(!(index == topics.length - 1)){
        //     result.push(createPageBreak())
        // }
    });
    return result
}

const createMeetingTopics = (arr) => {
    const result = [];
    let prevTaskName = "";
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.name.includes("-")){
            let temp1 = element.name.split("-")[0].trim()
            let temp2 = element.name.split("-")[1].trim()
            if (temp1.toLowerCase() == prevTaskName) {
                result.push(createBullet(1,temp2))
            }
            else {
                result.push(createBullet(0,temp1))
                result.push(createBullet(1,temp2))
            }
            // result.push(createBullet(1,temp1))
            prevTaskName = temp1.toLowerCase();
        }
        else{
            result.push(createBullet(0,element.name))
        }
    }
    // arr.forEach(element => {
    //     result.push(createBullet(0,element.name))
    //     // result.push(createLine(22))
    // });
    return result;
}

const getDocument = async function(){
    const doc = new Document({
        
    });

    let image1 = {};
    try {
        // console.log("path",__dirname,filePath);
        // public\assets\images\spool-logo1.jpg
        image1 =await Media.addImage(doc, await fsp.readFile(imagePath),150,50);
    } catch (error) {
        console.error(error);
    }

    doc.addSection({
        
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.END,
                        children: [
                            image1,
                            createLine(),
                            createLine(),
                        ],
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.END,
                        children: [
                            new TextRun({
                                // children: [PageNumber.CURRENT],
                            }),
                        ],
                    }),
                ],
            }),
        },
        // properties: {
        //     pageNumberStart: 1,
        //     pageNumberFormatType: PageNumberFormat.DECIMAL,
        // },
        children: [
            createTitle(data.title),
            new Paragraph({
                children: [
                    new TextRun({
                        text: data.date,
                        font: "Calibri (Body)",
                        size: 32,
                        color: "#767171",
                    })
                ],
                
            }),
            createLine(),
            createLine(),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Meeting Agenda",
                        font: "Calibri (Body)",
                        size: 28,
                        bold: true
                    })
                ]
            }),
            // createLine(),
            createAgenda(data.agenda),
            // createLine(),createLine(),createLine(),createLine(),createLine(),
            createLine(),
            createLine(),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Attendees",
                        font: "Calibri (Body)",
                        size: 28,
                        bold: true
                    })
                ]
            }),
            // createLine(),
            ...createBullets(data.participants),
            createLine(),createLine(),
            // createLine(),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Meeting Discussion Topics",
                        font: "Calibri (Body)",
                        size: 28,
                        bold: true,
                        // color: "#2E74B5"
                    })
                ]
            }),
            // createLine(),
            
            ...createMeetingTopics(data.topics),
            createLine(),
            createPageBreak(),
            // createLine(),
            ...createTasks(data.topics),
        ],
    })
    
    return doc;
}

const readTxt = async (inFile) => {
    console.log("reading txt file");
    const file = readline.createInterface({
        input: fs.createReadStream(inFile), 
        output: process.stdout,
        terminal: false
    });

    data = {
        title: null,
        agenda: null,
        date: null,
        topics: [],
        participants: []
    };
    try {
        let subTop = null;
        for await (const line of file) {
            if(line.length < 1){
                continue;
            }
            if (!data.title && line.includes("Title")) {
                data.title = line.split(":")[1].trim();
                continue;
            }
            if(!data.agenda && line.includes("Agenda")){
                data.agenda = line.split(":")[1].trim();
                continue;
            }
            if(!data.date && line.includes("Date")){
                //data.date = line.split(":")[1].trim();
				////placeholder
				let index = line.indexOf(':');
                data.date = line.slice(index + 1).trim();
                continue;
            }

            if(data.topics.length < 1 && line.includes("Topics")){
                let elements = line.split(":")[1].split(",")
                elements.pop();
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index].trim();
                    let temp = {
                        name: element,
                        tasksFor: []
                    }
                    if (element.length < 2) {
                        continue;
                    }
                    data.topics.push(temp)
                }
                continue;
            }

            if(data.participants.length < 1 && line.includes("Participants")){
                let elements = line.split(":")[1].split(",")
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index].trim();
                    if (element.length > 2) {
                        data.participants.push(element)
                    }
                }
                continue;
            }

            
            if(line.includes("sub-topic")){
                subTop = line.split(":")[1].trim();
                continue;
            }

            if (line.includes("Tasks for")) {
                let taskFor = null;
                // Commented code used to take tasks for which matches the participant
                // for (let index = 0; index < data.participants.length; index++) {
                //     taskFor = data.participants[index];
                //     if (line.split(":")[0].includes(taskFor)) {
                //         break;
                //     }
                // }
                taskFor = line.split(":")[0].split("for")[1];
                let tasks = [];
                let tempTasks = line.split(":")[1].trim().split("$$$")
                
                tempTasks.pop();
                //console.log("temptasks",tempTasks);
                for (let index = 0; index < tempTasks.length; index++) {
                    tasks.push(tempTasks[index].trim()) 
                }
                //console.log("tasks",tasks);
                // data.topics.forEach((topic) => {
                //     if (topic.name.toLowerCase() == subTop.toLowerCase()) {
                //         topic.tasksFor.push({
                //             participant: taskFor,
                //             tasks: [...tasks]
                //         })
                //     }
                // })
                for (let index = 0; index < data.topics.length; index++) {
                    const element = data.topics[index];
                    if (data.topics[index].name.toLowerCase() == subTop.toLowerCase()) {
                        data.topics[index].tasksFor.push({
                            participant: taskFor,
                            tasks: [...tasks]
                        })
                    }
                    
                }

                //console.log("datra topics",data.topics);
                continue;
            }
            
        }    
        //console.log("Data is",data);
    } catch (error) {
        console.log("Erro reading",error);
    }
    return data;
}

const saveFile = async (outFile) => {
    
    try {
        const doc = await getDocument();
       // console.log("saving file");
        const b64string = await Packer.toBase64String(doc);
        await fsp.writeFile(outFile,Buffer.from(b64string, 'base64'));
        
        // res.setHeader('Content-Disposition', 'attachment; filename=MyDocument.docx');
        // res.send(Buffer.from(b64string, 'base64'));
        // Buffer.from()
        console.log("file saved");
        
    } catch (error) {
        console.error("Error saving file",error);
        // res.send("Some Error")
    }
    
}

const getDocxFile = async (inFile,outFile) => {
    data = dummyData;
    try {
        await readTxt(inFile);
        await saveFile(outFile);
    } catch (error) {
        console.error("Error ",error);
    }
}

module.exports.saveFile = saveFile;
module.exports.readTxt = readTxt;
module.exports.getDocxFile = getDocxFile;