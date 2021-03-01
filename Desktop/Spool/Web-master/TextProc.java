import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
public class TextProc {
    //added to test
    public static final int MAX_COLORS = 6;
    public static HashMap<String, String> Sub_cat2Cat = new HashMap<String, String>();
    public static HashMap<String, ArrayList<String>> Cat2Sub_Cat = new HashMap<String, ArrayList<String>>();
    public static HashMap<String, Integer> dicUsrNo = new HashMap<String, Integer>();
    public static HashMap<String, Integer> dicUsrTask = new HashMap<String, Integer>();
    public static BufferedWriter bwTransWriter = null;
    public static ArrayList<String> catTopics = new ArrayList<>();
    public static ArrayList<String> catSubTopics = new ArrayList<>(); //####################
    public static ArrayList<String> usrList = new ArrayList<>();
    public static String strMainCat, strMainSubCat, prevuser, usrForTask, usrTaskPrev;
    public static String strPart1 = ""; static String strPart2 = "";
    static String strPart2_5 = ""; static String strPart3 = "";
    static String strPart2_6 = "";
    public static boolean isCatFound = false;
    public static boolean captureStartTasks = false;
    public static boolean captureTraining = false;
    public static boolean isTaskEverAssgned = false;
    public static boolean isTrainingEverAssgned = false;
    public static boolean captureStart = false;
    public static int usrNoColor = 2; //skip black n blue, those r reserved
    public static int taskCOlor = 2;
    public static int lineCount = 0;
    public static  int TOTAL_LINE_LIMIT = 10;
    private static final int Font_S_header1 = 52;
    private static final int Font_S_header2 = 32;
    private static final int Font_S_header3 = 28;
    private static final int Font_S_header4 = 24;
    private static final int Font_M_header1 = 60;
    private static final int Font_M_header2 = 40;
    private static final int Font_M_header3 = 35;
    private static final int Font_M_header4 = 30;
    private static String[] strArrParts;

