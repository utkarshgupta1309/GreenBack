import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.TimeZone;

public class WidgetTextProc {

    public static double recordStartTime, startTimeErrorMargin;
    public static double currCommStartTime, currCommStopTime;
    public static double currSentenceStartOffset, currSentenceStopOffset;
    public static double offset_comm_start, offset_comm_stop;

    public static String inFile, strCommands, strRecordStartTime, strPart1, strPart2, usrTaskPrev;
    public static String strPart2_5, strPart3, strPart4, usrForTask, strMainSubCat, strMainCat, prevuser;

    public static boolean captureStarted, isKnowldg, isTask, isTraining, isCatFound;
    public static boolean isTaskEverAssgned, isTrainingEverAssgned, isTaskStringAdded;
    public static boolean isError = false;

    public static HashMap<String, String> Sub_cat2Cat = new HashMap<String, String>();
    public static ArrayList<String> usrList = new ArrayList<>();
    public static ArrayList<String> catTopics = new ArrayList<>();
    public static HashMap<String, ArrayList<String>> Cat2Sub_Cat = new HashMap<String, ArrayList<String>>();

    public static void main(String[] args) throws ParseException {
        String topic, time;
        BufferedWriter bwTransWriter = null;
        ////arg0 - infile, outfile = infile + .docx
        ////arg1 - inString
        ////arg2 - tpoic
        ////arg3 - date
        ////arg4 - Record_start_time
        try {
        ////Comment below FAKE INTIALIZATION in real code
        /*String[] args = new String[5];
        args[0] = "t2.vtt";
        args[1] = "Customer Feedback>1611509018>1611509030>Action Items - Deval>1611509750>1611510010>"; //strCommands
        //8-20 and then 740-1000
        args[2] = "Spool-Zoom Collaboration";
        args[3] = "2021-01-24T17:00:30Z";
        args[4] = "2021-01-24T17:23:30Z"; //  sec values is 1611509010.000*/
        ////--------------------------------
		System.out.println("11111111111");
        inFile = args[0];
        strCommands = args[1];
        topic = args[2];
        time = args[3];
        time = time.replace("T", " ");
        time = time.replace('Z', ' ');
        time = time.trim();
        strRecordStartTime = args[4];
        startTimeErrorMargin = 0.999; //in seconds
        strPart1 = ""; strPart2 = ""; strPart2_5 = ""; strPart3 = "";
        isTaskStringAdded = false;
        strPart4 += "\n\n---- END OF DOCUMENT ---- \n";
		System.out.println("2222222222222222");

        recordStartTime = getCommMilliOffset(strRecordStartTime, false);
		System.out.println("**************** recordStartTime "+ recordStartTime);
        fillSalesKW();
        WriteInitialToFile(topic, time);
        StringsParse(inFile);
        WriteTopicsNPartcpnts();

        /////**************************************** file 1
        ////write here
        bwTransWriter = new BufferedWriter(new FileWriter(inFile + ".txt"));
        bwTransWriter.write(strPart1+strPart2+strPart2_5 + strPart3+strPart4);

        System.out.println(strPart1+strPart2+strPart2_5 + strPart3+strPart4);
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
            }
            catch (IOException ioe)
            {
                System.out.println("Error in closing the BufferedReader or Writer");
            }
        }

    } //End Method Main

    public static void chkStartType(String Command) {
        String[] strArrCommand;
        if(Command.contains("Action")) {
            isTask = true;
            isKnowldg = false;
            isTraining = false;
            strArrCommand = Command.split("[-]", 0);
            usrForTask = strArrCommand[1];
            isTaskEverAssgned = true;
        }
        else if(Command.contains("Training")){
            //future
        }
        else {
            isTask = false;
            isKnowldg = true;
            isTraining = false;
            strMainSubCat = Command;
            strMainCat = Sub_cat2Cat.get(strMainSubCat.toLowerCase());
			if(strMainCat == null || strMainCat.length() == 0) strMainCat = "Standard Agenda and Updates";
            isCatFound = true;
            if (!catTopics.contains(strMainCat))
                catTopics.add(strMainCat);
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
        }
    }// End of chkStartType

    public static void createTextOutFile(String nextLine) {
        if(isTask) writeTask(nextLine);
        if(isKnowldg) writeKn(nextLine);

    } //end of createTextOutFile

    public static void writeError() {
        isError = true;
        strPart3 += "\n\nsub-topic :      ERROR OCCURRED - Authentication Issue";
        strPart3 += "\n\nTasks for :  A Zoom Authentication Error Occurred while downloading the transcript file.$$$";
        strPart3 += " Please download the transcript manually from your Zoom Dashboard and use " +
                "Spool Upload Functionality to create the " +
                "knowledge document.$$$";
        strPart3 += " We are sorry for the inconvenience.$$$";
    }//writeError

    public static void writeTask(String inStr) {
        try {

            String[] strArrWhole = inStr.split("[:]", 0);
            //String newUser = strArrWhole[0];
            if(strArrWhole.length <= 1) return;
            //String newUser = strArrWhole[0];
            String strToPut = "";
            //***change 28/12 bug fix to be inserted to main code-base
            for(int i = 1; i < strArrWhole.length; i++)
                strToPut += strArrWhole[i];
            int clr = 0;

            if(!isTaskStringAdded) {
                isTaskStringAdded = true;
                strPart2_5 += "\n sub-topic :  ACTION ITEMS FOR SDRs \n";
            }

            if(!usrForTask.toLowerCase().strip().equals(usrTaskPrev)) {
                usrTaskPrev = usrForTask.toLowerCase().strip();
                //if(!usrList.contains(usrTaskPrev))
                //    usrList.add(usrTaskPrev);


                strPart2_5 += "\n\n"  +
                        "" + "Tasks for " + usrForTask  + " : ";
            }

            strPart2_5 +=   strToPut.strip()  + "$$$ ";
        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }
    }//writeTask

    public static void writeKn(String inStr) {
        String[] strArrWhole = inStr.split("[:]", 0);
        if(strArrWhole.length <= 1) return;
        if(strArrWhole[1].strip().length() == 0) return;
        String newUser = strArrWhole[0];
        String strToPut = "";
        //***change 28/12 bug fix to be inserted to main code-base
        for(int i = 1; i < strArrWhole.length; i++)
            strToPut += strArrWhole[i];
        if (isCatFound) {
            //strPart3 += "\\page ";
            strPart3 += "\n\n";
            strPart3 += "" +
                    " sub-topic : " + ("     "+strMainCat + " - " + strMainSubCat).toUpperCase()  +
                    " \n";
           }

        if(!newUser.toLowerCase().strip().equals(prevuser) || isCatFound) {
            prevuser = newUser.toLowerCase().strip();
            if(!usrList.contains(prevuser))
                usrList.add(prevuser);

            strPart3 += "\n"+ "" + " " +
                    " Tasks for " + newUser  + " : "; ////tasks for phrase is needed here ofr new txt rules for docx
        }
        strPart3 +=  strToPut.strip()  + "$$$ ";

        isCatFound = false;


    } // End of writeKn

    public static boolean acceptNextLine() {
        boolean flag = false;
        if(currSentenceStopOffset >= offset_comm_start &&
            currSentenceStartOffset <= offset_comm_stop)
            flag = true;
        return flag;
    }// END OF acceptCurrLine

    public static void commandOffsetCalcs() {
        offset_comm_start = currCommStartTime - recordStartTime - startTimeErrorMargin;
        offset_comm_stop = currCommStopTime - recordStartTime;
    } //end of doOffsetCalcs

    public static void StringsParse(String inFile) {

        BufferedReader brTransKW = null;
        String strNextLine;
        String[] strArrSentnce;
        String[] strArrCommand;
        int commndPointer = 0;
        boolean accptNextLine = false;
        strArrCommand = strCommands.split("[>]", 0);
        currCommStartTime = Double.parseDouble(strArrCommand[commndPointer+1])/1000.0;
        currCommStopTime = Double.parseDouble(strArrCommand[commndPointer+2])/1000.0;
		System.out.println("currCommStartTime " + currCommStartTime);
		System.out.println("currCommStopTime " + currCommStopTime);
        commandOffsetCalcs();
		System.out.println(offset_comm_start);
		System.out.println(offset_comm_stop);
        chkStartType(strArrCommand[commndPointer]);
        int debug = 0;
        try {
            /////**************************************** file 2
            brTransKW = new BufferedReader(new FileReader(inFile));
            strNextLine = brTransKW.readLine();
            if(strNextLine.contains("\"errorMessage\":\"Forbidden\"") &&
                    strNextLine.contains("\"status\":false")) {
                writeError();
                return;
            }
            while (strNextLine != null) {
                strArrSentnce = strNextLine.split("[ ]", 0);
                if(strNextLine.contains("-->")) {
                    currSentenceStartOffset = getSentenceMilliTime(strArrSentnce[0]);
                    currSentenceStopOffset = getSentenceMilliTime(strArrSentnce[2]);
                    accptNextLine = acceptNextLine(); //use the flag for next line,
                                                      //whether to accept it or not
                } //if contains -->
                else if(!strNextLine.isEmpty() && strArrSentnce.length > 1){
                    if(accptNextLine) { //equivalent to start-caputre found in sentence wid voice
                        captureStarted = true;
                        accptNextLine = false;
                        //do something with the line.
                        //System.out.println(strNextLine);
                        createTextOutFile(strNextLine);
                    }
                    else { //means stop-capture
                        if(captureStarted) {
                            //System.out.println("-----------------------------------------------");
                            captureStarted = false;
                            commndPointer += 3;
                            if(strArrCommand.length > commndPointer) {
                                currCommStartTime = Double.parseDouble(strArrCommand[commndPointer + 1]);
                                currCommStopTime = Double.parseDouble(strArrCommand[commndPointer + 2]);
                                commandOffsetCalcs();
                                chkStartType(strArrCommand[commndPointer]);
                            }
                            else {
                                //System.out.println("*** Commands Ended ***");
                                break;
                            }
                        } // if captureStarted, else do nothing
                    }
                } // else -->
                strNextLine = brTransKW.readLine();
            } // while nextLine

        } catch (IOException ioe)
        {
            ioe.printStackTrace();
        }
        finally
        {
            try {
                if (brTransKW != null)
                    brTransKW.close();
            }
            catch (IOException ioe)
            {
                System.out.println("Error in closing the BufferedReader");
            }
        }
    }//End of voiceStringParse

    public static double getSentenceMilliTime(String timeStr) {
        double hr, min, secs;
        double milliSecs = 0.0;
        String[] strArrWhole = timeStr.split("[:]", 0);
        hr = Double.parseDouble(strArrWhole[0]);
        min = Double.parseDouble(strArrWhole[1]);
        secs = Double.parseDouble(strArrWhole[2]);
        milliSecs = (hr*3600)+(min*60)+(secs);
        return milliSecs;
    }//End of getMilliTime

    public static double getCommMilliOffset(String time, boolean isFromWidget) throws ParseException {
        ////test stuff
        //2021-01-24 17:27:30
        double milliOffset;
        String myDate="";
        if(!isFromWidget) {
            time = time.replace("T", " ");
            time = time.replace('Z', ' ');
            time = time.trim();
            myDate = time;
			System.out.println(myDate + "   ##############");
        }
        else {
            myDate = time; // tihs else may no tbe needed as we are already passing milliseconds from widget
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //SSS for miliseconds
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        Date date = sdf.parse(myDate);
		System.out.println(date + "   ##############");
        //long test = date.getTime()/1000;
        milliOffset = Double.parseDouble(String.valueOf(date.getTime()))/1000.00;
		//milliOffset = Double.parseDouble(String.valueOf(date.getTime()));
        System.out.println("@@@@@@@"+milliOffset);
		//int str = date.getTimezoneOffset();
		//System.out.println("@@@@@@@@@@@" + str);
		//milliOffset = ((milliOffset)+(str*(60*1000)))/1000.00;
        //System.out.println("@@@@@@@"+milliOffset);
        return milliOffset;

    }//End of getMilliOffset

    public static void WriteInitialToFile(String agenda, String date) {
        strPart1 +=  "     Title : SPOOL DOCUMENT \n\n";
        try {
            strPart1 += "   Meeting Agenda: " + agenda +
                    "\n" +
                    "   Meeting Date: " + date +
                    "\n" + "\n";

        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }

    }//WriteInitialToFile

    public static void fillSalesKW() {


        BufferedReader brsalesKW = null;
        ArrayList<String> kWCats;
        String strNextLine, strKeywods, strCategory;
        String[] strArrWhole;
        String[] strArrKWsr;
        try{
            /////**************************************** file 3
            brsalesKW = new BufferedReader(new FileReader("public/categories.txt"));

            strNextLine = brsalesKW.readLine();
            while (strNextLine != null) {
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

    public static void WriteTopicsNPartcpnts() {
        try {
            String strLower;
            //String cat;
            ArrayList<String> kWCats;
            String[] ArrPartcpnts;
            strPart2 +="\n";

            ////training realted added *************************
            strPart2 += "   Meeting Discussion Topics: ";
            if(isTaskEverAssgned) {
                strPart2 += "Action Items for SDRs, ";
            }
            if(isTrainingEverAssgned) {
                strPart2 += "Training for SDRs, ACTION ITEMS FOR SDR" ;
            }
            ////training realted added *************************

            for (String cat: catTopics
            ) {
                //strPart2 += cat + "\n";
                //bwTransWriter.write("\\fs35\\tab\\tab\\b - " +  cat + "\\b0 \\line\\fs30");
                kWCats = Cat2Sub_Cat.get(cat);
                for (String subcat: kWCats //initally was kWCats####################
                ) {
                    strPart2 += cat + " - " + subcat +", ";
                    //bwTransWriter.write("\\tab\\tab\\tab - "+ subcat +"\\line");
                }

            }
            if(isError) {
                strPart2 += "ERROR OCCURRED - Authentication Issue,";
            }
            strPart2 += "\n\n";
            strPart2 += "   Knowledge Participants: ";
            //bwTransWriter.write("\\fs40\\tab \\b Knowledge Participants: \\b0 \\line \\line\n");
            for (String prtcpnt: usrList
            ) {
                strPart2 +=  prtcpnt + ", ";
                //bwTransWriter.write("\\fs35\\tab\\tab - " +  prtcpnt + "\\line");
            }
            strPart2 += "\n\n";

            //strPart2 += "\\page ";
            //bwTransWriter.write("\\page");
        }
        catch (Exception ioe)
        {
            ioe.printStackTrace();
        }

    }//WriteInitialToFile

}// End Class WidgetTextProc
