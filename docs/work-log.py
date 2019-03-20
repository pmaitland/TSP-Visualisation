def main():

    totalTime = 0.0

    file = open("work-log.md", "r")

    lines = file.readlines()

    weekTimes = []
    week = 0

    for line in lines:
        if line[0] == "#":
            week += 1
            weekTimes.append(0)

        elif line[0] == "*":
            startHour = int(line[2] + line[3])
            startMins = int(line[5] + line[6])
            endHour = int(line[8] + line[9])
            endMins = int(line[11] + line[12])

            hours = endHour - startHour
            mins = endMins - startMins

            if hours < 0:
                hours = 24 + hours

            if mins < 0:
                hours = hours - 1
                mins = 60 + mins

            duration = hours + (mins / 60.0)
            weekTimes[week-1] += duration
            totalTime += duration

    for i in range(len(weekTimes)):
        print("Week {}:\t {} hours".format(i+1, round(weekTimes[i], 2)))
    print("Total:\t\t {} hours".format(round(totalTime, 2)))

if __name__ == "__main__":
    main()
