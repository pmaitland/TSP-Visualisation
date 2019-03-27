
def main():

    file = open("nn1250.csv", "r")
    linesToParse = file.readlines()

    for line in linesToParse:
        lineToWrite = str(int(line.split(",")[0]) + 3000)
        for word in line.split(",")[1:]:
            lineToWrite += "," + str(word)
        open("temp.csv", 'a').write(lineToWrite)

if __name__ == "__main__":
    main()