    public static void main(String[] args) {
        //fake initialization
        /*String[] args = new String[5];
        args[0] = "t2.vtt";
        args[1] = "t211_out";
        args[2] = "Spool-Zoom Collaboration";
        args[3] = "14/12/2020";
        //args[4] = "Vaios G,Alberto C";*/
        fillSalesKW();
        BufferedWriter bwTransWriter2 = null;
        try {
            String str2 = "";
            //arg 0 - infile, arg 1 - outfile, arg 2 - agenda, arg 3 - date, arg 4 - participants , seperated

            /////**************************************** file 1
            bwTransWriter2 = new BufferedWriter(new FileWriter( args[1]));
            args[3] = args[3].replace("T", ", ");
            args[3] = args[3].replace('Z', ' ');
            strPart2_5 += "\\page ";
            str2 = "\\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header2+"\\cf2" +
                    "\\tab\\tab\\tab \\b " + "         ACTION ITEMS FOR SDRs"  + " \\b0 \\line\\cf1";
            strPart2_5 += str2;
            //strPart2_6 += "\\page ";
            str2 = "\\line \\line \\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header2+"\\cf2" +
                    "\\tab\\tab\\tab \\b " + "         TRAINING FOR SDRs"  + " \\b0 \\line\\cf1";
            strPart2_6 += str2;
            //need to find a way to go to the begining of a file and then issert below part
            voiceStringParse(args[0], args[1]);
            WriteInitialToFile(args[2], args[3]);
            WriteTopicsNPartcpnts();
            bwTransWriter2.write(strPart1);
            bwTransWriter2.write(strPart2);
            if(isTaskEverAssgned)
                bwTransWriter2.write(strPart2_5);
            else
                strPart2_6 = "\\page " + strPart2_6;
            if(isTrainingEverAssgned)
                bwTransWriter2.write(strPart2_6);
            else if(!isTaskEverAssgned)
                strPart3 = "\\page " + strPart3;
            strPart3 += "\\line \\line \\line \\tab \\tab \\tab \\b ---- END OF DOCUMENT ---- \\b0  \\line \\line\n";
            bwTransWriter2.write(strPart3);
            bwTransWriter2.write("}");
            System.out.println("DONE!!!!!!");
        }
        catch (IOException ioe)
        {
            ioe.printStackTrace();
        }
        finally
        {
            try {
                if (bwTransWriter != null)
                    bwTransWriter.close();
                if (bwTransWriter2 != null)
                    bwTransWriter2.close();
            }
            catch (IOException ioe)
            {
                System.out.println("Error in closing the BufferedReader or Writer");
            }
        }
    }//main
    public static void writeTasks(String inStr) {
        try {
            isTaskEverAssgned = true; //means there is a task in d transcripts
            String[] strArrWhole = inStr.split("[:]", 0);
            //String newUser = strArrWhole[0];
            if(strArrWhole.length <= 1) return;
            //String newUser = strArrWhole[0];
            String strToPut = "";
            //***change 28/12 bug fix to be inserted to main code-base
            for(int i = 1; i < strArrWhole.length; i++)
                strToPut += strArrWhole[i];
            int clr = 0;
            if(!usrForTask.toLowerCase().strip().equals(usrTaskPrev)) {
                usrTaskPrev = usrForTask.toLowerCase().strip();
                //if(!usrList.contains(usrTaskPrev))
                //    usrList.add(usrTaskPrev);
                if(!dicUsrTask.keySet().contains(usrTaskPrev)) {
                    taskCOlor++;
                    if(taskCOlor > MAX_COLORS)
                        taskCOlor = 3;
                    dicUsrTask.put(usrTaskPrev, taskCOlor);
                }
                strPart2_5 += "\\line\\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header3+ "\\cf" + dicUsrTask.get(usrTaskPrev) + " " +
                        "\\b " + "Tasks for " + usrForTask  + " \\b0 \\line";
            }
            strPart2_5 += "\\cf1 \\line\\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header4 +
                    "\\tab" + " - " + strToPut.strip()  + "\\line";
            //bwTransWriter.write("\\line\\tx720\\tx1440\\tx2880\\tx5760\\fs35" +
            //        "\\tab" + " - " + strToPut  + "\\line");
        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }
    }//writeDialogues

    public static void writeDialogues(String inStr) {
        try {
            String[] strArrWhole = inStr.split("[:]", 0);
            if(strArrWhole.length <= 1) return;
            if(strArrWhole[1].strip().length() == 0) return;
            String newUser = strArrWhole[0];
            String strToPut = "";
            //***change 28/12 bug fix to be inserted to main code-base
            for(int i = 1; i < strArrWhole.length; i++)
                strToPut += strArrWhole[i];
            int clr = 0;
            if (isCatFound) {
                //isCatFound = false;
                //strPart3 += "\\page ";
                strPart3 += "\\line \\line";
                strPart3 += "\\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header2+"\\cf2" +
                        "\\tab\\tab\\tab \\b " + ("     "+strMainCat + " - " + strMainSubCat).toUpperCase()  +
                        " \\b0 \\line\\cf1";
                //bwTransWriter.write("\\tx720\\tx1440\\tx2880\\tx5760\\fs40" +
                //        "\\tab\\tab\\tab \\b " + (strMainCat + " - " + strMainSubCat).toUpperCase()  + " \\b0 \\line");
            }
            if(!newUser.toLowerCase().strip().equals(prevuser) || isCatFound) {
                prevuser = newUser.toLowerCase().strip();
                if(!usrList.contains(prevuser))
                    usrList.add(prevuser);
                if(!dicUsrNo.keySet().contains(prevuser)) {
                    usrNoColor++;
                    if(usrNoColor > MAX_COLORS)
                        usrNoColor = 3;
                    dicUsrNo.put(prevuser, usrNoColor);
                }
                //if(prevuser.contains("deval"))
                //    clr = dicUsrNo.get(prevuser);
                strPart3 += "\\line\\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header3+ "\\cf" + dicUsrNo.get(prevuser) + " " +
                        "\\b " + newUser  + " \\b0 \\line";
                //strPart3 += "\\cf1 \\tx720\\tx1440\\tx2880\\tx5760\\fs35 \\cf"  +
                //        "-------------------------------------------------------------------- \\line";
                //bwTransWriter.write("\\line\\tx720\\tx1440\\tx2880\\tx5760\\fs35" +
                //        "\\b " + newUser  + " \\b0 \\line");
            }
            strPart3 += "\\cf1 \\line\\tx720\\tx1440\\tx2880\\tx5760\\fs"+ Font_S_header4 +
                    "\\tab" + " - " + strToPut.strip()  + "\\line";
            //bwTransWriter.write("\\line\\tx720\\tx1440\\tx2880\\tx5760\\fs35" +
            //        "\\tab" + " - " + strToPut  + "\\line");
            isCatFound = false;
        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }
    }//writeDialogues

