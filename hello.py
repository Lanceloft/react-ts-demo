def hello(fn):
    def wrapper():
        print ("hello, %s" % fn.__name__)
        fn()
    return wrapper

@hello
def test():
    print ("i am 1")

test()
