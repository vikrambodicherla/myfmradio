#!/usr/bin/env python

import subprocess
import tempfile
import shutil

dirpath = tempfile.mkdtemp()
print "Created temp folder: ", dirpath

#TODO: Fetch this from a remote endpoint, 
#keep fetching regularly and change the capture call if needed
frequency = "983.fm"
clip_length = "10"

print "Capturing frequency 98.3fm"
command = "./capture_fm.sh " + frequency + " " + clip_length + " " + dirpath
subprocess.call(command, shell=True)

#TODO: RFTP to a location captured from the config file

shutil.rmtree(dirpath)