    public static void WriteTopicsNPartcpnts() {
        try {
            String strLower;
            //String cat;
            ArrayList<String> kWCats;
            String[] ArrPartcpnts;
            strPart2 +="\\tab \\b \\ul Meeting Discussion Topics\\ulnone : \\b0  \\line \\line\n";
            //bwTransWriter.write("\\tab \\b Knowledge Topics: \\b0 \\line \\line\n");
            //ArrPartcpnts = strPartcpnts.split("[,]", 0);
            ////training realted added *************************
            if(isTaskEverAssgned) {
                strPart2 += "\\fs"+ Font_S_header3+"\\tab\\tab\\b - " +  "Action Items for SDRs" + "\\b0 \\line";
            }
            if(isTrainingEverAssgned) {
                strPart2 += "\\fs"+ Font_S_header3+"\\tab\\tab\\b - " +  "Training for SDRs" + "\\b0 \\line";
            }
            ////training realted added *************************
            for (String cat: catTopics
            ) {
                strPart2 += "\\fs"+ Font_S_header3+"\\tab\\tab\\b - " +  cat + "\\b0 \\line";
                //bwTransWriter.write("\\fs35\\tab\\tab\\b - " +  cat + "\\b0 \\line\\fs30");
                kWCats = Cat2Sub_Cat.get(cat);
                for (String subcat: kWCats //initally was kWCats####################
                ) {
                    strPart2 += "\\tab\\tab\\tab - "+ subcat +"\\line";
                    //bwTransWriter.write("\\tab\\tab\\tab - "+ subcat +"\\line");
                }
            }
            strPart2 += "\\fs"+ Font_S_header2+ "\\line \\tab \\b \\ul Knowledge Participants\\ulnone : \\b0 \\line \\line\n";
            //bwTransWriter.write("\\fs40\\tab \\b Knowledge Participants: \\b0 \\line \\line\n");
            for (String prtcpnt: usrList
            ) {
                strPart2 += "\\fs"+ Font_S_header3+"\\tab\\tab - " +  prtcpnt + "\\line";
                //bwTransWriter.write("\\fs35\\tab\\tab - " +  prtcpnt + "\\line");
            }
            //strPart2 += "\\page ";
            //bwTransWriter.write("\\page");
        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }
    }//WriteInitialToFile

    public static void WriteInitialToFile(String agenda, String date) {
        String str = "        SPOOL DOCUMENT";
        try {
            strPart1 += "{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Tahoma;}}\n" +
                    //"{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;"+
                    //"\\red0\\green255\\blue0;\\red255\\green0\\blue255;\\red255\\green175\\blue0;\\red255\\green0\\blue0;}\n" +
                    "{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue0;"+
                    "\\red0\\green0\\blue0;\\red0\\green0\\blue0;\\red0\\green0\\blue0;\\red0\\green0\\blue0;}\n" +
                    "\\landscape\n" +
                    "\\paperw15840\\paperh12240\\margl720\\margr720\\margt720\\margb720\n" +
                    "\\tx720\\tx1440\\tx2880\\tx5760\\fs" + Font_S_header1 +
                    "\\line\\line\\tab\\tab\\tab \\cf2 \\b"+ str +"\\b0 \\line" +
                    "{\\rtlch\\fcs1 \\af0\\afs24 \\ltrch\\fcs0 \\f0\\fs24\\ul\\cf6\\insrsid3308091\\charrsid16730989 \n" +
                    "\\par }" +
                    "\\fs"+ Font_S_header2+"\\line\\cf1 \n" +
                    "\\tab \\b Meeting Agenda: \\b0 " + agenda +
                    "\\line" +
                    "\\tab \\b Meeting Date: \\b0 " + date +
                    "\\line" + "\\line";
        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }
    }//WriteInitialToFile

