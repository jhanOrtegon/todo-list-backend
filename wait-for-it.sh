#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

set -e

cmdname=$(basename "$0")

echoerr() {
  if [ "$QUIET" -ne 1 ]; then
    echo "$@" 1>&2
  fi
}

usage() {
  cat << USAGE >&2
Usage:
  $cmdname host:port [-s] [-t timeout] [-- command args]
  -h HOST | --host=HOST       Host or IP under test
  -p PORT | --port=PORT       TCP port under test
                              Alternatively, specify as host:port
  -s | --strict               Only execute subcommand if the test succeeds
  -q | --quiet                Don't output any status messages
  -t TIMEOUT | --timeout=TIMEOUT
                              Timeout in seconds, zero for no timeout
  -- COMMAND ARGS             Execute command with args after the test finishes
USAGE
  exit 1
}

wait_for() {
  if [ "$TIMEOUT" -gt 0 ]; then
    echoerr "$cmdname: waiting $TIMEOUT seconds for $HOST:$PORT"
  else
    echoerr "$cmdname: waiting for $HOST:$PORT without a timeout"
  fi
  start_ts=$(date +%s)
  while :
  do
    (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1 && break
    sleep 1
  done
  end_ts=$(date +%s)
  echoerr "$cmdname: $HOST:$PORT is available after $((end_ts - start_ts)) seconds"
  return 0
}

wait_for_wrapper() {
  if [ "$QUIET" -eq 1 ]; then
    wait_for "$@" &>/dev/null
  else
    wait_for "$@"
  fi
}

# Defaults
HOST=""
PORT=""
TIMEOUT=15
STRICT=0
QUIET=0

while [ $# -gt 0 ]
do
  case "$1" in
    *:* )
      HOST=$(echo "$1" | cut -d : -f 1)
      PORT=$(echo "$1" | cut -d : -f 2)
      shift 1
      ;;
    --host=*)
      HOST="${1#*=}"
      shift 1
      ;;
    --port=*)
      PORT="${1#*=}"
      shift 1
      ;;
    -q | --quiet)
      QUIET=1
      shift 1
      ;;
    -s | --strict)
      STRICT=1
      shift 1
      ;;
    -h)
      HOST="$2"
      shift 2
      ;;
    -p)
      PORT="$2"
      shift 2
      ;;
    -t)
      TIMEOUT="$2"
      shift 2
      ;;
    --timeout=*)
      TIMEOUT="${1#*=}"
      shift 1
      ;;
    --)
      shift
      break
      ;;
    --help)
      usage
      ;;
    *)
      echoerr "Unknown argument: $1"
      usage
      ;;
  esac
done

if [ "$HOST" = "" ] || [ "$PORT" = "" ]; then
  echoerr "Error: host and port must be specified."
  usage
fi

wait_for_wrapper "$HOST:$PORT"
RET=$?

if [ "$STRICT" -eq 1 ] && [ "$RET" -ne 0 ]; then
  exit $RET
fi

shift

if [ $# -gt 0 ]; then
  exec "$@"
else
  exit $RET
fi
