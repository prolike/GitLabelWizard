import json


def get_safe_delete(arr_insert,arr_labels,issues):
    remove_labels = diff_between_2_lists(arr_labels,arr_insert)
    remove_labels_safe = diff_between_2_lists(remove_labels,issues)
    return remove_labels_safe
    

def diff_between_2_lists(label1,label2):
    diff_list = [ii for ii in label1 if ii not in label2]
    return diff_list