    public static String getStringBefore(String toFind, String Parentstr) {
        String[] strArrWhole;
        String[] strArrParts;
        String strToSend = "";
        int index = 0;
        strArrWhole = Parentstr.split("[:]", 0);
        for(int i = 1; i < strArrWhole.length; i++) {
            if(!strArrWhole[i].toLowerCase().strip().contains("stop capture"))
                strToSend += strArrWhole[i];
            else {
                strArrParts = strArrWhole[i].split("[ ]", 0);
                for(int j = 0; j < strArrParts.length; j++) {
                    if (!(strArrParts[j+0].toLowerCase().strip().equals("stop")
                            && (strArrParts[j+1].toLowerCase().strip().equals("capture.")
                            ||strArrParts[j+1].toLowerCase().strip().equals("capture") ))) {
                        strToSend += strArrParts[j] + " ";
                    }
                    else break;
                }
            }
        }
        return strToSend;
    }

    public static void wrtieLines(String strNextLine) {

        if(captureStart) {
            //fillCategory(strNextLine);
            writeDialogues(strNextLine);
            lineCount++;
            if(lineCount >= TOTAL_LINE_LIMIT) {
                lineCount = 0;
                captureStart = false;
            }
        }
        if(captureStartTasks) {
            //fillCategory(strNextLine);
            writeTasks(strNextLine);
            lineCount++;
            if(lineCount >= TOTAL_LINE_LIMIT) {
                lineCount = 0;
                captureStartTasks = false;
            }
        }
        if(captureTraining) {
            //fillCategory(strNextLine);
            //isTrainingEverAssgned = true;
            //writecaptureTraining(strNextLine);
            //lineCount++;
            //if(lineCount >= TOTAL_LINE_LIMIT) {
            //    lineCount = 0;
            //   captureTraining = false;
            // }
        }

    }//wrtieLines

    public static int findStartCapPos() {
        int pos = 0;
        for (String str: strArrParts) {
            if (str.toLowerCase().strip().equals("start") &&
                    (strArrParts[pos + 1].toLowerCase().strip().contains("captur") )) {
                return pos;
            }
            pos++;
        }
        return pos;

    }

