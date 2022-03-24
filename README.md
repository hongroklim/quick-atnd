# Quick Attendance

> Assist Teaching Assistants to Check Attendance Quickly and Correctly

## Abstract

Quick Attendance is a SPA(Single Page Application) that helps TAs to check
the attendance of the offline class. While moving around the classroom, they
can mark a student's status by simply asking his/her student ID or name. One
of the most convenient function it provides is initial search, initial search
(초성검색 in Korean), which makes it shorter to figure out the student.
Through utilizing this application, TAs are able to minimize the inconvenience
of checking attendance and, furthermore, the students will be less bothered by
TAs and concentrate on the lectures more.

**Index Terms** Single Page Application, Reactjs, Mobile, IndexedDB

## Motivation

When it was the first offline class of HY-LIVE, checking the attendance was
disaster. While moving around the class quietly and carefully, it heavily
demands to ask the students for their student card and match them with the
given roster. Even worse, the roster consisted with unordered names so it took
almost linear time to find their names. The correctness was also matter. If TA
had made some mistakes, there would have been a severe trouble later. In order
to reduce the workload and guarantee the attendance, this application will
have a significant role.

## Requirement Analysis

### Quick Searching

Finding the student by his/her personal information should be done as soons as
possible. To achieve this goal, searching by consonants for each letter is
strongly helpful. In addition, student ID will be the identifier to figure out
the student uniquely. If there are multiple students in a keyword,
highlighting the matching items help a user to distinguish the target.

### Marking

After finding the student, a user should be able to mark his/her attendance.
This step will be processed in one-touch. There is only a click button for
each student and its attendance is changed recursively after it is clicked.
There would be more than one mark. (e.g. "empty", "attend" and "late")

### Logging and Saving

Because attendance is sensitive for every students, all changes should be
recorded as much as possible. The logging mechanism should be WAL(Write Ahead
Logging). All logs also should be printed if necessary. In addition, to prevent
the loss of data, indexedDB in browser will be used.

### Exporting

All checked attendances should be moved to the official spreadsheet. The list
should be translated into korean within a single column, and its sequence
should be correspond to the roster.
