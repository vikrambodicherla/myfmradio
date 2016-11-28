#!/bin/sh
#rtl_fm -M wbfm -f 88.3M | ffmpeg -f s16le -ar 17000 -ac 2 -i - wbfm2.mp3

FREQ=$1
CLIP_LENGTH=$2
OUTPUT=$3

cd $FREQ_$OUTPUT

while : 
do
	TEMP_FILENAME=_`date +%s`.mp3

	START_TIME=`date +%s`

	# Execute the job
	echo "Capturing" $FREQ "for" $CLIP_LENGTH "seconds..."

    rtl_fm -M wbfm -f $FREQ | ffmpeg -f s16le -ar 16000 -ac 2 -i - $TEMP_FILENAME &

	# Get its PID
	PID=$!

	# Sleep
	sleep $CLIP_LENGTH

	# SIGTERM
	kill $PID

	# Save file
	END_TIME=`date +%s`
	FILENAME=$START_TIME,$(($END_TIME-$START_TIME)),$FREQ.mp3
	
	echo "Saving to" $FILENAME
	mv $TEMP_FILENAME $FILENAME

	sleep 1
done