    public static boolean chkStartType(String usr, int index) {

        String strToSend;

        boolean flag = false;

        //find sub-cat inserted by user here
        for (String str: strArrParts) {
            //if(strArrParts.length >= index + 3)
            {
                //if (str.toLowerCase().strip().equals("start") &&
                //        (strArrParts[index + 1].toLowerCase().strip().contains("captur") ))
                {

                    if((strArrParts.length > index + 3))
                        if (
                                (strArrParts[index + 2].toLowerCase().strip().equals("action") &&
                                        (strArrParts[index + 3].toLowerCase().strip().contains("item") )) ||
                                        (strArrParts[index + 2].toLowerCase().strip().contains("task"))
                        ) {

                            if((strArrParts.length > index + 5))
                                if (
                                        strArrParts[index + 4].toLowerCase().strip().equals("for") ||
                                                strArrParts[index + 4].toLowerCase().strip().equals("four") ||
                                                strArrParts[index + 4].toLowerCase().strip().equals("to")) {
                                    flag = true;
                                    usrForTask = strArrParts[index + 5];
                                    captureStartTasks = true;
                                    strToSend = "";
                                    for (int k = index + 6; k < strArrParts.length; k++)
                                        strToSend += strArrParts[k] + " ";
                                    writeTasks(":" + strToSend);
                                } else if ((strArrParts.length > index + 4)){
                                    flag = true;
                                    usrForTask = strArrParts[index + 4];
                                    captureStartTasks = true;
                                    strToSend = "";
                                    for (int k = index + 5; k < strArrParts.length; k++)
                                        strToSend += strArrParts[k] + " ";
                                    writeTasks(":" + strToSend);
                                }
                            break;
                        }

                    ////training realted added *************************
                    if((strArrParts.length > index + 2) )
                        if (
                                (strArrParts[index + 2].toLowerCase().strip().contains("train")
                                )) {
                            flag = true;
                            captureTraining = true;
                            //strToSend = "";
                            //for(int k = index + 3; k<strArrParts.length; k++)
                            //   strToSend += strArrParts[k] + " ";
                            //writecaptureTraining(strArrWhole[0]+":"+strToSend);

                            break;

                        }
                    ////training realted added *************************

                    if ((strArrParts.length > index + 3) ) {
                        flag = true;
                        strMainSubCat = strArrParts[index + 2].toLowerCase().strip() + " " +
                                strArrParts[index + 3].toLowerCase().strip();
                        if (strMainSubCat.charAt(strMainSubCat.length() - 1) == '.') {
                            strMainSubCat = strMainSubCat.substring(0, strMainSubCat.length() - 1);
                        }
                        if (!Sub_cat2Cat.keySet().contains(strMainSubCat))
                            strMainSubCat = "feedback & updates";

                        strMainCat = Sub_cat2Cat.get(strMainSubCat);
                        //if (!catSubTopics.contains(strMainSubCat))///####################
                        //    catSubTopics.add(strMainSubCat);
                        ArrayList<String> kWCats = new ArrayList<>();
                        if(!Cat2Sub_Cat.keySet().contains(strMainCat)) {
                            kWCats.add(strMainSubCat);
                            Cat2Sub_Cat.put(strMainCat, kWCats);
                        }
                        else {
                            kWCats = Cat2Sub_Cat.get(strMainCat);
                            if(!kWCats.contains(strMainSubCat)) kWCats.add(strMainSubCat);
                            Cat2Sub_Cat.replace(strMainCat, kWCats);
                        }

                        if (!catTopics.contains(strMainCat))
                            catTopics.add(strMainCat);

                        strToSend = "";
                        captureStart = true;
                        isCatFound = true;
                        for (int k = index + 4; k < strArrParts.length; k++)
                            strToSend += strArrParts[k] + " ";
                        writeDialogues(usr + ":" + strToSend);

                        break;

                    } //else it is a knowledge category
                } //IF start and capture
            }//if lenght > 3

            index++;
        } //for
        return flag;
    }

    public static void checkStop(String strNextLine, String Usr) {

        String strToSend;
        if (captureStart) {
            captureStartTasks = false;
            captureTraining = false;
            //for(int i = 1; i < strArrWhole.length; i++)
            //if (strNextLine.toLowerCase().contains("stop capture") ||
            //        strNextLine.toLowerCase().contains("stop capture."))
            {
                strToSend = "";
                lineCount = 0;
                strToSend = getStringBefore("stop capture", strNextLine);
                writeDialogues(Usr+":"+strToSend);
                captureStart = false;

            }

        }
        else if(captureStartTasks) {
            captureStart = false;
            captureTraining = false;
            //for(int i = 1; i < strArrWhole.length; i++)
            //if (strNextLine.toLowerCase().contains("stop capture")
            //        || strNextLine.toLowerCase().contains("stop capture."))
            {
                strToSend = "";
                lineCount = 0;
                strToSend = getStringBefore("stop capture", strNextLine);
                writeTasks(":"+strToSend);
                captureStartTasks = false;
            }

        }
        ////training realted added *************************
        else if(captureTraining) {
            captureStart = false;
            captureStartTasks = false;
            //for(int i = 1; i < strArrWhole.length; i++)
            //if (strNextLine.toLowerCase().contains("stop capture")
            //      || strNextLine.toLowerCase().contains("stop capture."))
            {
                strToSend = "";
                lineCount = 0;
                strToSend = getStringBefore("stop capture", strNextLine);
                //writecaptureTraining(strArrWhole[0]+":"+strToSend);
                captureTraining = false;
            }

        }
    }//chkstop

