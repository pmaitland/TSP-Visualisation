
def main():

    file = open("matrixToFormat.txt", "r")
    linesToParse = file.readlines()

    linesToWrite = "";

    open("matrixTemp.txt", 'w')
    open("matrixTemp.txt", 'a').write("[\n")

    for line in linesToParse[1:]:
        line = "[" + ",".join(line.split("\t")[1:]).replace("\n", "") + "],\n"
        open("matrixTemp.txt", 'a').write(line)

    open("matrixTemp.txt", 'a').write("]")

if __name__ == "__main__":
    main()
