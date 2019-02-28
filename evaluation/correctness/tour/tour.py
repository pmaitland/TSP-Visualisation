
def main():

    file = open("tourToFormat.txt", "r")
    linesToParse = file.readlines()

    linesToWrite = "";

    open("tourTemp.txt", 'w')

    lineToPrint = "["

    for line in linesToParse:
        lineToPrint += str(int(line.replace("\n", "")) - 1) + ","
    
    lineToPrint = lineToPrint[:-1] + "]"
    open("tourTemp.txt", 'a').write(lineToPrint)

if __name__ == "__main__":
    main()