    public static void voiceStringParse(String inFile, String outFile) {
        BufferedReader brTransKW = null;
        String strNextLine;
        String[] strArrWhole;
        boolean isANumber = false;
        int tmp;
        boolean flag = false;
        boolean flag2 = false;
        try {
            /////**************************************** file 2
            brTransKW = new BufferedReader(new FileReader(inFile));
            strNextLine = brTransKW.readLine();
            while (strNextLine != null) {
                if(!strNextLine.isEmpty()) {
                    strArrWhole = strNextLine.split("[:]", 0);
                    if(strArrWhole.length <= 1) {strNextLine = brTransKW.readLine();continue;}
                    try {
                        tmp = Integer.parseInt(strArrWhole[0]);
                        isANumber = true;
                    }
                    catch (Exception e) {
                        isANumber = false;
                    }
                    if(!isANumber && strArrWhole.length > 1)
                    {
                        //flag = false;
                        for(int i = 1; i < strArrWhole.length; i++) {

                            strArrParts = strArrWhole[i].split("[ ]", 0);
                            if (strArrWhole[i].toLowerCase().contains("start captur")) {
                                tmp = findStartCapPos();
                                flag2 = true;
                                captureStart = false;
                                captureStartTasks = false;
                                captureTraining = false;
                                lineCount = 0;
                                flag = chkStartType(strArrWhole[0], tmp);
                                continue;

                            }//if
                            else if (strNextLine.toLowerCase().contains("stop captur")) {
                                flag2 = false;
                                checkStop(strNextLine, strArrWhole[0]);
                            }
                            else if (flag2 && !flag) {
                                flag2 = false;
                                flag = chkStartType(strArrWhole[0], -1); //-1 menas start capture is already above
                                //so start form -2 pos n check
                            }
                            else
                                wrtieLines(strNextLine);
                        }//for
                    }
                }
                strNextLine = brTransKW.readLine();
            } //file read while
        }
        catch (IOException ioe)
        {
            ioe.printStackTrace();
        }
        finally
        {
            try {
                if (brTransKW != null)
                    brTransKW.close();
                if (bwTransWriter != null)
                    bwTransWriter.close();
            }
            catch (IOException ioe)
            {
                System.out.println("Error in closing the BufferedReader");
            }
        }

    }//voiceStringParse

    public static void fillSalesKW() {

        BufferedReader brsalesKW = null;
        ArrayList<String> kWCats;
        String strNextLine, strKeywods, strCategory;
        String[] strArrWhole;
        String[] strArrKWsr;
        int intPlayerCnt = 0;
        try{
            /////**************************************** file 3
            brsalesKW = new BufferedReader(new FileReader("public/categories.txt"));
            strNextLine = brsalesKW.readLine();
            while (strNextLine != null) {
                //System.out.println(strPLayerInfo);
                intPlayerCnt++;
                kWCats = new ArrayList<>();
                strArrWhole = strNextLine.split("[:]", 0);
                strCategory = strArrWhole[0];
                strKeywods = strArrWhole[1];
                strArrKWsr = strKeywods.split("[,]", 0);
                String strLower;
                for (String str: strArrKWsr
                ) {
                    strLower = str.toLowerCase().strip();
                    Sub_cat2Cat.put(strLower, strCategory); //here we need lower as we will compare it with the string form file
                    kWCats.add(str);
                }
                //Cat2Sub_Cat.put(strCategory, kWCats);
                strNextLine = brsalesKW.readLine();
            }
        }
        catch (IOException ioe)
        {
            ioe.printStackTrace();
        }
        finally
        {
            try {
                if (brsalesKW != null)
                    brsalesKW.close();
            }
            catch (IOException ioe)
            {
                System.out.println("Error in closing the BufferedReader");
            }
        }
    }//fillSalesKW
}//class Main
