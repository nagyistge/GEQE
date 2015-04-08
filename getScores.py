import sysimport jsonimport tangeloimport osimport timedef binCoordinate(strCord, fBinSize):    return str(int(float(strCord)/fBinSize)*fBinSize)@tangelo.restfuldef get(filePath='./', fileAppOut='appliedScores.csv', maxOut = "-1", bIgnorDict="false", bBinByLatLon="false", bBinByDate="false", fBinSize=".005"):    ssName = filePath + "scoreFiles/" + fileAppOut    retDict = {}    lLats    = []    lLons    = []    lCaption = []    lScore   = []    f = open(ssName, 'r')    nRet = 0    if bBinByLatLon == "false":        for line in f:            nums = line.split('\t')            try:                lLats.append(nums[0])                lLons.append(nums[1])                lCaption.append(nums[2])                lScore.append(str((int(float(nums[3])*10000.)*1.)/10000.))            except:                continue            nRet = nRet + 1            if nRet == int(maxOut):                break    elif bBinByLatLon == "true":        dBinned = {}        for line in f:            nums = line.split('\t')            try:                sLat = binCoordinate(nums[0],float(fBinSize))                sLon = binCoordinate(nums[1],float(fBinSize))                sSco = str((int(float(nums[3])*10000.)*1.)/10000.)                sBin = sLat+","+sLon                if sBin in dBinned:                    dBinned[sBin][2].append(nums[2])                    dBinned[sBin][3].append(sSco)                else:                    dBinned[sBin] = [sLat, sLon, [nums[2]], [sSco]]            except:                continue        lBinned = filter(lambda x: len(x[2])>1,dBinned.values())        lBinned.sort(cmp=lambda x, y: cmp(len(x[2]),len(y[2])), reverse=True)        for i in lBinned:            lLats.append(i[0])            lLons.append(i[1])            lCaption.append(i[2])            lScore.append(i[3])            nRet = nRet + 1            if nRet == int(maxOut):                break    f.close()        if bIgnorDict=="false":        try:            dictName = filePath + "dictFiles/dict_" + fileAppOut            lWordScores = []            f2 = open(dictName,'r')            for line in f2:                lWordScores.append(line.split('\t'))            lWordClean = map(lambda x: [x[0], x[2], x[4], str((1.*int(float(x[5])*10000.))/10000.)], lWordScores)            lWordSorted = sorted(lWordClean,key=lambda x: float(x[3]),reverse=True)            retDict["dic"] = lWordSorted        except:            retDict["dic"] = "No dictionary file"        retDict["total"] = nRet    retDict["lat"] = lLats    retDict["lon"] = lLons    retDict["cap"] = lCaption    retDict["sco"] = lScore    return json.dumps(retDict)