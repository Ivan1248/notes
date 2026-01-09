---
publish: "true"
---

## Good usage

Example from [Python: argparse - add binary arguments](https://arccoder.medium.com/python-argparse-add-binary-arguments-d092f3214edd):
```
import argparse  
parser = argparse.ArgumentParser()  
parser.add_argument("--open", action="store_true", dest="door_open")  
parser.add_argument("--close", action="store_false", dest="door_open")  
```

Result:
```
>>> print(parser.parse_args([]))
Namespace(door_open=True)
>>> print(parser.parse_args(['--close']))
Namespace(door_open=True)
>>> print(parser.parse_args(['--open']))
Namespace(door_open=False)
```

## Bad usage

```
import argparse  
parser = argparse.ArgumentParser()  
parser.add_argument("--open", action="store_false")  
```
Note that `action` is set to `"store_false"` and  `dest` is not used.

Result:
```
>>> print(parser.parse_args([]))
Namespace(open=True)
>>> print(parser.parse_args(['--open']))
Namespace(open=False)
```
However we name the argument, it has the opposite meaning than expected.
